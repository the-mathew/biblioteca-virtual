<script setup lang="ts">
import { expositions } from '~/data/home'
</script>

<template>
  <section class="bg-surface-variant py-12">
    <div class="container-bdb">
      <div class="d-flex flex-wrap align-end justify-space-between mb-6 ga-2">
        <div>
          <h2 class="text-h4 section-title">Exposiciones</h2>
          <p class="section-sub">Visita contenidos comentados y seleccionados por expertos</p>
        </div>
        <v-btn color="primary" to="/exposiciones">Ver más exposiciones</v-btn>
      </div>

      <v-slide-group show-arrows>
        <v-slide-group-item v-for="e in expositions" :key="e.slug">
          <v-card :to="`/exposiciones/${e.slug}`" width="360" class="mr-4 mb-2" elevation="2">
            <div :style="{ background: e.color, height: '180px' }" class="d-flex align-end pa-3">
              <v-chip color="secondary" size="small">{{ e.category }}</v-chip>
            </div>
            <v-card-title class="text-wrap">{{ e.title }}</v-card-title>
            <v-card-text class="clamp-3">{{ e.text }}</v-card-text>
            <v-card-actions class="px-4 pb-4">
              <v-avatar color="primary" size="32" class="mr-2"><v-icon icon="mdi-account" size="18" /></v-avatar>
              <div class="text-caption"><strong>Creador</strong><br>{{ e.creator }}</div>
            </v-card-actions>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </section>
</template>
