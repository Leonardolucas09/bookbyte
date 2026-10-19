<script setup>
import { ref } from "vue";

const props = defineProps({
    label: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    modelValue: { type: [String, Number], default: "" },
    autocomplete: { type: String, default: undefined },
});

const emit = defineEmits(["update:modelValue"]);
const isPasswordVisible = ref(false);

const updateValue = (event) => {
    emit("update:modelValue", event.target.value);
};
</script>

<template>
    <div :class="type === 'checkbox' ? 'flex items-center gap-2' : 'flex flex-col gap-1'">
        <template v-if="type === 'checkbox'">
            <input
                :id="name"
                :name="name"
                type="checkbox"
                :checked="Boolean(modelValue)"
                class="h-4.5 w-4.5 accent-[#785A3E]"
                @change="emit('update:modelValue', $event.target.checked)"
            />
            <label :for="name" class="text-sm text-olive-900">{{ label }}</label>
        </template>

        <template v-else>
            <label :for="name" class="text-left text-sm text-olive-900">
                {{ label }}
            </label>

        <div class="relative">
            <template v-if="type === 'password'">
                <input
                    v-if="!isPasswordVisible"
                    :id="name"
                    :name="name"
                    type="password"
                    :placeholder="placeholder"
                    :autocomplete="autocomplete"
                    :value="modelValue"
                    class="bg-input stroke-input w-full rounded-md py-2 pl-3 pr-16 outline-none focus:ring-2 focus:ring-brown"
                    @input="updateValue"
                />
                <input
                    v-else
                    :id="name"
                    :name="name"
                    type="text"
                    :placeholder="placeholder"
                    :autocomplete="autocomplete"
                    :value="modelValue"
                    class="bg-input stroke-input w-full rounded-md py-2 pl-3 pr-16 outline-none focus:ring-2 focus:ring-brown"
                    @input="updateValue"
                />
            </template>

            <input
                v-else
                :id="name"
                :name="name"
                :type="type"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :value="modelValue"
                :class="type === 'checkbox'
                    ? 'h-4.5 w-4.5 accent-[#785A3E]'
                    : 'bg-input stroke-input w-full rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-brown'"
                @input="updateValue"
            />

            <button
                v-if="type === 'password'"
                type="button"
                class="absolute inset-y-0 right-3 text-sm text-brown"
                :aria-label="isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'"
                :aria-pressed="isPasswordVisible"
                @click="isPasswordVisible = !isPasswordVisible"
            >
                {{ isPasswordVisible ? 'Ocultar' : 'Mostrar' }}
            </button>
        </div>
        </template>
    </div>
</template>
