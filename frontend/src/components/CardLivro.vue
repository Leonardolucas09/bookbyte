<script setup>
import StatusLeitura from './StatusLeitura.vue';
import BarraProgresso from './BarraProgresso.vue';
import AtualizarLeitura from '../modals/AtualizarLeitura.vue';
import { ref } from 'vue';

const props = defineProps({
    livro: { type: Object, required: true },
});
const modalAberto = ref(false);
</script>

<template>
    <a @click="modalAberto = true" class="flex flex-col gap-2 w-48 cursor-pointer">
        <div class="flex  w-fit rounded-md bg-paper px-8 py-3">
            <img
                :src="livro.capa"
                :alt="`Capa de ${livro.titulo}`"
                class="h-48 w-32 rounded object-cover"
            />
        </div>
        <div class="flex max-w-md flex-col gap-2">
            <div>
                <h4 class="lora text-lg font-semibold">{{ livro.titulo }}</h4>
                <span class="text-sm text-light-brown">{{ livro.autor }}</span>
            </div>
            <div class="flex items-center justify-between">
                <StatusLeitura :status="livro.statusLeitura" />
                <span
                    v-if="livro.statusLeitura === 'Lendo' && livro.paginas > 0"
                    class="text-lg font-medium text-brown"
                >
                    {{ Math.round((livro.paginasLidas / livro.paginas) * 100) }}%
                </span>
            </div>
            <BarraProgresso
                v-if="livro.statusLeitura === 'Lendo'"
                :paginas-lidas="livro.paginasLidas"
                :total-paginas="livro.paginas"
            />
        </div>
    </a>
    <AtualizarLeitura
        v-if="modalAberto"
        :livro="livro"
        @fechar="modalAberto = false"
        @salvo="modalAberto = false"
    />
</template>
