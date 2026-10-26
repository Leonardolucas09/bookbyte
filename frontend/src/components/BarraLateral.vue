<script setup>
import IconeEstante from "./icones/IconeEstante.vue";
import IconeDescobrir from "./icones/IconeDescobrir.vue";
import IconeNotas from "./icones/IconeNotas.vue";
import IconeCafe from "./icones/IconeCafe.vue";
import IconeConfiguracoes from "./icones/IconeConfiguracoes.vue";

defineProps({
    paginaAtual: { type: String, default: "" },
});

defineEmits(["navigate"]);

const menuItems = [
    { nome: "Estante", rota: "estante", icone: IconeEstante },
    { nome: "Descobrir", rota: "", icone: IconeDescobrir },
    { nome: "Notas de leitura", rota: "notas", icone: IconeNotas },
];
</script>

<template>
    <aside class="fixed top-0 left-0 z-40 flex h-screen w-72 flex-col overflow-y-auto border-r border-sand bg-input">
        <nav class="flex flex-1 flex-col px-6 pt-10">
            <span class="mb-4 px-4 text-xs font-semibold uppercase text-light-brown">Seu espaço</span>
            <ul class="flex flex-col gap-2">
                <li
                    v-for="item in menuItems"
                    :key="item.nome"
                >
                    <button
                        type="button"
                        class="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-colors"
                        :class="item.rota === paginaAtual
                            ? 'bg-sand font-semibold text-brown'
                            : 'text-light-brown hover:bg-sand/50'"
                        @click="$emit('navigate', item.rota)"
                    >
                        <component
                            :is="item.icone"
                            class="size-5"
                        />
                        <span>{{ item.nome }}</span>
                    </button>
                </li>
            </ul>
        </nav>

        <div class="flex flex-col gap-4 px-10 pb-10">
            <IconeCafe class="size-6 text-brown" />
            <p class="font-lora text-xl text-olive-900">
                Reserve um tempo para uma boa história.
            </p>
            <p class="text-xs text-light-brown">
                Sua leitura, no seu ritmo.
            </p>
            <button
                type="button"
                class="mt-4 flex cursor-pointer items-center gap-3 text-light-brown hover:text-brown"
                @click="$emit('navigate', 'configuracoes')"
            >
                <IconeConfiguracoes class="size-5" />
                <span>Configurações</span>
            </button>
        </div>
    </aside>
</template>
