<script setup>
import { computed } from "vue";
import { FORCA_SENHA, TAMANHO_MINIMO_SENHA, calcularForcaSenha } from "../utils/senha.js";

const props = defineProps({
    senha: { type: String, required: true },
});

const NIVEIS = {
    [FORCA_SENHA.VAZIA]: { texto: "Use 8 ou mais caracteres, letras e números", cor: "text-light-brown", barra: "bg-line" },
    [FORCA_SENHA.FRACA]: { texto: `Senha fraca · mínimo de ${TAMANHO_MINIMO_SENHA} caracteres`, cor: "text-error", barra: "bg-error" },
    [FORCA_SENHA.MEDIA]: { texto: "Senha média · use 8 ou mais caracteres, letras e números", cor: "text-brown", barra: "bg-brown" },
    [FORCA_SENHA.FORTE]: { texto: "Senha forte · 8 ou mais caracteres, letras e números", cor: "text-success", barra: "bg-success" },
};

const forca = computed(() => calcularForcaSenha(props.senha));
const nivel = computed(() => NIVEIS[forca.value]);
</script>

<template>
    <div class="flex flex-col gap-1">
        <div
            class="mt-1 grid grid-cols-3 gap-1"
            aria-hidden="true"
        >
            <span
                v-for="barra in 3"
                :key="barra"
                class="h-[3px] rounded-full transition-colors"
                :class="forca >= barra ? nivel.barra : 'bg-line'"
            />
        </div>
        <span
            class="text-xs"
            :class="nivel.cor"
            aria-live="polite"
        >{{ nivel.texto }}</span>
    </div>
</template>
