<script setup>
    import { ref } from "vue";
    import Cabecalho from "../components/Cabecalho.vue";
    import BarraLateral from "../components/BarraLateral.vue";
    import ScrollLivros from "../components/ScrollLivros.vue";
    import Rodape from "../components/Rodape.vue";

    defineEmits(['navigate']);

    const sidebarAberta = ref(false);

    const toggleSidebar = () => {
        sidebarAberta.value = !sidebarAberta.value;
    };

    const fecharSidebar = () => {
        sidebarAberta.value = false;
    };
</script>

<template>
    <Cabecalho />
    <div class="px-8">
        <BarraLateral
        :isHome="true"
        :isOpen="sidebarAberta"
        @toggle="toggleSidebar"
        @close="fecharSidebar"
        @navigate="$emit('navigate', $event)"
        />
    </div>
    <ScrollLivros/>
    <Rodape currentPage="" @navigate="$emit('navigate', $event)" />
</template>
