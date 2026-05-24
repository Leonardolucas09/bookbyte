<script setup>
import bookByteLogo from '../assets/bookByte_logo.png'
import userIcon from '../assets/avatarGenerico.png'
import inicio from '../assets/sidebar/home.png'
import minhaEstante from '../assets/sidebar/estante.png'
import historico from '../assets/sidebar/historico.png'
import avaliacoes from '../assets/sidebar/avaliacoes.png'
import meuPerfil from '../assets/sidebar/perfil.png'
import sair from '../assets/sidebar/sair.png'
import InputBuscarLivros from './InputBuscarLivros.vue'

defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['toggle', 'close']);

const handleToggle = () => {
    emit('toggle');
};

const handleClose = () => {
    emit('close');
};
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="handleClose">
    </div>
    <div class="flex justify-start items-center px-8 gap-4">
        <div class="toggle cursor-pointer" @click="handleToggle">
            <svg width="30" height="30" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5H21.5M1.5 9.2037H21.5M1.5 17.5H21.5" stroke="white" stroke-width="3"
                    stroke-linecap="round" />
            </svg>
        </div>

        <InputBuscarLivros />
    </div>

    <div class="slide bg-black absolute py-3 px-5 top-0 z-50" @click.stop :class="{ 'slide-open': isOpen }">
        <div class="slide-header">
            <img :src="bookByteLogo" alt="Logo da bookbyte" />
            <h1 class="text-2xl text-white font-bold">BookByte</h1>
        </div>

        <div class="flex items-center gap-2 mt-15">
            <div>
                <img :src="userIcon" class="min-w-12" alt="" />
            </div>
            <div class="leading-5">
                <h2 class="text-white font-bold text-lg">Fulano ciclano</h2>
                <p class="text-gray-400 text-base">fulano@gmail.com</p>
            </div>
        </div>
        <nav class="slide-nav">
            <ul class="flex flex-col gap-8">
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
            </ul>
            <a href="" class="fundo">
                <img :src="sair" alt="">
                <p>Sair</p>
            </a>
        </nav>
    </div>
</template>

<style>
.slide {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    width: 70%;
    height: 100%;
    transition: 0.5s ease;
    transform: translateX(-100%);
    overflow: hidden;
}
.slide-header {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.slide-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 8rem;
    padding-bottom: 1.5rem;
    overflow-y: auto;
}

.slide ul li a,
.fundo {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #FFF;
}

.slide ul li a img,
.fundo img {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.slide-open {
    transform: translateX(0);
}
</style>