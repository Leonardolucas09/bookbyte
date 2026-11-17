<script setup>
import IconeEstante from "./icons/IconeEstante.vue";
import IconeDescobrir from "./icons/IconeDescobrir.vue";
import IconeNotas from "./icons/IconeNotas.vue";
import IconePerfil from "./icons/IconePerfil.vue";

const itens = [
    { nome: "Estante", rota: "/estante", icone: IconeEstante },
    { nome: "Descobrir", rota: "/descobrir", icone: IconeDescobrir },
    { nome: "Notas", rota: "/notas", icone: IconeNotas },
    { nome: "Perfil", rota: "/configuracoes", icone: IconePerfil },
];
</script>

<template>
    <nav class="border-t border-line bg-input">
        <ul class="grid grid-cols-4">
            <li
                v-for="item in itens"
                :key="item.nome"
            >
                <RouterLink
                    :to="item.rota"
                    class="flex flex-col items-center gap-1 py-3 text-xs text-light-brown"
                    exact-active-class="font-semibold text-ink"
                >
                    <component
                        :is="item.icone"
                        class="size-5"
                    />
                    {{ item.nome }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>
