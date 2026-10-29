<script setup lang="ts">
const route = useRoute()
const { getBySlug, others } = useExpositions()

const exposition = getBySlug(String(route.params.slug))
if (!exposition) {
  throw createError({ statusCode: 404, statusMessage: 'Exposición no encontrada', fatal: true })
}
const more = others(exposition.slug)

useHead({ title: `${exposition.title} | BibloRed` })

// Compartir (la exposición o uno de sus contenidos)
const shareOpen = ref(false)
const shareTarget = ref({ title: '', url: '' })
const share = (title: string, path: string) => {
  shareTarget.value = { title, url: `${window.location.origin}${path}` }
  shareOpen.value = true
}
</script>

<template>
  <div>
    <!-- Encabezado -->
    <section class="text-white" :style="{ background: `linear-gradient(120deg, ${exposition.color}, #16223f)` }">
      <div class="container-bdb py-10">
        <v-breadcrumbs class="px-0 pt-0 text-white" :items="[
          { title: 'Inicio', to: '/' },
          { title: 'Exposiciones', to: '/exposiciones' },
          { title: exposition.title, disabled: true }
        ]" />
        <v-chip color="secondary" size="small" class="mb-3">{{ exposition.category }}</v-chip>
        <h1 class="text-h3 font-weight-bold mb-4" style="max-width:820px">{{ exposition.title }}</h1>
        <div class="d-flex flex-wrap align-center ga-4">
          <div class="d-flex align-center">
            <v-avatar color="white" size="36" class="mr-2"><v-icon icon="mdi-account" color="primary" /></v-avatar>
            <div class="text-body-2"><strong>Creador</strong><br>{{ exposition.creator }}</div>
          </div>
          <v-btn variant="outlined" color="white" prepend-icon="mdi-share-variant"
            @click="share(exposition.title, `/exposiciones/${exposition.slug}`)">Compartir</v-btn>
        </div>
      </div>
    </section>

    <div class="container-bdb py-10">
      <!-- Presentación -->
      <section style="max-width:820px" class="mb-12">
        <h2 class="text-h5 section-title mb-3">Sobre esta exposición</h2>
        <p class="text-body-1">{{ exposition.text }}</p>
      </section>

      <!-- Contenidos -->
      <section class="mb-12">
        <h2 class="text-h5 section-title mb-1">Contenidos de la exposición</h2>
        <p class="section-sub mb-4">Obras y recursos seleccionados para este recorrido.</p>
        <v-row>
          <v-col v-for="r in exposition.resources" :key="r.id" cols="12" sm="6" md="4">
            <ResourceCard :resource="r" @share="share(r.title, `/recursos/${r.id}`)" />
          </v-col>
        </v-row>
      </section>

      <!-- Otras exposiciones -->
      <section v-if="more.length">
        <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-4">
          <h2 class="text-h5 section-title">Otras exposiciones</h2>
          <v-btn color="primary" to="/exposiciones">Ver todas</v-btn>
        </div>
        <v-row>
          <v-col v-for="e in more" :key="e.slug" cols="12" sm="6" md="4">
            <ExpositionCard :exposition="e" />
          </v-col>
        </v-row>
      </section>
    </div>

    <ShareDialog v-model="shareOpen" :title="shareTarget.title" :url="shareTarget.url" />
  </div>
</template>
