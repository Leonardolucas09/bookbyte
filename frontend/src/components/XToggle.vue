<script setup>
defineProps({
    label: { type: String, required: true },
    descricao: { type: String, default: "" },
});

const ligado = defineModel({ type: Boolean, default: false });
</script>

<template>
    <div class="flex items-center justify-between gap-4">
        <div class="flex flex-col gap-1">
            <span class="text-sm text-olive-900">{{ label }}</span>
            <span
                v-if="descricao"
                class="text-xs text-light-brown"
            >{{ descricao }}</span>
        </div>
        <button
            type="button"
            role="switch"
            :aria-checked="ligado"
            :aria-label="label"
            class="relative h-6 w-10 shrink-0 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:outline-none"
            :class="ligado ? 'bg-brown' : 'bg-line'"
            @click="ligado = !ligado"
        >
            <span
                class="absolute top-1 left-1 size-4 rounded-full bg-input shadow-sm transition-transform"
                :class="ligado ? 'translate-x-4' : 'translate-x-0'"
            />
        </button>
    </div>
</template>
