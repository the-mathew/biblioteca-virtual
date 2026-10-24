<script setup lang="ts">
import { footerColumns } from '~/data/home'
const socials = [
  ['mdi-facebook', 'https://www.facebook.com/BibloRedBogota', 'Facebook'],
  ['mdi-instagram', 'https://www.instagram.com/bibloredbogota/', 'Instagram'],
  ['mdi-twitter', 'https://twitter.com/BibloRedBogota', 'Twitter'],
  ['mdi-youtube', 'https://www.youtube.com/user/BibloRedBog', 'YouTube']
]
</script>

<template>
  <v-footer color="primary" class="pa-0 d-block">
    <div class="container-bdb py-10">
      <v-row>
        <v-col v-for="col in footerColumns" :key="col.title" cols="12" sm="6" md="3">
          <h3 class="text-subtitle-1 font-weight-bold mb-3">{{ col.title }}</h3>
          <ul class="pa-0" style="list-style:none">
            <li v-for="[label, href] in col.links" :key="label" class="mb-2">
              <NuxtLink v-if="href.startsWith('/')" :to="href" class="text-white text-body-2">{{ label }}</NuxtLink>
              <a v-else :href="href" target="_blank" rel="noopener" class="text-white text-body-2">{{ label }}</a>
            </li>
          </ul>
        </v-col>
      </v-row>

      <v-divider class="my-6" color="white" opacity=".3" />

      <v-row align="center">
        <v-col cols="12" md="6">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Contáctanos</h3>
          <p class="text-body-2">Nivel Central · Biblioteca Pública Virgilio Barco</p>
          <p class="text-body-2">Av. Carrera 60 No. 57 - 60 Piso 2 · Tel. (1) 580 3050 · Bogotá, Colombia</p>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-wrap align-center justify-md-end ga-2">
          <span class="text-subtitle-2 mr-2">Síguenos</span>
          <v-btn v-for="[icon, href, label] in socials" :key="label" :icon="icon" :href="href" target="_blank"
            variant="outlined" color="white" size="small" :aria-label="label" />
        </v-col>
      </v-row>

      <div class="d-flex flex-wrap align-center ga-6 mt-6">
        <a href="https://www.biblored.gov.co/" target="_blank" class="text-white font-weight-bold">BibloRed</a>
        <a href="https://www.bogota.gov.co/" target="_blank" class="text-white font-weight-bold">Alcaldía Mayor de Bogotá</a>
      </div>
    </div>
  </v-footer>
</template>
