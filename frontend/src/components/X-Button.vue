<script setup>
defineProps({
    text: { type: String, default: "" },
    color: { type: String, default: "#785A3E" },
    textColor: { type: String, default: "#FFFEFA" },
    type: { type: String, default: "button" },
    disabled: { type: Boolean, default: false },
});

defineEmits(["click"]);
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        :style="{ backgroundColor: color, color: textColor }"
        class="rounded-md px-4 py-2 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        @click="$emit('click', $event)"
    >
        <slot>{{ text }}</slot>
    </button>
</template>
