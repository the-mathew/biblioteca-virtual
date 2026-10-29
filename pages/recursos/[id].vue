<script setup lang="ts">
const route = useRoute()
const auth = useAuthStore()
const collections = useCollectionsStore()
const reports = useReportsStore()
const { getById, related } = useResources()

const resource = getById(Number(route.params.id))
if (!resource) {
  throw createError({ statusCode: 404, statusMessage: 'Recurso no encontrado', fatal: true })
}
const similar = related(resource)

useHead({ title: `${resource.title} | BibloRed` })

const inCollections = computed(() => collections.collectionsWith(resource.id).length)

// Acciones que requieren sesión: si no la hay, se envía al login y se vuelve aquí.
const requireAuth = (action: () => void) =>
  auth.isAuthenticated ? action() : navigateTo({ path: '/login', query: { redirect: route.fullPath } })

const addOpen = ref(false)
const reportOpen = ref(false)
const shareOpen = ref(false)
const shareTarget = ref({ title: resource.title, url: '' })
const snackbar = ref(false)

const openShare = (r: { id: number; title: string }) => {
  shareTarget.value = { title: r.title, url: `${window.location.origin}/recursos/${r.id}` }
  shareOpen.value = true
}
</script>

<template>
  <div class="container-bdb py-8">
    <v-breadcrumbs class="px-0" :items="[
      { title: 'Inicio', to: '/' },
      { title: 'Búsqueda', to: '/buscar' },
      { title: resource.title, disabled: true }
    ]" />

    <v-row class="mt-2">
      <!-- Portada y acciones -->
      <v-col cols="12" md="4">
        <v-sheet :color="resource.color" rounded="lg" class="pa-6 d-flex flex-column justify-space-between text-white"
          style="aspect-ratio: 3 / 4" elevation="3">
          <v-chip v-if="resource.exclusive" size="small" color="secondary" class="align-self-start">Exclusivo BibloRed</v-chip>
          <span v-else />
          <div>
            <div class="text-h5 font-weight-bold mb-1">{{ resource.title }}</div>
            <div class="text-body-2">{{ resource.author }}</div>
          </div>
        </v-sheet>
      </v-col>

      <!-- Ficha -->
      <v-col cols="12" md="8">
        <h1 class="text-h4 section-title mb-1">{{ resource.title }}</h1>
        <p class="text-subtitle-1 mb-4">Por <strong>{{ resource.author }}</strong> · {{ resource.year }}</p>

        <div class="d-flex flex-wrap ga-2 mb-6">
          <v-btn color="primary" prepend-icon="mdi-book-open-variant" disabled>Leer en línea</v-btn>
          <v-btn color="secondary" prepend-icon="mdi-bookmark-plus" @click="requireAuth(() => (addOpen = true))">
            Añadir a colecciones<template v-if="inCollections"> ({{ inCollections }})</template>
          </v-btn>
          <v-btn variant="outlined" color="primary" prepend-icon="mdi-share-variant" @click="openShare(resource)">Compartir</v-btn>
        </div>
        <p class="text-caption text-medium-emphasis mb-6">La lectura estará disponible cuando se conecte el servidor de contenidos.</p>

        <h2 class="text-h6 section-title mb-2">Descripción</h2>
        <p class="text-body-1 mb-6">{{ resource.text }}</p>

        <h2 class="text-h6 section-title mb-2">Temas</h2>
        <div class="mb-6">
          <v-chip v-for="t in resource.topics" :key="t" :to="`/buscar?topics=${encodeURIComponent(t)}`" class="mr-2 mb-2" variant="outlined">{{ t }}</v-chip>
        </div>

        <h2 class="text-h6 section-title mb-2">Información</h2>
        <v-table density="comfortable" class="mb-6">
          <tbody>
            <tr><th scope="row" style="width:160px">Autor</th><td>{{ resource.author }}</td></tr>
            <tr><th scope="row">Año</th><td>{{ resource.year }}</td></tr>
            <tr><th scope="row">Licencia</th><td>{{ resource.license }}</td></tr>
            <tr><th scope="row">Fuente</th><td>{{ resource.source }}</td></tr>
          </tbody>
        </v-table>

        <v-btn v-if="!reports.hasReported(resource.id)" variant="text" color="error" size="small"
          prepend-icon="mdi-flag-outline" @click="requireAuth(() => (reportOpen = true))">Reportar este contenido</v-btn>
        <span v-else class="text-caption text-medium-emphasis"><v-icon icon="mdi-check" size="small" /> Ya reportaste este contenido</span>
      </v-col>
    </v-row>

    <!-- Relacionados -->
    <section v-if="similar.length" class="mt-12">
      <h2 class="text-h5 section-title mb-4">Más como este</h2>
      <v-row>
        <v-col v-for="r in similar" :key="r.id" cols="12" sm="6" md="4">
          <ResourceCard :resource="r" @share="openShare" />
        </v-col>
      </v-row>
    </section>

    <AddToCollectionDialog v-model="addOpen" :resource-id="resource.id" :title="resource.title" />
    <ReportDialog v-model="reportOpen" :resource-id="resource.id" :title="resource.title" @sent="snackbar = true" />
    <ShareDialog v-model="shareOpen" :title="shareTarget.title" :url="shareTarget.url" />
    <v-snackbar v-model="snackbar" timeout="4000">Gracias, recibimos tu reporte.</v-snackbar>
  </div>
</template>
