<script setup>
    import capaDuna from '../assets/duna_capa.jpg'
</script>

<template>
    <div class="flex justify-between px-8 py-4 text-white text-xl font-semibold">
        <h2>Se não terminou...</h2>
        <button class="cursor-pointer">
            > 
        </button>
    </div>
    <div class="flex flex-row justify-around px-6 font-bold gap-1">
        <div class="flex flex-col items-center">
            <img :src="capaDuna" class="w-30 rounded" alt="Capa do livro Duna"/>
            <h3 class="text-white">Nome livro</h3>
            <span class="text-gray-400 leading-none">Nome do autor</span> 
        </div>

        <div class="flex flex-col items-center">
            <img :src="capaDuna" class="w-30 rounded" alt="Capa do livro Duna"/>
            <h3 class="text-white">Nome livro</h3>
            <span class="text-gray-400 leading-none">Nome do autor</span> 
        </div>

        <div class="flex flex-col items-center">
            <img :src="capaDuna" class="w-30 rounded" alt="Capa do livro Duna"/>
            <h3 class="text-white">Nome livro</h3>
            <span class="text-gray-400 leading-none">Nome do autor</span> 
        </div>

        
    </div>
</template>