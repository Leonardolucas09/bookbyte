<script setup>
import { onMounted } from "vue";
import Cabecalho from "../components/Cabecalho.vue";
import BarraLateral from "../components/BarraLateral.vue";
import { carregarEstante } from "../services/estante.js";

// Quando abre o site logado, busca a estante do usuário no banco
onMounted(carregarEstante);
</script>

<template>
    <div class="flex h-screen flex-col">
        <Cabecalho />
        <div class="flex min-h-0 flex-1">
            <BarraLateral />
            <main class="flex-1 overflow-y-auto">
                <RouterView />
            </main>
        </div>
    </div>
</template>
