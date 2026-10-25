<script setup>
import { computed } from 'vue';
import Cabecalho from '../components/Cabecalho.vue';
import CardLivro from '../components/CardLivro.vue';
import { livros } from '../data/livros.js';
import CardHorizontal from '../components/CardHorizontal.vue';

const livrosLendo = computed(() =>
    [...livros]
        .filter((livro) => livro.statusLeitura === "Lendo")
        .sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'))
);

const livroMenosLido = computed(() =>
    [...livrosLendo.value].sort((a, b) => a.paginasLidas - b.paginasLidas)[0]
);

const outrosLivrosLendo = computed(() =>
    livrosLendo.value.filter((livro) => livro.id !== livroMenosLido.value?.id)
);

defineEmits(['navigate']);
</script>

<template>
    <Cabecalho />
    <main class="flex flex-wrap p-10 gap-3 w-fit justify-between">
        <CardLivro v-for="livro in outrosLivrosLendo" :key="livro.id" :livro="livro" />
        <CardHorizontal
            v-if="livroMenosLido"
            :key="livroMenosLido.id"
            :livro="livroMenosLido"
            class="basis-full"
        />
    </main>
</template>

