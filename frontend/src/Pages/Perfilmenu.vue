<script setup>
import { ref } from 'vue';
import BarraLateral from '../components/BarraLateral.vue';
defineEmits(['navigate']);
    
    const sidebarAberta = ref(false);

    const toggleSidebar = () => {
    sidebarAberta.value = !sidebarAberta.value;
    };

    const fecharSidebar = () => {
    sidebarAberta.value = false;
    };
</script>

<template>
    
    <div class="perfil-container">
        
    <div class="perfil-card">
        <div class="perfil-header">
            <BarraLateral
                :is-home="false"
                :isOpen="sidebarAberta"
                @toggle="toggleSidebar"
                @close="fecharSidebar"
                @navigate="$emit('navigate', $event)"
            />
            <h1>Perfil</h1>
        </div>
        <div class="perfil-informacoes">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="55" fill="#2b2b2b"/>
                <circle cx="60" cy="44" r="16" stroke="#27efb2" stroke-width="4"/>
                <path d="M28 92c0-17 14-30 32-30s32 13 32 30" stroke="#27efb2" stroke-width="4" stroke-linecap="round"/>
            </svg>
            <div class="texto-coluna-info">
                <p class="nomePerfil">Fulano Ciclano</p>
                <p class="categoriaPerfil">Leitor</p>
            </div>
        </div>
        <h2 class="text-white text-xl font-bold mt-4 mb-2">O que você pode fazer:</h2>
        <div class="menuOpcoes">
            <div class="perfilOpcao">
                <svg class="marcador" width="25" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4 2 H36 V46 L20 34 L4 46 Z" fill="#27efb2"/>
                </svg>
                <svg class="icones-card"width="40" height="35" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <circle cx="20" cy="10" r="8" stroke="#27efb2" stroke-width="3"/>
                     <path d="M6 34c0-8 6-14 14-14s14 6 14 14" stroke="#27efb2" stroke-width="3" stroke-linecap="round"/>
                </svg>
                <p>Perfil</p>
                <p>Edite seu perfil</p>
            </div>
            <div class="minhaEstante">
                 <svg class="marcador" width="25" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4 2 H36 V46 L20 34 L4 46 Z" fill="#5dd141"/>
                </svg>
                <svg class="icones-card" width="40" height="35" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4 H32 Q34 4 34 6 V34 Q34 36 32 36 H4 Q2 36 2 34 V6 Q2 4 4 4 Z" stroke="#5dd141" stroke-width="3"/>
                    <rect x="6" y="28" width="24" height="3" rx="1" fill="#5dd141"/>
                </svg>

                <p>Estante</p>
                <p>Organize e visualize seus livros por status</p>
            </div>
            <div class="minhaLista">
                 <svg class="marcador" width="25" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4 2 H36 V46 L20 34 L4 46 Z" fill="#FA5252"/>
                </svg>
                <svg class="icones-card" width="35" height="35" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 32 C20 32 4 22 4 12 C4 7 7.5 4 12 4 C15 4 18 6 20 8 C22 6 25 4 28 4 C32.5 4 36 7 36 12 C36 22 20 32 20 32 Z" stroke="#FA5252" stroke-width="3" stroke-linejoin="round"/>
                </svg>
                <p>Minha lista</p>
                <p>Acesse seus favoritos</p>
            </div>
            <div class="minhasAvaliacoes">
                <svg class="marcador" width="25" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4 2 H36 V46 L20 34 L4 46 Z" fill="#ED53B2"/>
                </svg>
                 <svg class="icones-card" width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4 L23.5 14.5 H34.5 L25.8 21 L29 32 L20 25.5 L11 32 L14.2 21 L5.5 14.5 H16.5 Z" stroke="#ED53B2" stroke-width="2.5" stroke-linejoin="round"/>
                </svg>
                <p>Avaliações</p>
                <p>Adicione comentários e avalie livros</p>
            </div>
        </div>
        <p class="footer-textTelaPerfilMenu">@2026 BugOps</p>
    </div>
    </div>
</template>
<style>

.perfil-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    color: white;
    font-size: 20px;
}

.perfil-card h1{
    margin: 0;
    color: white;
}

.perfil-header > * {
    min-width: 0;
}

.perfil-container{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
}

.perfil-card{
    width: 100%;
    max-width: 400px;
    min-height:100vh;
    box-sizing: border-box;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 24px;
}


.perfil-card h2{
    color: white;
    font-size: 18px;
    font-weight: normal;
    padding-left: 4px;
    align-self: flex-start;
    font-family: 'helvetica', sans-serif;
}

.perfil-informacoes{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;
}

.texto-coluna-info{
    display: flex;
    flex-direction: column;
}

.texto-coluna-info p{
    margin: 0;
}
.nomePerfil{
    color: white;
    font-size: 18px;
    font-weight: bold;
    font-family:Arial, Helvetica, sans-serif;
}
.categoriaPerfil{
    color: rgba(188, 179, 179, 0.8);
    font-size: 16px;
    font-weight: normal;
    font-family:Arial, Helvetica, sans-serif;
}

.menuOpcoes{
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 10px;
    column-gap: 10px;
    width: 100%;
}

.perfilOpcao, .minhaEstante, .minhaLista, .minhasAvaliacoes{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: black;
    border: 2px solid #2b2b2b;
    border-radius: 14px;
    min-height: 130px;
    padding: 8px;
    box-sizing: border-box;
    font-size: 12px;
    font-family: 'Helvetica', sans-serif;
    transition: transform 0.15s ease;
    cursor: pointer;
}

.perfilOpcao:active,.minhaEstante:active,.minhaLista:active,.minhasAvaliacoes:active {
    transform: scale(1.05);
}
.perfilOpcao p, .minhaEstante p, .minhaLista p, .minhasAvaliacoes p{
    text-align:left;
    padding-left: 4px;
}

.perfilOpcao p:first-of-type { color: #27efb2; font-weight: bold; padding-top: 10px;}
.minhaEstante p:first-of-type { color: #5dd141; font-weight: bold; padding-top:10px; }
.minhaLista p:first-of-type { color: #FA5252; font-weight: bold; padding-top: 10px; }
.minhasAvaliacoes p:first-of-type { color: #ED53B2; font-weight: bold; padding-top: 10px; }

.perfilOpcao p:nth-of-type(2) { color: #27efb2; font-weight:lighter;padding-top:4px; }
.minhaEstante p:nth-of-type(2) { color: #5dd141; font-weight:lighter; }
.minhaLista p:nth-of-type(2) { color: #FA5252; font-weight: lighter; }
.minhasAvaliacoes p:nth-of-type(2) { color: #ED53B2; font-weight: lighter; }

.perfilOpcao:active{ border-color: #27efb2; box-shadow: 0 0 10px rgba(39,239,178,0.25);}
.minhaEstante:active { border-color: #5dd141; box-shadow: 0 0 10px rgba(93, 209, 65, 0.25);}
.minhaLista:active { border-color: #FA5252; box-shadow: 0 0 10px rgba(250, 82, 82, 0.25);}
.minhasAvaliacoes:active { border-color: #ED53B2; box-shadow: 0 0 10px rgba(237, 83, 178, 0.25);}

.perfilOpcao:active .icones-card circle,
.perfilOpcao:active .icones-card path {
    stroke: none;
    fill: #27efb2;
}

.minhaEstante:active .icones-card path {
    stroke: none;
    fill: #5dd141;
}
.minhaEstante:active .icones-card rect {
    fill: black;
}

.minhaLista:active .icones-card path {
    stroke: none;
    fill: #FA5252;
}

.minhasAvaliacoes:active  .icones-card path {
    stroke: none;
    fill: #ED53B2;
}

.marcador{
    position: absolute;
    right:10px;
    top: -10px;
}

.icones-card{
    align-self:flex-start;
    margin-top: 10px;
}

.footer-textTelaPerfilMenu {
    margin-top: auto;
    padding-top: 30px;
    color: #666;
    font-size: 14px;
    text-align: center;
}
</style>