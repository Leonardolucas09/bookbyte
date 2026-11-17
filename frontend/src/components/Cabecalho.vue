<script setup>
import { ref } from 'vue';
import LogoBookByte from './LogoBookByte.vue';
import Busca from './icons/Busca.vue';
import Fechar from './icons/Fechar.vue';
import { buscarLivros } from '../services/api.js';
import { adicionarNaEstante, estaNaEstante } from '../services/estante.js';
import { pegarIniciais, pegarUsuarioLogado } from '../utils/usuario.js';

const iniciais = pegarIniciais(pegarUsuarioLogado().nomeUsuario);

const busca = ref('');
const mostrarSugestoes = ref(false);
const resultados = ref([]);
const carregando = ref(false);
const erro = ref('');

// Roda quando a pessoa aperta Enter no campo de busca
async function pesquisar() {
    mostrarSugestoes.value = true;
    resultados.value = [];
    erro.value = '';

    if (busca.value.trim().length < 2) {
        erro.value = 'Digite pelo menos 2 letras.';
        return;
    }

    carregando.value = true;
    try {
        const dados = await buscarLivros(busca.value.trim());
        if (dados.erro) {
            erro.value = dados.erro;
        } else {
            resultados.value = dados.livros.slice(0, 5); // mostra só os 5 primeiros
        }
    } catch {
        erro.value = 'Não foi possível buscar. A API está rodando?';
    }
    carregando.value = false;
}

const limparBusca = () => {
    busca.value = '';
    mostrarSugestoes.value = false;
};
</script>

<template>
    <header class="flex flex-col gap-3 bg-input px-6 py-4 md:flex-row md:items-center md:gap-6 border-b border-sand">
        <div class="flex w-full items-center justify-between md:w-auto md:justify-start">
            <LogoBookByte />
            <span class="ml-6 hidden text-light-brown md:inline">Um capítulo de cada vez.</span>
            <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-sand font-semibold text-brown md:hidden">
                <span>{{ iniciais }}</span>
            </div>
        </div>

        <div class="relative w-full md:ml-auto md:max-w-120">
            <label class="flex h-12 items-center gap-3 rounded-xl border border-brown bg-input px-4 focus-within:ring-2 focus-within:ring-brown/30">
                <Busca class="text-light-brown" />
                <input
                    v-model="busca"
                    type="text"
                    placeholder="Busque por título ou autor"
                    class="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-light-brown"
                    role="combobox"
                    aria-autocomplete="list"
                    :aria-expanded="mostrarSugestoes && busca.trim().length > 0"
                    aria-controls="sugestoes-livros"
                    @keydown.enter="pesquisar"
                    @keydown.esc="limparBusca"
                />
                <button
                    v-if="busca"
                    type="button"
                    class="grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-field"
                    aria-label="Limpar busca"
                    @click="limparBusca"
                >
                    <Fechar class="text-light-brown" />
                </button>
            </label>

            <div
                v-if="mostrarSugestoes && busca.trim()"
                id="sugestoes-livros"
                class="absolute left-0 top-[calc(100%+8px)] z-20 flex w-full flex-col gap-3 rounded-[10px] border border-line bg-input p-4 shadow-[0_12px_32px_rgba(48,46,43,0.094)]"
                role="listbox"
            >
                <span class="text-[11px] font-medium uppercase tracking-wide text-light-brown">Sugestões de livros</span>

                <p v-if="carregando" class="py-3 text-sm text-light-brown">Buscando...</p>

                <p v-else-if="erro" class="py-3 text-sm text-error">{{ erro }}</p>

                <p v-else-if="resultados.length === 0" class="py-3 text-sm text-light-brown">Nenhum livro encontrado.</p>

                <div
                    v-for="livro in resultados"
                    :key="livro.titulo + livro.autor"
                    class="flex items-center gap-4 rounded-lg p-2 hover:bg-field"
                >
                    <img :src="livro.capa" :alt="`Capa de ${livro.titulo}`" class="h-18 w-13 shrink-0 rounded object-cover shadow-sm" />
                    <span class="flex min-w-0 flex-1 flex-col gap-1">
                        <span class="truncate text-sm font-medium text-ink">{{ livro.titulo }}</span>
                        <span class="truncate text-[13px] text-light-brown">{{ livro.autor }} · {{ livro.ano }}</span>
                    </span>
                    <span v-if="estaNaEstante(livro)" class="text-sm text-success">Na estante</span>
                    <button
                        v-else
                        type="button"
                        class="rounded-lg border-2 border-line px-3 py-1 text-sm font-semibold text-brown"
                        @click="adicionarNaEstante(livro)"
                    >
                        + Adicionar
                    </button>
                </div>
            </div>
        </div>

        <div class="hidden size-12 shrink-0 items-center justify-center rounded-full bg-sand font-semibold text-brown md:flex">
            <span>{{ iniciais }}</span>
        </div>
    </header>
</template>
