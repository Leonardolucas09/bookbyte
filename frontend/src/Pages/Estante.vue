<script setup>
import { ref, computed } from 'vue'
import Cabecalho from '../components/Cabecalho.vue'
import BarraLateral from '../components/BarraLateral.vue'
import Rodape from '../components/Rodape.vue'
import BarraProgresso from '../components/BarraProgresso.vue'
import { livros } from '../data/livros.js'

defineEmits(['navigate'])

const sidebarAberta = ref(false)
const toggleSidebar = () => { sidebarAberta.value = !sidebarAberta.value }
const fecharSidebar = () => { sidebarAberta.value = false }

const filtroAtivo = ref('todos')

const filtros = [
  { label: 'Todos', valor: 'todos' },
  { label: 'Lendo', valor: 'lendo' },
  { label: 'Concluídos', valor: 'concluido' },
  { label: 'Abandonados', valor: 'abandonado' },
]

const estante = [
  { livroId: 1, paginasLidas: 200, status: 'lendo' },
  { livroId: 6, paginasLidas: 96,  status: 'concluido' },
  { livroId: 9, paginasLidas: 60,  status: 'abandonado' },
  { livroId: 5, paginasLidas: 300, status: 'lendo' },
  { livroId: 3, paginasLidas: 1211, status: 'concluido' },
]

const livrosNaEstante = estante.map(entrada => ({
  ...livros.find(l => l.id === entrada.livroId),
  paginasLidas: entrada.paginasLidas,
  status: entrada.status,
}))

const livrosFiltrados = computed(() => {
  if (filtroAtivo.value === 'todos') return livrosNaEstante
  return livrosNaEstante.filter(l => l.status === filtroAtivo.value)
})
</script>

<template>
  <Cabecalho />
  <div class="px-8">
    <BarraLateral
    :isOpen="sidebarAberta"
    :isUsablle="true"
    @toggle="toggleSidebar"
    @close="fecharSidebar"
    @navigate="$emit('navigate', $event)"
    />
  </div>

  <div class="text-white px-6 pt-6 pb-32">
    <h1 class="text-2xl font-bold mb-5">Minha Estante</h1>

    <div class="flex gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar flex-wrap">
      <button
        v-for="filtro in filtros"
        :key="filtro.valor"
        @click="filtroAtivo = filtro.valor"
        :class="[
          'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
          filtroAtivo === filtro.valor
            ? 'bg-white text-zinc-900'
            : 'bg-zinc-800 text-zinc-300'
        ]"
      >
        {{ filtro.label }}
      </button>
    </div>

    <div class="flex flex-col gap-4">
      <div
        v-for="livro in livrosFiltrados"
        :key="livro.id"
        class="flex gap-4 bg-zinc-900 rounded-2xl p-3"
      >
        <img
          :src="livro.capa"
          :alt="livro.titulo"
          class="w-16 h-24 rounded-lg object-cover flex-shrink-0"
        />

        <div class="flex flex-col justify-between flex-1 py-1">
          <div>
            <p class="font-semibold leading-tight">{{ livro.titulo }}</p>
            <p class="text-zinc-400 text-sm mt-0.5">{{ livro.autor }}</p>
          </div>

          <BarraProgresso
            :paginasLidas="livro.paginasLidas"
            :totalPaginas="livro.paginas"
          />
        </div>
      </div>

      <p v-if="livrosFiltrados.length === 0" class="text-zinc-500 text-center mt-10">
        Nenhum livro aqui ainda.
      </p>
    </div>
  </div>

  <Rodape currentPage="estante" @navigate="$emit('navigate', $event)" />
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
