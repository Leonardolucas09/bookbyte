<script setup>
import { computed } from "vue";
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
</script>

<template>
    <div class="flex flex-wrap content-start gap-3 justify-between p-10">
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
    </div>
</template>
