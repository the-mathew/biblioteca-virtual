<script setup lang="ts">
interface Exposition {
  slug: string
  category: string
  title: string
  text: string
  creator: string
  color: string
}

defineProps<{ exposition: Exposition }>()
</script>

<template>
  <v-card :to="`/exposiciones/${exposition.slug}`" class="d-flex flex-column h-100" elevation="2">
    <div :style="{ background: `linear-gradient(135deg, ${exposition.color}, #16223f)`, height: '180px' }"
      class="d-flex align-end pa-3">
      <v-chip color="secondary" size="small">{{ exposition.category }}</v-chip>
    </div>
    <v-card-title class="text-wrap">{{ exposition.title }}</v-card-title>
    <v-card-text class="flex-grow-1 clamp-3">{{ exposition.text }}</v-card-text>
    <v-card-actions class="px-4 pb-4">
      <v-avatar color="primary" size="32" class="mr-2"><v-icon icon="mdi-account" size="18" /></v-avatar>
      <div class="text-caption"><strong>Creador</strong><br>{{ exposition.creator }}</div>
    </v-card-actions>
  </v-card>
</template>
