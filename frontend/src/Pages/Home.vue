<script setup>
import BarraLateral from "../components/BarraLateral.vue";
import ScrollLivros from "../components/ScrollLivros.vue";

defineEmits(["navigate"]);
</script>

<template>
    <BarraLateral
        pagina-atual=""
        @navigate="$emit('navigate', $event)"
    />
    <main class="ml-72 min-h-screen px-10 py-8">
        <ScrollLivros />
    </main>
</template>
