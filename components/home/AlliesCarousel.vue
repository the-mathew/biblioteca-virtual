<script setup lang="ts">
import { allies } from '~/data/home'
</script>

<template>
  <section class="bg-surface-variant py-12">
    <div class="container-bdb">
      <h2 class="text-h4 section-title mb-6">Aliados</h2>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="a in allies" :key="a.id">
          <v-card :to="`/buscar?data_sources=${a.id}`" width="220" height="110" class="mr-4 d-flex align-center justify-center pa-3 text-center" elevation="1">
            <span class="text-subtitle-2 font-weight-bold text-primary">{{ a.name }}</span>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </section>
</template>
