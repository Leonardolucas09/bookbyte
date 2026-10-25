<script setup>
import { computed, ref } from 'vue';
import LogoBookByte from './LogoBookByte.vue';
import Busca from './icons/Busca.vue';
import Fechar from './icons/Fechar.vue';
import { livros } from '../data/livros.js';

const busca = ref('');
const mostrarSugestoes = ref(false);

const resultados = computed(() => {
    const termo = busca.value.trim().toLocaleLowerCase('pt-BR');
    if (!termo) return [];

    return livros.filter((livro) =>
        `${livro.titulo} ${livro.autor}`.toLocaleLowerCase('pt-BR').includes(termo)
    );
});

const sugestoes = computed(() => resultados.value.slice(0, 2));
const formatarAno = (data) => new Date(`${data}T00:00:00`).getFullYear();

const limparBusca = () => {
    busca.value = '';
    mostrarSugestoes.value = false;
};
</script>

<template>
    <header class="flex flex-col gap-3 bg-[#FFFEFA] px-6 py-4 md:flex-row md:items-center md:gap-6 border-b-2 border-b-gray-300">
        <div class="flex w-full items-center justify-between md:w-auto md:justify-start">
            <LogoBookByte />
            <span class="ml-6 hidden text-light-brown md:inline">Um capítulo de cada vez.</span>
            <div class="rounded-full bg-[#EDE3D5] p-3 font-semibold text-brown md:hidden">
                <span>CL</span>
            </div>
        </div>

        <div class="relative w-full md:ml-auto md:max-w-120">
            <label class="flex h-12 items-center gap-3 rounded-xl border border-[#8C6748] bg-[#FFFEFA] px-4 focus-within:ring-2 focus-within:ring-[#8C6748]/30">
                <Busca />
                <input
                    v-model="busca"
                    type="text"
                    placeholder="Busque por título ou autor"
                    class="min-w-0 flex-1 bg-transparent text-sm text-[#302E2B] outline-none placeholder:text-[#777168]"
                    role="combobox"
                    aria-autocomplete="list"
                    :aria-expanded="mostrarSugestoes && busca.trim().length > 0"
                    aria-controls="sugestoes-livros"
                    @focus="mostrarSugestoes = true"
                    @input="mostrarSugestoes = true"
                    @keydown.esc="limparBusca"
                />
                <button
                    v-if="busca"
                    type="button"
                    class="grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-[#F3F0EA]"
                    aria-label="Limpar busca"
                    @click="limparBusca"
                >
                    <Fechar />
                </button>
            </label>

            <div
                v-if="mostrarSugestoes && busca.trim()"
                id="sugestoes-livros"
                class="absolute left-0 top-[calc(100%+8px)] z-20 flex w-full flex-col gap-3 rounded-[10px] border border-[#E1DCD2] bg-[#FFFEFA] p-4 shadow-[0_12px_32px_rgba(48,46,43,0.094)]"
                role="listbox"
            >
                <div class="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-[#777168]">
                    <span>Sugestões de livros</span>
                    <span class="normal-case tracking-normal">{{ resultados.length }} resultado{{ resultados.length === 1 ? '' : 's' }}</span>
                </div>

                <template v-if="sugestoes.length">
                    <button
                        v-for="livro in sugestoes"
                        :key="livro.id"
                        type="button"
                        class="flex w-full items-center gap-4 rounded-lg p-2 text-left transition-colors hover:bg-[#F5F3EF]"
                        role="option"
                        @click="busca = livro.titulo; mostrarSugestoes = false"
                    >
                        <img :src="livro.capa" :alt="`Capa de ${livro.titulo}`" class="h-18 w-13 shrink-0 rounded object-cover shadow-sm" />
                        <span class="flex min-w-0 flex-1 flex-col gap-1">
                            <span class="truncate text-sm font-medium text-[#302E2B]">{{ livro.titulo }}</span>
                            <span class="truncate text-[13px] text-[#777168]">{{ livro.autor }} · {{ formatarAno(livro.dataPublicacao) }} · {{ livro.paginas }} páginas</span>
                        </span>
                        <span class="text-lg text-[#8B887F]" aria-hidden="true">↗</span>
                    </button>
                    <button type="button" class="pt-1 text-left text-sm font-medium text-[#805A3B] hover:underline" @click="mostrarSugestoes = false">
                        Ver todos os resultados para “{{ busca.trim() }}” →
                    </button>
                </template>

                <p v-else class="py-3 text-sm text-[#777168]">Nenhum livro encontrado para “{{ busca.trim() }}”.</p>
            </div>
        </div>

        <div class="hidden rounded-full bg-[#EDE3D5] p-3 font-semibold text-brown md:block">
            <span>CL</span>
        </div>
    </header>
</template>
