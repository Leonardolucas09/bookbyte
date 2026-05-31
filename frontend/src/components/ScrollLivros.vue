<script setup>
    import { useTemplateRef } from 'vue';
    import { livros } from '../data/livros.js'

    const carrossel = useTemplateRef('carrossel')

    function scrollDireita() {
        carrossel.value.scrollBy({
            left: 300, behavior: 'smooth'
        })
    }

    const livrosEmLoop = [...livros, ...livros]
</script>

<template>
    <div class="flex justify-between px-8 py-4 text-white text-xl font-semibold">
        <h2>Continuar lendo</h2>
        <button class="cursor-pointer" @click="scrollDireita">
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.55078 8.47656C9.55078 8.7207 9.45312 8.93555 9.26758 9.12109L1.5332 16.6895C1.35742 16.8652 1.14258 16.9531 0.888672 16.9531C0.390625 16.9531 0 16.5723 0 16.0645C0 15.8105 0.0976562 15.5957 0.253906 15.4297L7.36328 8.47656L0.253906 1.52344C0.0976562 1.35742 0 1.13281 0 0.888672C0 0.380859 0.390625 0 0.888672 0C1.14258 0 1.35742 0.0878906 1.5332 0.253906L9.26758 7.83203C9.45312 8.00781 9.55078 8.23242 9.55078 8.47656Z" fill="currentColor"/>
            </svg> 
        </button>
    </div>
    <div class="overflow-hidden scroll-smooth" ref="carrossel">
        <div class="flex gap-4 animate-scroll w-max">
            <div v-for="(livro, index) in livrosEmLoop" :key="index" 
                class="flex flex-col items-center w-28 ">
                <img :src="livro.capa" class="w-30 h-40 rounded" alt="Capa do livro Duna"/>
                <h3 class="text-white text-center">{{ livro.titulo}}</h3>
                <span class="text-center text-wrap text-sm text-gray-400 leading-none">{{ livro.autor }}</span> 

            </div>
        </div>
    </div>
</template>