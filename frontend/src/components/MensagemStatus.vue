<script setup>
defineProps({
    mensagem: { type: String, default: "" },
    erro: { type: String, default: "" },
});
</script>

<template>
    <p
        v-if="erro"
        class="text-sm text-error"
        role="alert"
    >
        {{ erro }}
    </p>
    <p
        v-else-if="mensagem"
        class="text-sm text-success"
        role="status"
    >
        {{ mensagem }}
    </p>
</template>
