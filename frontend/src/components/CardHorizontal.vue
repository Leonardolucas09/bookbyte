<script setup>
import StatusLeitura from './StatusLeitura.vue';
import BarraProgresso from './BarraProgresso.vue';
import Lapis from './icons/Lapis.vue';

const props = defineProps({
    livro: { type: Object, required: true },
});
</script>

<template>
    <div class="flex">
        <div class="flex w-full items-center justify-between border-2 border-[#E1DCD2] rounded-3xl bg-[#FFFEFA] px-8 py-3">
            <div class="flex gap-6">
                <img
                    :src="livro.capa"
                    :alt="`Capa de ${livro.titulo}`"
                    class="h-48 w-32 rounded object-cover"
                />
                <div class="flex flex-col w-80 gap-2 py-5">
                    <div>
                        <h4 class="lora text-xl ">{{ livro.titulo }}</h4>
                        <span class="text-sm text-light-brown">{{ livro.autor }}</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <StatusLeitura :status="livro.statusLeitura" />
                        <span
                            v-if="livro.statusLeitura === 'Lendo' && livro.paginas > 0"
                            class="whitespace-nowrap text-sm text-[#81796F]"
                        >
                            {{ livro.paginasLidas }} de {{ livro.paginas }} páginas · {{ Math.round((livro.paginasLidas / livro.paginas) * 100) }}%
                        </span>
                    </div>
                    <BarraProgresso
                        v-if="livro.statusLeitura === 'Lendo'"
                        :paginas-lidas="livro.paginasLidas"
                        :total-paginas="livro.paginas"
                        class="flex-col-reverse"
                    />
                </div>
            </div>
                <a href="#" class="flex gap-2 items-center p-4 rounded-xl
                                    text-brown border-2 border-[#E1DCD2] font-semibold">
                    <Lapis/>
                    Atualizar leitura
                </a>
        </div>
    </div>
</template>
