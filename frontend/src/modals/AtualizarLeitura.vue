<script setup>
import { computed, ref } from "vue";
import { atualizarLeitura } from "../services/estante.js";

const props = defineProps({
    livro: { type: Object, required: true },
});
const emit = defineEmits(["fechar", "salvo"]);

const modo = ref("paginas");
const statusLeitura = ref(props.livro.statusLeitura);
const statusDisponiveis = ["Quero Ler", "Lendo", "Lido", "Abandonei"];
const totalPaginas = computed(() => Number(props.livro.paginas) || 0);
const paginasLidas = ref(Math.min(Number(props.livro.paginasLidas) || 0, totalPaginas.value || Infinity));
const descricaoLeitura = ref(props.livro.descricaoLeitura ?? "");
const salvando = ref(false);
const erro = ref("");
const porcentagem = computed({
    get() {
        return totalPaginas.value > 0 ? Math.round((paginasLidas.value / totalPaginas.value) * 100) : 0;
    },
    set(valor) {
        paginasLidas.value = Math.round((Number(valor) / 100) * totalPaginas.value);
    },
});

function fecharAoClicarFora(event) {
    if (event.target === event.currentTarget && !salvando.value) emit("fechar");
}

async function salvar() {
    erro.value = "";
    salvando.value = true;
    try {
        const livroAtualizado = await atualizarLeitura(
            props.livro.id,
            Number(paginasLidas.value),
            descricaoLeitura.value,
            statusLeitura.value,
        );
        emit("salvo", livroAtualizado);
    }
    catch (falha) {
        erro.value = falha.message || "Não foi possível salvar sua atualização.";
    }
    finally {
        salvando.value = false;
    }
}
</script>

<template>
    <div
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#302D2A]/45 p-4"
        @click="fecharAoClicarFora"
    >
        <section
            class="my-auto w-full max-w-[560px] rounded-2xl bg-[#FFFEFA] p-6 text-[#302D2A] shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-atualizar-leitura"
        >
            <header class="flex items-start justify-between">
                <div>
                    <h2 id="titulo-atualizar-leitura" class="lora text-3xl">Atualizar Leitura</h2>
                    <p class="mt-1 text-sm text-[#81796F]">Registre seu avanço e guarde uma lembrança.</p>
                </div>
                <button
                    type="button"
                    class="rounded p-1 text-xl leading-none text-[#81796F] hover:bg-[#F1EEE8]"
                    aria-label="Fechar"
                    @click="emit('fechar')"
                >×</button>
            </header>

            <div class="mt-5 flex items-center gap-4 rounded-xl bg-[#F5F3EF] p-3">
                <img
                    v-if="livro.capa"
                    :src="livro.capa"
                    :alt="`Capa de ${livro.titulo}`"
                    class="h-[72px] w-12 rounded object-cover shadow"
                />
                <div class="min-w-0">
                    <h3 class="lora truncate text-lg">{{ livro.titulo }}</h3>
                    <p class="text-sm text-[#81796F]">{{ livro.autor }}</p>
                    <p class="mt-0.5 text-xs text-[#81796F]">
                        Último registro: página {{ paginasLidas }}<template v-if="totalPaginas"> · {{ porcentagem }}%</template>
                    </p>
                </div>
            </div>

            <form class="mt-5" @submit.prevent="salvar">
                <label class="block text-sm font-medium">
                    Status da leitura
                    <select
                        v-model="statusLeitura"
                        class="mt-2 w-full rounded-xl border border-[#E1DCD2] bg-white px-3 py-3 text-sm text-[#785A3E] outline-none focus:border-[#A98D70] focus:ring-2 focus:ring-[#A98D70]/20"
                    >
                        <option v-for="status in statusDisponiveis" :key="status" :value="status">{{ status }}</option>
                    </select>
                </label>

                <fieldset>
                    <legend class="mb-2 text-sm font-semibold">Até onde você leu?</legend>
                    <div class="grid grid-cols-2 rounded-xl bg-[#EEE9DF] p-1">
                        <button
                            type="button"
                            class="rounded-lg px-3 py-2.5 text-sm transition"
                            :class="modo === 'paginas' ? 'bg-white font-medium text-[#785A3E] shadow-sm' : 'text-[#81796F]'"
                            @click="modo = 'paginas'"
                        >Páginas</button>
                        <button
                            type="button"
                            class="rounded-lg px-3 py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50"
                            :class="modo === 'porcentagem' ? 'bg-white font-medium text-[#785A3E] shadow-sm' : 'text-[#81796F]'"
                            :disabled="!totalPaginas"
                            @click="modo = 'porcentagem'"
                        >Porcentagem</button>
                    </div>
                </fieldset>

                <label v-if="modo === 'paginas'" class="mt-3 block text-sm">
                    Página atual
                    <span class="mt-2 flex items-center rounded-xl border border-[#A98D70] bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#A98D70]/30">
                        <input
                            v-model.number="paginasLidas"
                            type="number"
                            min="0"
                            :max="totalPaginas || undefined"
                            step="1"
                            required
                            class="min-w-0 flex-1 text-xl outline-none"
                        />
                        <span v-if="totalPaginas" class="text-xs text-[#81796F]">de {{ totalPaginas }} páginas</span>
                    </span>
                </label>
                <label v-else class="mt-3 block text-sm">
                    Porcentagem concluída
                    <span class="mt-2 flex items-center rounded-xl border border-[#A98D70] bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#A98D70]/30">
                        <input
                            v-model.number="porcentagem"
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            required
                            class="min-w-0 flex-1 text-xl outline-none"
                        />
                        <span class="text-sm text-[#81796F]">%</span>
                    </span>
                </label>

                <div v-if="totalPaginas" class="mt-2">
                    <div class="flex justify-between text-xs text-[#785A3E]">
                        <span>{{ porcentagem }}% concluído</span>
                        <span>{{ paginasLidas }} de {{ totalPaginas }} páginas</span>
                    </div>
                    <div class="mt-2 h-1 overflow-hidden rounded-full bg-[#DEDAD2]" role="progressbar" :aria-valuenow="porcentagem" aria-valuemin="0" aria-valuemax="100">
                        <div class="h-full rounded-full bg-[#785A3E] transition-all" :style="{ width: `${porcentagem}%` }" />
                    </div>
                </div>
                <p v-else class="mt-2 text-xs text-[#81796F]">Este livro não tem o total de páginas cadastrado; informe a página atual.</p>

                <label v-if="statusLeitura === 'Lendo'" class="mt-5 block text-sm">
                    <span class="flex items-center justify-between">
                        <span>Comentário / Nota de Leitura</span>
                        <span class="text-xs text-[#81796F]">Opcional</span>
                    </span>
                    <textarea
                        v-model="descricaoLeitura"
                        rows="3"
                        maxlength="5000"
                        placeholder="Escreva uma lembrança ou comentário sobre sua leitura..."
                        class="mt-2 w-full resize-y rounded-xl border border-[#E1DCD2] bg-white p-3 text-sm leading-relaxed outline-none focus:border-[#A98D70] focus:ring-2 focus:ring-[#A98D70]/20"
                    />
                </label>
                <p v-if="statusLeitura === 'Lendo'" class="mt-1 text-xs text-[#81796F]">🔒 Esta nota fica no seu diário pessoal.</p>

                <div class="mt-5 flex items-center gap-2 rounded-lg bg-[#EEE9DF] px-3 py-3 text-xs text-[#81796F]">
                    <span aria-hidden="true">♧</span>
                    <span>O livro ficará com o status “{{ statusLeitura }}”.</span>
                </div>

                <p v-if="erro" class="mt-3 text-sm text-red-700" role="alert">{{ erro }}</p>

                <footer class="mt-5 flex justify-end gap-3">
                    <button
                        type="button"
                        class="rounded-lg border border-[#E1DCD2] px-4 py-2.5 text-sm font-medium text-[#785A3E] hover:bg-[#F5F3EF] disabled:opacity-50"
                        :disabled="salvando"
                        @click="emit('fechar')"
                    >Cancelar</button>
                    <button
                        type="submit"
                        class="rounded-lg bg-[#785A3E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#634A34] disabled:cursor-wait disabled:opacity-60"
                        :disabled="salvando"
                    >{{ salvando ? "Salvando..." : "✓  Salvar atualização" }}</button>
                </footer>
            </form>
        </section>
    </div>
</template>
