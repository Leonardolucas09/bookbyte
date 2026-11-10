<script setup>
import CardLivro from "../components/CardLivro.vue";
import { estante } from "../services/estante.js";
</script>

<template>
    <div class="p-10">
        <p v-if="estante.length === 0" class="text-light-brown">
            Sua estante está vazia. Busque um livro no campo lá em cima e aperte Enter.
        </p>

        <div class="flex flex-wrap gap-6">
            <CardLivro
                v-for="livro in estante"
                :key="livro.id"
                :livro="livro"
            />
        </div>
    </div>
</template>
