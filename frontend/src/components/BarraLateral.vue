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
    isOpen: Boolean,
    isHome: Boolean
});

const emit = defineEmits(['toggle', 'close', 'navigate']);

const goToHome = () => {
    emit('navigate', '');
};

const goToIntroducao = () => {
    setTimeout(() => {
        emit('navigate', 'introducao');
    }, 3200);
};

const goToPerfil = () => {
    emit('navigate', 'perfil');
};

const handleToggle = () => {
    emit('toggle');
};

const handleClose = () => {
    emit('close');
};

const navegar = (rota) => {
    emit('navigate', rota);
    emit('close');
};

const logOutMessage = () => {
    handleClose();
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background= 'rgba(0, 0, 0, 0.25)';
    overlay.style.backdropFilter='blur(3px)';
    overlay.style.webkitBackdropFilter='blur(3px)';
    overlay.style.zIndex = '9998';
    document.body.appendChild(overlay);
    const toast = document.createElement('div');
    toast.innerHTML = `
    <div class="toast-bar"></div>
        <div class="toast-text">
            <p>Saindo da conta...</p>
        </div>
    `;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left='50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.width='260px';
    toast.style.background='#111';
    toast.style.color='#fff';
    toast.style.padding = '16px';
    toast.style.boxShadow = '0 0 15px rgba(39,239,178,0.25)';
    toast.style.zIndex = '9999';
    toast.style.fontFamily='poppins, sans-serif';
    toast.style.overflow = 'hidden';
    document.body.appendChild(toast);

    const bar = toast.querySelector('.toast-bar');
    bar.style.position = 'absolute';
    bar.style.top='0';
    bar.style.right='0';
    bar.style.height = '3px';
    bar.style.opacity = '0.8';
    bar.style.width='100%';
    bar.style.background='#27efb2';
    bar.style.transition = 'width 3s linear';
    setTimeout(() => {
        bar.style.width = '0';
    }, 100);
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
            overlay.remove();
        }, 300);
    }, 3000);

    goToIntroducao();
};
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="handleClose">
    </div>
    <div class="flex justify-start items-center gap-4">
        <div class="toggle cursor-pointer" @click="handleToggle">
            <svg width="30" height="30" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5H21.5M1.5 9.2037H21.5M1.5 17.5H21.5" stroke="white" stroke-width="3"
                    stroke-linecap="round" />
            </svg>
        </div>
            <InputBuscarLivros v-if="isHome"/>
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
            <div class="flex flex-col m-0">
                <h2 class="text-white font-bold text-lg m-0">Fulano ciclano</h2>
                <p class="text-gray-400 text-base">fulano@gmail.com</p>
            </div>
        </div>
        <nav class="slide-nav">
            <ul class="flex flex-col gap-8">
                <li>
                    <a @click="goToHome" class="cursor-pointer">
                        <img :src="inicio" alt="" class="">
                        <p>Início</p>
                    </a>
                </li>
                <li>
                    <a href="" @click.prevent="navegar('estante')">
                        <img :src="minhaEstante" alt="">
                        <p>Minha Estante</p>
                    </a>
                </li>
                <li>
                    <a href="" @click.prevent="navegar('historico')">
                        <img :src="historico" alt="">
                        <p>Histórico</p>
                    </a>
                </li>
                <li>
                    <a href="" @click.prevent="navegar('avaliacoes')">
                        <img :src="avaliacoes" alt="">
                        <p>Avaliações</p>
                    </a>
                </li>
                <li>
                    <a @click="goToPerfil" class="cursor-pointer">
                        <img :src="meuPerfil" alt="">
                        <p>Meu Perfil</p>
                    </a>
                </li>
            </ul>
            <a @click="goToIntroducao" class="fundo cursor-pointer" @click.prevent="logOutMessage">
                <img :src="sair" alt="">
                <p>Sair</p>
            </a>
        </nav>
    </div>
</template>

<style>
.slide {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    width: clamp(280px, 70%, 360px);
    max-width: 360px;
    height: 100vh;
    transition: transform 0.5s ease;
    transform: translateX(-100%);
    overflow: hidden;
    background: #000;
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
