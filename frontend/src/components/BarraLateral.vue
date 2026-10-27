<script setup>
import IconeEstante from "./icons/IconeEstante.vue";
import IconeDescobrir from "./icons/IconeDescobrir.vue";
import IconeNotas from "./icons/IconeNotas.vue";
import IconeCafe from "./icons/IconeCafe.vue";
import IconeConfiguracoes from "./icons/IconeConfiguracoes.vue";

const menuItems = [
    { nome: "Estante", rota: "/estante", icone: IconeEstante },
    { nome: "Descobrir", rota: "/descobrir", icone: IconeDescobrir },
    { nome: "Notas de leitura", rota: "/notas", icone: IconeNotas },
];
</script>

<template>
    <aside class="flex w-72 shrink-0 flex-col overflow-y-auto border-r border-sand bg-input">
        <nav class="flex flex-1 flex-col px-6 pt-10">
            <span class="mb-4 px-4 text-xs font-semibold uppercase text-light-brown">Seu espaço</span>
            <ul class="flex flex-col gap-2">
                <li
                    v-for="item in menuItems"
                    :key="item.nome"
                >
                    <RouterLink
                        :to="item.rota"
                        class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-light-brown transition-colors hover:bg-sand/50"
                        exact-active-class="bg-sand font-semibold text-brown hover:bg-sand"
                    >
                        <component
                            :is="item.icone"
                            class="size-5"
                        />
                        <span>{{ item.nome }}</span>
                    </RouterLink>
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
            <RouterLink
                to="/configuracoes"
                class="mt-4 flex items-center gap-3 text-light-brown hover:text-brown"
                exact-active-class="font-semibold text-brown"
            >
                <IconeConfiguracoes class="size-5" />
                <span>Configurações</span>
            </RouterLink>
        </div>
    </aside>
</template>
