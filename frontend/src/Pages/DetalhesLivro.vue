<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import StatusLeitura from "../components/StatusLeitura.vue";
import BarraProgresso from "../components/BarraProgresso.vue";
import AtualizarLeitura from "../modals/AtualizarLeitura.vue";
import { estante, estanteCarregada } from "../services/estante.js";

const route = useRoute();
const modalAberto = ref(false);

// Procura na estante o livro do endereço /livro/:id
const livro = computed(() =>
    estante.value.find(item => item.id === Number(route.params.id)),
);

const porcentagem = computed(() => {
    if (!livro.value?.paginas) return 0;
    return Math.round((livro.value.paginasLidas / livro.value.paginas) * 100);
});

const ultimaAtualizacao = computed(() => {
    if (!livro.value?.atualizadoEm) return "";
    return new Date(livro.value.atualizadoEm).toLocaleDateString("pt-BR");
});
</script>

<template>
    <div class="p-10">
        <RouterLink
            to="/estante"
            class="text-sm text-light-brown hover:underline"
        >
            ← Voltar para a estante
        </RouterLink>

        <p
            v-if="!estanteCarregada"
            class="mt-6 text-light-brown"
        >
            Carregando...
        </p>

        <p
            v-else-if="!livro"
            class="mt-6 text-light-brown"
        >
            Livro não encontrado na sua estante.
        </p>

        <div
            v-else
            class="mt-6 flex flex-wrap gap-10"
        >
            <!-- Capa -->
            <div class="h-fit rounded-md bg-paper px-10 py-6">
                <img
                    v-if="livro.capa"
                    :src="livro.capa"
                    :alt="`Capa de ${livro.titulo}`"
                    class="h-72 w-48 rounded object-cover shadow"
                >
                <div
                    v-else
                    class="h-72 w-48 rounded bg-line"
                />
            </div>

            <!-- Informações -->
            <div class="flex max-w-xl flex-1 flex-col gap-6">
                <div>
                    <h1 class="lora text-4xl">
                        {{ livro.titulo }}
                    </h1>
                    <p class="mt-1 text-lg text-light-brown">
                        {{ livro.autor }}
                    </p>
                </div>

                <div class="flex items-center gap-3">
                    <StatusLeitura :status="livro.statusLeitura" />
                    <span
                        v-if="ultimaAtualizacao"
                        class="text-sm text-light-brown"
                    >
                        Atualizado em {{ ultimaAtualizacao }}
                    </span>
                </div>

                <!-- Progresso -->
                <div
                    v-if="livro.paginas"
                    class="flex flex-col gap-1"
                >
                    <span class="text-sm font-semibold text-brown">{{ porcentagem }}% lido</span>
                    <BarraProgresso
                        :paginas-lidas="livro.paginasLidas"
                        :total-paginas="livro.paginas"
                    />
                </div>

                <!-- Dados do livro -->
                <dl class="grid grid-cols-2 gap-4 rounded-xl border border-line p-5 text-sm">
                    <div>
                        <dt class="text-light-brown">
                            Editora
                        </dt>
                        <dd>{{ livro.editora || "Não informada" }}</dd>
                    </div>
                    <div>
                        <dt class="text-light-brown">
                            Ano
                        </dt>
                        <dd>{{ livro.ano || "Não informado" }}</dd>
                    </div>
                    <div>
                        <dt class="text-light-brown">
                            Páginas
                        </dt>
                        <dd>{{ livro.paginas || "Não informado" }}</dd>
                    </div>
                    <div>
                        <dt class="text-light-brown">
                            ISBN
                        </dt>
                        <dd>{{ livro.isbn || "Não informado" }}</dd>
                    </div>
                </dl>

                <!-- Nota de leitura -->
                <div>
                    <h2 class="lora text-xl">
                        Minha nota de leitura
                    </h2>
                    <p
                        v-if="livro.descricaoLeitura"
                        class="mt-2 whitespace-pre-line rounded-xl bg-field p-4 text-sm"
                    >
                        {{ livro.descricaoLeitura }}
                    </p>
                    <p
                        v-else
                        class="mt-2 text-sm text-light-brown"
                    >
                        Você ainda não escreveu nada sobre este livro.
                    </p>
                </div>

                <button
                    type="button"
                    class="w-fit rounded-lg bg-brown px-5 py-3 font-semibold text-on-brown hover:bg-brown-dark"
                    @click="modalAberto = true"
                >
                    Atualizar leitura
                </button>
            </div>
        </div>

        <AtualizarLeitura
            v-if="modalAberto"
            :livro="livro"
            @fechar="modalAberto = false"
            @salvo="modalAberto = false"
        />
    </div>
</template>
