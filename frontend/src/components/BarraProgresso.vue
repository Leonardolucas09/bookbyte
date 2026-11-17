<script setup>
import { computed } from 'vue'

const props = defineProps({
  paginasLidas: { type: Number, required: true },
  totalPaginas: { type: Number, required: true },
})

const porcentagem = computed(() => {
  if (props.totalPaginas <= 0) return 0
  return Math.min(100, Math.max(0, Math.round((props.paginasLidas / props.totalPaginas) * 100)))
})
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <div
      class="h-1.5 w-full overflow-hidden rounded-full bg-line"
      role="progressbar"
      :aria-valuenow="porcentagem"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`Progresso da leitura: ${porcentagem}%`"
    >
      <div
        class="h-full rounded-full bg-brown transition-all"
        :style="{ width: `${porcentagem}%` }"
      />
    </div>

    <p class="text-base text-light-brown">
      {{ paginasLidas }} de {{ totalPaginas }} páginas
    </p>
  </div>
</template>
