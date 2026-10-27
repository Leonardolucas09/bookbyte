<script setup>
import Cabecalho from "../components/Cabecalho.vue";
import BarraLateral from "../components/BarraLateral.vue";
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
