<script setup>
import { computed } from "vue";
import Cabecalho from "../components/Cabecalho.vue";
import BarraLateral from "../components/BarraLateral.vue";
import CardLivro from "../components/CardLivro.vue";
import { livros } from "../data/livros.js";
import CardHorizontal from "../components/CardHorizontal.vue";

const livrosLendo = computed(() =>
    [...livros]
        .filter(livro => livro.statusLeitura === "Lendo")
        .sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR")),
);

const livroMenosLido = computed(() =>
    [...livrosLendo.value].sort((a, b) => a.paginasLidas - b.paginasLidas)[0],
);

const outrosLivrosLendo = computed(() =>
    livrosLendo.value.filter(livro => livro.id !== livroMenosLido.value?.id),
);

defineEmits(["navigate"]);
</script>

<template>
    <div class="flex h-screen flex-col">
        <Cabecalho />
        <div class="flex min-h-0 flex-1">
            <BarraLateral
                pagina-atual=""
                @navigate="$emit('navigate', $event)"
            />
            <main class="flex flex-1 flex-wrap content-start p-10 gap-3 justify-between overflow-y-auto">
                <CardLivro
                    v-for="livro in outrosLivrosLendo"
                    :key="livro.id"
                    :livro="livro"
                />
                <CardHorizontal
                    v-if="livroMenosLido"
                    :key="livroMenosLido.id"
                    :livro="livroMenosLido"
                    class="basis-full"
                />
            </main>
        </div>
    </div>
</template>
