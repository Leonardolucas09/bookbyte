<script setup>
    import bookByteLogo from '../assets/bookByte_logo.png'
    import userIcon from '../assets/avatarGenerico.png'
    import inicio from '../assets/sidebar/home.png'
    import minhaEstante from '../assets/sidebar/estante.png'
    import historico from '../assets/sidebar/historico.png'
    import avaliacoes from '../assets/sidebar/avaliacoes.png'
    import meuPerfil from '../assets/sidebar/perfil.png'
    import sair from '../assets/sidebar/sair.png'

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
    <div v-if="isOpen" 
        class="fixed inset-0 z-40" 
        @click="handleClose">
    </div>
        <div class="flex justify-center px-8 gap-4">        
            <div class="toggle cursor-pointer" @click="handleToggle">
                <svg width="30" height="30" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1.5H21.5M1.5 9.2037H21.5M1.5 17.5H21.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </div>

        </div>

        <div class="slide bg-black absolute py-3 px-5 top-0 z-50" 
            @click.stop
            :class="{ 'slide-open': isOpen }">
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
        transform: translateX(-100%);
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

    .comum {
        position: absolute;
        height: 3px;
        width: 100%;
        background-color: #FFF;
        border-radius: 50px;
        transition: 0.3s ease;
    }

    .slide-open {
        transform: translateX(0);
    }

</style>