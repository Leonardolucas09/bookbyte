<script setup>
import LogoBookByte from "../components/LogoBookByte.vue";
import PainelBoasVindas from "../components/PainelBoasVindas.vue";

defineProps({
    tituloPainel: { type: String, required: true },
    titulo: { type: String, required: true },
    subtitulo: { type: String, required: true },
});
</script>

<template>
    <main class="flex min-h-screen">
        <div class="hidden flex-1 lg:flex">
            <PainelBoasVindas :titulo="tituloPainel" />
        </div>

        <section class="flex flex-1 justify-center p-10 lg:items-center">
            <div class="flex w-full max-w-md flex-col">
                <LogoBookByte class="lg:hidden" />

                <header class="mt-12 flex flex-col gap-3 lg:mt-0">
                    <span class="text-sm uppercase text-brown">Bem-vinda ao BookByte</span>
                    <h1 class="lora text-4xl text-ink">
                        {{ titulo }}
                    </h1>
                    <p class="text-sm text-light-brown">
                        {{ subtitulo }}
                    </p>
                </header>

                <div class="mt-6">
                    <slot />
                </div>

                <hr class="mt-6 border-line">

                <div class="mt-6">
                    <slot name="alternativa" />
                </div>

                <footer class="mt-auto flex justify-between pt-10 text-xs text-light-brown lg:mt-0 lg:pt-12">
                    <a href="#">Precisa de ajuda?</a>
                    <a href="#">Privacidade · Termos</a>
                </footer>
            </div>
        </section>
    </main>
</template>
