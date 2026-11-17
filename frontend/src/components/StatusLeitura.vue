<script setup>
import { computed } from 'vue';

const props = defineProps({
    status: {
        type: String,
        default: 'Lendo',
        validator: (value) => ['Lendo', 'Lido', 'Quero Ler', 'Abandonei'].includes(value),
    },
});

const estilosStatus = {
    'Lendo': { fundo: 'bg-sand', texto: 'text-brown' },
    'Lido': { fundo: 'bg-success-soft', texto: 'text-success' },
    'Quero Ler': { fundo: 'bg-info-soft', texto: 'text-info' },
    'Abandonei': { fundo: 'bg-error-soft', texto: 'text-error' },
};

const estiloAtual = computed(() => estilosStatus[props.status] ?? estilosStatus.Lendo);
</script>

<template>
    <div class="w-fit rounded-xl px-3 font-semibold" :class="[estiloAtual.fundo, estiloAtual.texto]">
        <span>• {{ status }}</span>
    </div>
</template>
emplate>