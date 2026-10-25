<script setup>
import StatusLeitura from './StatusLeitura.vue';
import BarraProgresso from './BarraProgresso.vue';

const props = defineProps({
    livro: { type: Object, required: true },
});
</script>

<template>
    <a class="flex flex-col gap-2">
        <div class="flex w-fit rounded-md bg-[#EEE9DF] px-8 py-3">
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
                    class="text-lg font-medium text-[#765B3F]"
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
</template>
