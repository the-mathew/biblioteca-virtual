<script setup lang="ts">
interface Collection {
  id: number
  title: string
  text: string
  color: string
  institution?: string
}

defineProps<{ collection: Collection }>()
</script>

<template>
  <v-card :to="`/colecciones/institucionales/${collection.id}`" class="d-flex flex-column h-100" elevation="2">
    <div :style="{ background: `linear-gradient(135deg, ${collection.color}, #16223f)`, height: '140px' }"
      class="d-flex align-end pa-3">
      <v-icon icon="mdi-bookshelf" size="36" color="white" />
    </div>
    <v-card-title class="text-wrap">{{ collection.title }}</v-card-title>
    <v-card-text class="flex-grow-1 clamp-3">{{ collection.text }}</v-card-text>
    <v-card-actions v-if="collection.institution" class="px-4 pb-4">
      <v-icon icon="mdi-domain" size="small" class="mr-1" />
      <span class="text-caption">{{ collection.institution }}</span>
    </v-card-actions>
  </v-card>
</template>
