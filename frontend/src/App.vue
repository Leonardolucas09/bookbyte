<script setup>
import { ref } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Cabecalho from "./components/Cabecalho.vue";
import ScrollLivros from "./components/ScrollLivros.vue";
import Rodape from "./components/Rodape.vue";

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
  <BarraLateral
    :isOpen="sidebarAberta"
    @toggle="toggleSidebar"
    @close="fecharSidebar"
  />
  <ScrollLivros/>
  <Rodape/>
</template>
