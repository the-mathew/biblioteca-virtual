<script setup lang="ts">
import { heroSlides } from '~/data/home'
const model = ref(0)
</script>

<template>
  <section aria-label="Destacados">
    <v-carousel v-model="model" height="520" cycle interval="7000" :show-arrows="'hover'" hide-delimiter-background
      delimiter-icon="mdi-circle-small">
      <v-carousel-item v-for="s in heroSlides" :key="s.title">
        <div class="h-100 d-flex align-center" :style="{ background: s.bg }">
          <div class="container-bdb w-100 text-white">
            <div style="max-width:640px">
              <div class="text-overline mb-2">{{ s.kicker }}</div>
              <h2 class="text-h3 text-md-h2 font-weight-bold mb-4">{{ s.title }}</h2>
              <p class="text-body-1 mb-6 clamp-3">{{ s.text }}</p>
              <v-btn color="secondary" size="large" :to="s.to" append-icon="mdi-arrow-right">{{ s.cta }}</v-btn>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
    <div class="text-center py-3 bg-surface-variant">
      <v-btn variant="text" color="primary" href="#colecciones" append-icon="mdi-chevron-down">Explora la BDB</v-btn>
    </div>
  </section>
</template>
