<script setup>
import { onMounted } from "vue";
import Cabecalho from "../components/Cabecalho.vue";
import BarraLateral from "../components/BarraLateral.vue";
import BarraNavegacao from "../components/BarraNavegacao.vue";
import { pegarUsuario } from "../services/api.js";
import { carregarEstante } from "../services/estante.js";
import { aplicarAparencia } from "../utils/aparencia.js";

onMounted(() => {
    carregarEstante();
    pegarUsuario()
        .then(usuario => aplicarAparencia(usuario.preferencias))
        .catch(() => {}); // sem resposta da API, fica a aparência salva no navegador
});
</script>

<template>
    <div class="flex h-screen flex-col">
        <Cabecalho />
        <div class="flex min-h-0 flex-1">
            <div class="hidden md:flex">
                <BarraLateral />
            </div>
            <main class="flex-1 overflow-y-auto">
                <RouterView />
            </main>
        </div>
        <BarraNavegacao class="md:hidden" />
    </div>
</template>
