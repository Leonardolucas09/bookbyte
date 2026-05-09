<script setup>
    import bookByteLogo from '../assets/bookByte_logo.png'
    import userIcon from '../assets/avatarGenerico.png'
    import inicio from '../assets/sidebar/home.png'
    import minhaEstante from '../assets/sidebar/estante.png'
    import historico from '../assets/sidebar/historico.png'
    import avaliacoes from '../assets/sidebar/avaliacoes.png'
    import meuPerfil from '../assets/sidebar/perfil.png'
    import sair from '../assets/sidebar/sair.png'
</script>

<template>
    <div class="slide bg-black absolute py-3 px-5 top-0">
        <div class="flex gap-1 align-middle mt-4">
            <span>
                <img :src="bookByteLogo" alt="Logo da bookbyte"/>
            </span>
            <h1 class="text-2xl text-white font-bold">BookByte</h1>
        </div>
        
        <div class="flex  items-center gap-2 mt-15">
            <div>
                <img :src="userIcon" class="w-12" alt=""/>
            </div>
            <div class="leading-5">
                <h2 class="text-white font-bold text-lg">Fulano ciclano</h2>
                <p class="text-gray-400 text-base">fulano@gmail.com</p>
            </div>
        </div>

        <ul class="flex flex-col justify-start gap-8 mt-30">
            <li>
                <a href="">
                    <img :src="inicio" alt="" class="">
                    <p>Início</p>
                </a>
            </li>
            <li>
                <a href="">
                    <img :src="minhaEstante" alt="">
                    <p>Minha Estante</p>
                </a>
            </li>
            <li>
                <a href="">
                    <img :src="historico" alt="">
                    <p>Histórico</p>
                </a>
            </li>
            <li>
                <a href="">
                    <img :src="avaliacoes" alt="">
                    <p>Avaliações</p>
                </a>
            </li>
            <li>
                <a href="">
                    <img :src="meuPerfil" alt="">
                    <p>Meu Perfil</p>
                </a>
            </li>

            <li class="mt-70">
                <a href="">
                    <img :src="sair" alt="">
                    <p>Sair</p>
                </a>
            </li>
        </ul>

    </div>
</template>

<style>
    .slide {
        width: 50%; 
        height: 100%; 
        transition: 0.5s ease;
    }

    .slide ul li a {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: #FFF;
    }

    .slide ul li a img {
        width: 24px;
        height: 24px;
        object-fit: contain;
    }
</style>