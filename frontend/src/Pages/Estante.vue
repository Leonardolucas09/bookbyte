<script setup>
import CardLivro from "../components/CardLivro.vue";
import Estrela from "../components/icons/Estrela.vue";
import { computed, ref } from "vue";
import { estante } from "../services/estante.js";

const livrosLidos = computed(() =>
    estante.value.filter((livro) => livro.statusLeitura === "Lido").length
);

const meta = ref(20);
const metaTemporaria = ref(meta.value);
const editandoMeta = ref(false);
const anoAtual = new Date().getFullYear();
const paginasLidasNoMes = computed(() =>
    estante.value
        .filter((livro) => livro.statusLeitura === "Lendo")
        .reduce((total, livro) => total + (Number(livro.paginasLidas) || 0), 0)
);
const diasLeituraNoMes = computed(() => {
    const agora = new Date();
    const dias = new Set();

    estante.value.forEach((livro) => {
        if (livro.statusLeitura !== "Lendo" || !livro.atualizadoEm) return;
        const data = new Date(livro.atualizadoEm);
        if (data.getMonth() === agora.getMonth() && data.getFullYear() === agora.getFullYear()) {
            dias.add(data.toDateString());
        }
    });

    return dias.size;
});

const progressoMeta = computed(() =>
    Math.min((livrosLidos.value / meta.value) * 100, 100)
);

function abrirEdicaoMeta() {
    metaTemporaria.value = meta.value;
    editandoMeta.value = true;
}

function salvarMeta() {
    if (metaTemporaria.value > 0) {
        meta.value = metaTemporaria.value;
    }
    editandoMeta.value = false;
}
</script>

<template>
    <div class="p-10">
        <div class="flex items-start gap-6">
            <p v-if="estante.length === 0" class="text-light-brown">
                Sua estante está vazia. Busque um livro no campo lá em cima e aperte Enter.
            </p>

            <div class="flex flex-1 flex-wrap content-start justify-start gap-6">
                <CardLivro
                    v-for="livro in estante"
                    :key="livro.id"
                    :livro="livro"
                />
            </div>

            <aside class="sticky top-6 flex w-full max-w-md shrink-0 flex-col gap-4">
                <section
                    class="rounded-3xl bg-[#EEE9DF] p-8 text-[#302D2A]"
                    aria-labelledby="ano-em-livros"
                >
                    <div class="flex items-center justify-between">
                        <h2
                            id="ano-em-livros"
                            class="text-sm font-semibold uppercase tracking-wide text-brown"
                        >
                            Seu ano em livros
                        </h2>
                        <Estrela />
                    </div>

                    <p class="lora mt-7 text-7xl leading-none">{{ livrosLidos }}</p>

                    <p class="mt-8 text-xl">
                        {{ livrosLidos === 1 ? "livro lido" : "livros lidos" }} em {{ anoAtual }}
                    </p>

                    <div
                        class="mt-6 h-1.5 overflow-hidden rounded-full bg-[#DDD8CF]"
                        role="progressbar"
                        :aria-valuenow="livrosLidos"
                        aria-valuemin="0"
                        :aria-valuemax="meta"
                        :aria-label="`${livrosLidos} de ${meta} livros da meta`"
                    >
                        <div
                            class="h-full rounded-full bg-brown transition-all"
                            :style="{ width: `${progressoMeta}%` }"
                        ></div>
                    </div>

                    <p class="mt-6 text-base leading-relaxed text-[#827B73]">
                        {{ livrosLidos }} de {{ meta }} livros da sua meta.
                        <template v-if="livrosLidos < meta">
                            Mais {{ meta - livrosLidos }}
                            {{ meta - livrosLidos === 1 ? "história" : "histórias" }} até dezembro.
                        </template>
                        <template v-else>
                            Meta alcançada. Que venham mais histórias!
                        </template>
                    </p>

                    <button
                        v-if="!editandoMeta"
                        type="button"
                        class="mt-5 font-medium text-brown hover:underline"
                        @click="abrirEdicaoMeta"
                    >
                        Ajustar minha meta →
                    </button>

                    <form
                        v-else
                        class="mt-5 flex items-end gap-2"
                        @submit.prevent="salvarMeta"
                    >
                        <label class="flex flex-1 flex-col gap-1 text-sm text-brown">
                            Meta de livros
                            <input
                                v-model.number="metaTemporaria"
                                type="number"
                                min="1"
                                required
                                class="rounded-md border border-[#C8B9A7] bg-white px-3 py-2 text-[#302D2A]"
                            />
                        </label>
                        <button
                            type="submit"
                            class="rounded-md bg-brown px-3 py-2 text-sm font-medium text-white"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            class="px-2 py-2 text-sm text-brown"
                            @click="editandoMeta = false"
                        >
                            Cancelar
                        </button>
                    </form>
                </section>

                <section class="rounded-2xl border border-[#E1DCD2] bg-[#FFFEFA] p-5 text-[#302D2A]" aria-labelledby="pequenos-avancos">
                    <h2 id="pequenos-avancos" class="lora text-lg">Pequenos avanços</h2>
                    <p class="lora mt-4 text-2xl">{{ paginasLidasNoMes }}</p>
                    <p class="text-xs text-[#827B73]">páginas lidas neste mês</p>
                    <p class="lora mt-4 text-2xl">{{ diasLeituraNoMes }}</p>
                    <p class="text-xs text-[#827B73]">{{ diasLeituraNoMes === 1 ? "dia" : "dias" }} com leitura neste mês</p>
                </section>

                <section class="px-5 py-3 text-[#4B4239]" aria-label="Citação do dia">
                    <p class="text-xl leading-none text-[#785A3E]" aria-hidden="true">❞</p>
                    <blockquote class="lora mt-2 text-base">“Cada escolha abre uma vida diferente.”</blockquote>
                    <p class="mt-2 text-xs text-[#827B73]">Sua nota · A Biblioteca da Meia-Noite, hoje, às 20:42</p>
                </section>
            </aside>
        </div>
    </div>
</template>
