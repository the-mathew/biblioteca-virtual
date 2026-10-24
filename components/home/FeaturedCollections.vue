<script setup lang="ts">
import { collections } from '~/data/home'
</script>

<template>
  <section id="colecciones" class="container-bdb py-12">
    <h2 class="text-h4 section-title">Colecciones recomendadas del mes</h2>
    <p class="section-sub mb-6">Conoce distintas colecciones de la Biblioteca Digital de Bogotá</p>
    <v-row>
      <v-col v-for="c in collections" :key="c.id" cols="12" sm="6" md="3">
        <v-card :to="`/colecciones/institucionales?id=${c.id}`" height="100%" elevation="2">
          <div :style="{ background: c.color, height: '140px' }" class="d-flex align-end pa-3">
            <v-icon icon="mdi-bookshelf" size="36" color="white" />
          </div>
          <v-card-title class="text-wrap">{{ c.title }}</v-card-title>
          <v-card-text>{{ c.text }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
