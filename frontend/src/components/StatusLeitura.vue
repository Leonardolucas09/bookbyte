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
    'Lendo': { fundo: 'bg-[#EDE3D5]', texto: 'text-[#765B3F]' },
    'Lido': { fundo: 'bg-[#DDEBDD]', texto: 'text-[#3D6945]' },
    'Quero Ler': { fundo: 'bg-[#DDE8F2]', texto: 'text-[#426481]' },
    'Abandonei': { fundo: 'bg-[#F2DDDA]', texto: 'text-[#8A4E48]' },
};

const estiloAtual = computed(() => estilosStatus[props.status] ?? estilosStatus.Lendo);
</script>

<template>
    <div class="w-fit rounded-xl px-3 font-semibold" :class="[estiloAtual.fundo, estiloAtual.texto]">
        <span>• {{ status }}</span>
    </div>
</template>
emplate>