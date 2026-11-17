<script setup>
defineProps({
    titulo: { type: String, required: true },
    descricao: { type: String, default: "" },
});
</script>

<template>
    <section class="flex flex-col gap-5 rounded-2xl border border-line bg-input p-6">
        <header class="flex flex-col gap-3">
            <h2 class="lora text-2xl text-ink">
                {{ titulo }}
            </h2>
            <p
                v-if="descricao"
                class="text-sm text-light-brown"
            >
                {{ descricao }}
            </p>
        </header>
        <slot />
    </section>
</template>
