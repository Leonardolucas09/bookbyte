<script setup>
import IconeSetaBaixo from "./icons/IconeSetaBaixo.vue";

defineProps({
    label: { type: String, required: true },
    name: { type: String, required: true },
    opcoes: { type: Array, required: true },
});

const modelo = defineModel({ type: String, default: "" });
</script>

<template>
    <div class="flex flex-col gap-1">
        <label
            :for="name"
            class="text-sm text-ink"
        >
            {{ label }}
        </label>
        <div class="relative">
            <select
                :id="name"
                v-model="modelo"
                :name="name"
                class="w-full cursor-pointer appearance-none rounded-md border border-line bg-field py-2 pl-3 pr-10 outline-none focus:ring-2 focus:ring-brown"
            >
                <option
                    v-for="opcao in opcoes"
                    :key="opcao.valor"
                    :value="opcao.valor"
                >
                    {{ opcao.texto }}
                </option>
            </select>
            <IconeSetaBaixo class="pointer-events-none absolute inset-y-0 right-3 my-auto text-light-brown" />
        </div>
    </div>
</template>
