<script setup>
import StatusLeitura from './StatusLeitura.vue';
import BarraProgresso from './BarraProgresso.vue';
import { atualizarStatus } from '../services/estante.js';

const statusDisponiveis = ['Quero Ler', 'Lendo', 'Lido', 'Abandonei'];

function mudarStatus(event) {
    atualizarStatus(props.livro.id, event.target.value);
}

const props = defineProps({
    livro: { type: Object, required: true },
});
</script>

<template>
    <article class="flex flex-col gap-2 w-48">
        <div class="flex  w-fit rounded-md bg-[#EEE9DF] px-8 py-3">
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
            <label class="flex flex-col gap-1 text-sm text-light-brown">
                Alterar status
                <select
                    :value="livro.statusLeitura"
                    class="rounded-md border border-[#D8CBBB] bg-white px-2 py-1 text-[#765B3F]"
                    :aria-label="`Status de leitura de ${livro.titulo}`"
                    @change="mudarStatus"
                >
                    <option v-for="status in statusDisponiveis" :key="status" :value="status">
                        {{ status }}
                    </option>
                </select>
            </label>
            <BarraProgresso
                v-if="livro.statusLeitura === 'Lendo'"
                :paginas-lidas="livro.paginasLidas"
                :total-paginas="livro.paginas"
            />
        </div>
    </article>
</template>
