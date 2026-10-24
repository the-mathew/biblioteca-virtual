<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <div class="container-bdb py-12" style="min-height:50vh">
    <h1 class="text-h3 section-title mb-2">{{ title }}</h1>
    <p class="section-sub">{{ subtitle ?? 'Esta sección se construirá en la siguiente fase.' }}</p>
  </div>
</template>
