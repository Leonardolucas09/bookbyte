<script setup>
import Cabecalho from '../components/Cabecalho.vue'
import BarraLateral from '../components/BarraLateral.vue'
import Rodape from '../components/Rodape.vue'
import { ref } from 'vue'
import { livros } from '../data/livros.js'

defineEmits(['navigate'])

const sidebarAberta = ref(false)

const toggleSidebar = () => {
  sidebarAberta.value = !sidebarAberta.value
}

const fecharSidebar = () => {
  sidebarAberta.value = false
}

const livrosAvaliados = [
  {
    ...livros[0],
    nota: '⭐⭐⭐⭐⭐',
    comentario: 'Um dos melhores livros que já li.'
  },
  {
    ...livros[1],
    nota: '⭐⭐⭐⭐',
    comentario: 'História muito envolvente e personagens marcantes.'
  },
  {
    ...livros[2],
    nota: '⭐⭐⭐⭐⭐',
    comentario: 'Leitura leve e impossível de largar.'
  }
]
</script>

<template>
  <Cabecalho />

  <BarraLateral
    :isOpen="sidebarAberta"
    @toggle="toggleSidebar"
    @close="fecharSidebar"
    @navigate="$emit('navigate', $event)"
  />

  <div class="paginaAvaliacoes">

    <h1 class="titulo">Avaliações</h1>

    <div
      v-for="livro in livrosAvaliados"
      :key="livro.id"
      class="livroCard"
    >

      <img
        :src="livro.capa"
        :alt="livro.titulo"
        class="capaLivro"
      />

      <div class="conteudoLivro">

        <h2 class="tituloLivro">
          {{ livro.titulo }}
        </h2>

        <p class="autor">
          {{ livro.autor }}
        </p>

        <p class="nota">
          {{ livro.nota }}
        </p>

        <p class="comentario">
          {{ livro.comentario }}
        </p>

      </div>

    </div>

  </div>

  <Rodape
    currentPage="avaliacoes"
    @navigate="$emit('navigate', $event)"
  />
</template>

<style scoped>

.paginaAvaliacoes{
  color: white;
  padding: 24px;
  padding-bottom: 120px;
}

.titulo{
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.livroCard{
  display: flex;
  gap: 16px;
  background: #18181b;
  padding: 16px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.capaLivro{
  width: 90px;
  height: 130px;
  object-fit: cover;
  border-radius: 12px;
}

.conteudoLivro{
  flex: 1;
}

.tituloLivro{
  font-size: 16px;
  font-weight: 600;
}

.autor{
  color: #a1a1aa;
  margin-top: 4px;
}

.nota{
  margin-top: 10px;
  color: #27efb2;
  font-weight: bold;
}

.comentario{
  margin-top: 8px;
  color: #d4d4d8;
  line-height: 1.4;
}

</style>