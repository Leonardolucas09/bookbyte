<script setup>
import { ref } from 'vue'
import Cabecalho from '../components/Cabecalho.vue'
import BarraLateral from '../components/BarraLateral.vue'
import Rodape from '../components/Rodape.vue'

defineEmits(['navigate'])

const sidebarAberta = ref(false)
const toggleSidebar = () => { sidebarAberta.value = !sidebarAberta.value }
const fecharSidebar = () => { sidebarAberta.value = false }
</script>

<template>
  <Cabecalho />
  <BarraLateral
    :isOpen="sidebarAberta"
    @toggle="toggleSidebar"
    @close="fecharSidebar"
    @navigate="$emit('navigate', $event)"
  />

  <div class="flex flex-col items-center justify-center h-screen text-white">
    <p class="text-xl font-semibold">Minha Lista</p>
    <p class="text-zinc-500 mt-2">Em breve...</p>
  </div>

  <Rodape currentPage="lista" @navigate="$emit('navigate', $event)" />
</template>
