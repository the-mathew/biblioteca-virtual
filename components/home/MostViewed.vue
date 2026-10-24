<script setup lang="ts">
import { mostViewed } from '~/data/home'

const shareOpen = ref(false)
const shareTarget = ref({ title: '', url: '' })

const openShare = (r: { id: number; title: string }) => {
  const origin = import.meta.client ? window.location.origin : ''
  shareTarget.value = { title: r.title, url: `${origin}/recursos/${r.id}` }
  shareOpen.value = true
}
</script>

<template>
  <section class="container-bdb py-12">
    <h2 class="text-h4 section-title mb-6">Lo más visto</h2>

    <v-slide-group show-arrows>
      <v-slide-group-item v-for="r in mostViewed" :key="r.id">
        <v-card width="300" class="mr-4 mb-2 d-flex flex-column" elevation="2">
          <NuxtLink :to="`/recursos/${r.id}`" class="text-decoration-none">
            <div :style="{ background: r.color, height: '200px' }" class="pa-4 d-flex flex-column justify-space-between text-white">
              <v-chip v-if="r.exclusive" size="small" color="secondary" class="align-self-start">Exclusivo BibloRed</v-chip>
              <span v-else />
              <div class="text-h6 font-weight-bold">{{ r.title }}</div>
            </div>
          </NuxtLink>
          <v-card-text class="flex-grow-1">
            <div class="text-body-2 mb-2"><strong>Por:</strong> {{ r.author }} · <strong>Fecha:</strong> {{ r.year }}</div>
            <p class="text-body-2 clamp-3 mb-3">{{ r.text }}</p>
            <v-chip v-for="t in r.topics" :key="t" size="x-small" class="mr-1 mb-1" variant="outlined">{{ t }}</v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary" :to="`/recursos/${r.id}`">Ver detalle</v-btn>
            <v-spacer />
            <v-btn icon="mdi-share-variant" variant="text" size="small" aria-label="Compartir" @click="openShare(r)" />
          </v-card-actions>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <ShareDialog v-model="shareOpen" :title="shareTarget.title" :url="shareTarget.url" />
  </section>
</template>
