<script setup>
import { computed } from 'vue'

const props = defineProps({
  paginasLidas: { type: Number, required: true },
  totalPaginas: { type: Number, required: true },
})

const porcentagem = computed(() =>
  Math.round((props.paginasLidas / props.totalPaginas) * 100)
)
</script>

<template>
  <div>
    <div class="w-full bg-zinc-700 rounded-full h-1.5 mb-1">
      <div
        class="bg-[#27efb2] h-1.5 rounded-full transition-all"
        :style="{ width: porcentagem + '%' }"
      />
    </div>
    <p class="text-zinc-400 text-xs">
      {{ porcentagem }}% · {{ props.paginasLidas }}/{{ props.totalPaginas }} páginas
    </p>
  </div>
</template>
