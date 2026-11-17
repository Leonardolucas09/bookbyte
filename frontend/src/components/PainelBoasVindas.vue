<script setup>
import ilustracaoLivros from "../assets/livros.svg";
import LogoBookByte from "./LogoBookByte.vue";

defineProps({
    titulo: { type: String, required: true },
});
</script>

<template>
    <section class="flex flex-1 flex-col gap-20 bg-[#EEE9DF]">
        <div class="flex h-full flex-col gap-20 p-10">
            <LogoBookByte />
            <div class="flex flex-col gap-5">
                <span class="text-sm uppercase text-brown">Um capítulo de cada vez</span>
                <h2 class="lora text-5xl text-olive-900">
                    {{ titulo }}
                </h2>
                <span class="text-base text-light-brown">Organize seus livros, acompanhe cada página e guarde o que a leitura deixa em você.</span>
            </div>

            <div class="flex justify-center">
                <img
                    :src="ilustracaoLivros"
                    alt=""
                    width="512"
                    height="305"
                    class="h-auto max-w-full"
                >
            </div>

            <div>
                <h4 class="lora text-3xl text-olive-900">
                    Não importa a velocidade. Toda página é um novo lugar.
                </h4>
                <span class="text-sm text-light-brown">Sua leitura, no seu ritmo.</span>
            </div>
        </div>
    </section>
</template>
