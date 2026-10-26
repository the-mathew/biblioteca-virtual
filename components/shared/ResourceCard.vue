<script setup lang="ts">
interface Resource {
  id: number
  title: string
  author: string
  year: number
  exclusive: boolean
  text: string
  topics: string[]
  color: string
}

defineProps<{ resource: Resource }>()
defineEmits<{ share: [resource: Resource] }>()
</script>

<template>
  <v-card class="d-flex flex-column h-100" elevation="2">
    <NuxtLink :to="`/recursos/${resource.id}`" class="text-decoration-none">
      <div :style="{ background: resource.color, height: '180px' }"
        class="pa-4 d-flex flex-column justify-space-between text-white">
        <v-chip v-if="resource.exclusive" size="small" color="secondary" class="align-self-start">Exclusivo BibloRed</v-chip>
        <span v-else />
        <div class="text-h6 font-weight-bold">{{ resource.title }}</div>
      </div>
    </NuxtLink>

    <v-card-text class="flex-grow-1">
      <div class="text-body-2 mb-2"><strong>Por:</strong> {{ resource.author }} · <strong>Fecha:</strong> {{ resource.year }}</div>
      <p class="text-body-2 clamp-3 mb-3">{{ resource.text }}</p>
      <v-chip v-for="t in resource.topics" :key="t" size="x-small" class="mr-1 mb-1" variant="outlined">{{ t }}</v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn variant="text" color="primary" :to="`/recursos/${resource.id}`">Ver detalle</v-btn>
      <v-spacer />
      <v-btn icon="mdi-share-variant" variant="text" size="small" aria-label="Compartir" @click="$emit('share', resource)" />
    </v-card-actions>
  </v-card>
</template>
