<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const drawer = ref(false)
const query = ref('')
const router = useRouter()

const search = () => {
  router.push({ path: '/buscar', query: query.value ? { q: query.value } : {} })
  drawer.value = false
}
</script>

<template>
  <v-app-bar color="primary" flat height="72">
    <div class="container-bdb d-flex align-center w-100 ga-4">
      <v-app-bar-nav-icon v-if="!mdAndUp" aria-label="Abrir menú" @click="drawer = !drawer" />

      <NuxtLink to="/" class="text-white text-decoration-none d-flex align-center ga-2" aria-label="Biblioteca digital de Bogotá">
        <v-icon icon="mdi-book-open-page-variant" size="32" color="secondary" />
        <div class="d-none d-sm-block" style="line-height:1.1">
          <div class="text-subtitle-1 font-weight-bold">Hookod</div>
          <div class="text-caption">Biblioteca digital</div>
        </div>
      </NuxtLink>

      <v-spacer v-if="!mdAndUp" />

      <template v-if="mdAndUp">
        <nav class="d-flex align-center ga-1 ml-4" aria-label="Principal">
          <v-btn variant="text" to="/">Inicio</v-btn>
          <v-menu open-on-hover>
            <template #activator="{ props }">
              <v-btn variant="text" v-bind="props" append-icon="mdi-chevron-down">Colecciones</v-btn>
            </template>
            <v-list>
              <v-list-item to="/colecciones/institucionales" title="Colecciones institucionales" />
              <v-list-item to="/colecciones/usuario" title="Colecciones de usuario" />
            </v-list>
          </v-menu>
          <v-btn variant="text" to="/exposiciones">Exposiciones</v-btn>
          <v-btn variant="text" to="/centro-de-ayuda">Centro de ayuda</v-btn>
        </nav>

        <v-spacer />

        <form class="flex-grow-1" style="max-width:340px" @submit.prevent="search">
          <v-text-field v-model="query" placeholder="Buscar en la biblioteca" density="compact" variant="solo"
            hide-details rounded="pill" prepend-inner-icon="mdi-magnify" aria-label="Buscar" />
        </form>

        <UserMenu />
      </template>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <div class="pa-4">
      <form @submit.prevent="search">
        <v-text-field v-model="query" placeholder="Buscar" density="compact" variant="outlined"
          hide-details prepend-inner-icon="mdi-magnify" />
      </form>
    </div>
    <v-list nav>
      <v-list-item to="/" title="Inicio" prepend-icon="mdi-home-outline" @click="drawer = false" />
      <v-list-group value="colecciones">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Colecciones" prepend-icon="mdi-bookshelf" />
        </template>
        <v-list-item to="/colecciones/institucionales" title="Institucionales" @click="drawer = false" />
        <v-list-item to="/colecciones/usuario" title="De usuario" @click="drawer = false" />
      </v-list-group>
      <v-list-item to="/exposiciones" title="Exposiciones" prepend-icon="mdi-image-frame" @click="drawer = false" />
      <v-list-item to="/centro-de-ayuda" title="Centro de ayuda" prepend-icon="mdi-help-circle-outline" @click="drawer = false" />
    </v-list>
    <div class="pa-4 d-flex flex-column ga-2">
      <UserMenu block />
    </div>
  </v-navigation-drawer>
</template>
