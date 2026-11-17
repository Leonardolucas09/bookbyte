<script setup>
import { computed, ref, onMounted } from "vue";
import { descobrirLivros } from "../services/api.js";
import { estante, adicionarNaEstante } from "../services/estante.js";

const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

const categorias = [
    { id: "todos", nome: "Todos" },
    { id: "ficcao", nome: "Ficção" },
    { id: "literatura-brasileira", nome: "Literatura brasileira" },
    { id: "fantasia", nome: "Fantasia" },
    { id: "classicos", nome: "Clássicos" },
    { id: "nao-ficcao", nome: "Não ficção" },
];

const categoriaAtual = ref("todos");
const livros = ref([]);
const carregando = ref(false);
const erro = ref("");

// O primeiro livro com capa vira o destaque; os outros vão para a lista
const destaque = computed(() => livros.value.find(livro => livro.capa));
const outrosLivros = computed(() => livros.value.filter(livro => livro !== destaque.value).slice(0, 8));

async function carregar(categoria) {
    categoriaAtual.value = categoria;
    carregando.value = true;
    erro.value = "";
    try {
        const dados = await descobrirLivros(categoria);
        livros.value = dados.livros;
    }
    catch (e) {
        erro.value = e.message;
        livros.value = [];
    }
    carregando.value = false;
}

onMounted(() => carregar("todos"));

// Se o livro já está na estante, devolve o item da estante (para mostrar o status)
function itemNaEstante(livro) {
    return estante.value.find(item => item.titulo === livro.titulo && item.autor === livro.autor);
}

function detalhes(livro) {
    return [livro.ano, livro.paginas && `${livro.paginas} páginas`].filter(Boolean).join(" · ");
}
</script>

<template>
    <section class="p-6 md:p-10">
        <p class="text-xs font-medium uppercase tracking-wide text-light-brown">
            Novas histórias, {{ usuario.nomeUsuario }}
        </p>
        <h1 class="lora mt-1 text-4xl">
            Descobrir
        </h1>
        <p class="mt-1 text-sm text-light-brown">
            Encontre a próxima história que vai ficar com você.
        </p>

        <!-- Categorias -->
        <div class="mt-5 flex flex-wrap gap-2">
            <button
                v-for="categoria in categorias"
                :key="categoria.id"
                type="button"
                class="cursor-pointer rounded-full border px-4 py-1.5 text-sm"
                :class="categoria.id === categoriaAtual
                    ? 'border-brown bg-sand font-semibold text-brown'
                    : 'border-line bg-input text-light-brown hover:border-brown'"
                @click="carregar(categoria.id)"
            >
                {{ categoria.nome }}
            </button>
        </div>
        <p class="mt-2 text-xs text-light-brown">
            Explore por título, autor ou ISBN no campo de busca · Catálogo Open Library
        </p>

        <p
            v-if="carregando"
            class="mt-8 text-light-brown"
        >
            Buscando livros...
        </p>
        <p
            v-else-if="erro"
            class="mt-8 text-error"
        >
            {{ erro }}
        </p>

        <template v-else>
            <!-- Destaque -->
            <div
                v-if="destaque"
                class="mt-6 flex flex-col gap-6 rounded-2xl bg-sand p-6 md:flex-row md:items-center md:p-8"
            >
                <img
                    :src="destaque.capa"
                    :alt="`Capa de ${destaque.titulo}`"
                    class="mx-auto h-64 w-44 shrink-0 rounded object-cover shadow-lg md:mx-0"
                >
                <div class="flex flex-col gap-3">
                    <p class="text-xs font-semibold uppercase tracking-wide text-brown">
                        Uma descoberta para você
                    </p>
                    <h2 class="lora text-3xl">
                        {{ destaque.titulo }}
                    </h2>
                    <p class="text-light-brown">
                        {{ destaque.autor }}
                    </p>
                    <p class="text-sm text-light-brown">
                        {{ [detalhes(destaque), destaque.editora].filter(Boolean).join(" · ") }}
                    </p>

                    <p
                        v-if="itemNaEstante(destaque)"
                        class="w-fit rounded-lg bg-input px-4 py-2.5 text-sm text-success"
                    >
                        ✓ Na estante · {{ itemNaEstante(destaque).statusLeitura }}
                    </p>
                    <template v-else>
                        <button
                            type="button"
                            class="w-full cursor-pointer rounded-lg bg-brown px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#634A34] md:w-fit"
                            @click="adicionarNaEstante(destaque)"
                        >
                            + Adicionar à estante
                        </button>
                        <p class="text-xs text-light-brown">
                            O livro será salvo na sua estante como “Quero Ler”.
                        </p>
                    </template>
                </div>
            </div>

            <!-- Lista -->
            <div class="mt-10 flex items-baseline justify-between">
                <h2 class="lora text-2xl">
                    Entre novos mundos
                </h2>
                <span class="text-xs text-brown">Seleção BookByte</span>
            </div>
            <p class="mt-1 text-sm text-light-brown">
                Dos grandes clássicos aos pequenos encontros: um livro para cada momento.
            </p>

            <p
                v-if="!destaque && outrosLivros.length === 0"
                class="mt-4 text-light-brown"
            >
                Nenhum livro encontrado nesta categoria.
            </p>

            <div class="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
                <div
                    v-for="livro in outrosLivros"
                    :key="livro.titulo + livro.autor"
                    class="flex flex-col gap-2"
                >
                    <div class="flex justify-center rounded-md bg-sand py-4">
                        <img
                            v-if="livro.capa"
                            :src="livro.capa"
                            :alt="`Capa de ${livro.titulo}`"
                            class="h-44 w-30 rounded object-cover shadow"
                        >
                        <div
                            v-else
                            class="h-44 w-30 rounded bg-line"
                        />
                    </div>
                    <h3 class="lora font-semibold">
                        {{ livro.titulo }}
                    </h3>
                    <p class="text-sm text-light-brown">
                        {{ livro.autor }}
                    </p>
                    <p class="text-xs text-light-brown">
                        {{ detalhes(livro) }}
                    </p>

                    <p
                        v-if="itemNaEstante(livro)"
                        class="mt-auto rounded-lg bg-sand py-2 text-center text-xs text-brown"
                    >
                        ✓ Na estante · {{ itemNaEstante(livro).statusLeitura }}
                    </p>
                    <button
                        v-else
                        type="button"
                        class="mt-auto cursor-pointer rounded-lg border border-line bg-input py-2 text-xs font-medium text-brown hover:bg-sand"
                        @click="adicionarNaEstante(livro)"
                    >
                        + Quero Ler
                    </button>
                </div>
            </div>

            <p class="mt-8 text-xs text-light-brown">
                Dados das edições: Open Library. As capas e informações podem variar por edição.
            </p>
        </template>
    </section>
</template>
