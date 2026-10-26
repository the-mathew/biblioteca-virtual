<script setup lang="ts">
const search = useSearchStore()
const route = useRoute()
const go = useSearchNav()

// La URL manda: cada vez que cambia, se vuelca al store.
watch(() => route.query, (q) => search.setFromRoute(q), { immediate: true })

useHead({ title: computed(() => (search.query ? `“${search.query}” | Búsqueda` : 'Búsqueda') + ' | BibloRed') })

const text = ref(search.query)
watch(() => search.query, (v) => (text.value = v))

const filtersOpen = ref(false)

const submit = () =>
  go(() => {
    search.query = text.value
    search.page = 1
  })

const removeTopic = (t: string) =>
  go(() => {
    search.topics = search.topics.filter((x) => x !== t)
    search.page = 1
  })

const clearAll = () => go(() => search.reset())

const changePage = (p: number) => {
  go(() => (search.page = p))
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const hasActive = computed(() => !!search.query || search.topics.length > 0 || search.exclusiveOnly)

// Compartir
const shareOpen = ref(false)
const shareTarget = ref({ title: '', url: '' })
const openShare = (r: { id: number; title: string }) => {
  shareTarget.value = { title: r.title, url: `${window.location.origin}/recursos/${r.id}` }
  shareOpen.value = true
}
</script>

<template>
  <div class="container-bdb py-8">
    <h1 class="text-h4 section-title mb-4">Buscar en la biblioteca</h1>

    <v-form class="mb-4" @submit.prevent="submit">
      <v-text-field v-model="text" placeholder="Busca por título, autor o tema" variant="outlined" hide-details
        prepend-inner-icon="mdi-magnify" clearable aria-label="Buscar" @click:clear="text = ''">
        <template #append-inner>
          <v-btn type="submit" color="primary" size="small">Buscar</v-btn>
        </template>
      </v-text-field>
    </v-form>

    <v-row>
      <!-- Filtros en escritorio -->
      <v-col cols="12" md="3" class="d-none d-md-block">
        <v-card class="pa-4" elevation="1"><SearchFilters /></v-card>
      </v-col>

      <v-col cols="12" md="9">
        <div class="d-flex flex-wrap align-center ga-2 mb-4">
          <p class="text-body-1 mr-2" aria-live="polite">
            <strong>{{ search.results.length }}</strong>
            {{ search.results.length === 1 ? 'resultado' : 'resultados' }}
            <template v-if="search.query">para “{{ search.query }}”</template>
          </p>

          <v-chip v-for="t in search.topics" :key="t" closable size="small" @click:close="removeTopic(t)">{{ t }}</v-chip>
          <v-btn v-if="hasActive" variant="text" size="small" color="secondary" @click="clearAll">Quitar todo</v-btn>

          <v-spacer />
          <!-- Filtros en móvil -->
          <v-btn class="d-md-none" variant="outlined" color="primary" prepend-icon="mdi-filter-variant"
            @click="filtersOpen = true">Filtros</v-btn>
        </div>

        <v-row v-if="search.paged.length">
          <v-col v-for="r in search.paged" :key="r.id" cols="12" sm="6" lg="4">
            <ResourceCard :resource="r" @share="openShare" />
          </v-col>
        </v-row>

        <div v-else class="text-center py-12">
          <v-icon icon="mdi-book-search-outline" size="64" color="primary" class="mb-4" />
          <h2 class="text-h6 mb-2">No encontramos resultados</h2>
          <p class="section-sub mb-4">Revisa la ortografía, usa palabras más generales o quita algún filtro.</p>
          <v-btn color="primary" @click="clearAll">Limpiar búsqueda</v-btn>
        </div>

        <v-pagination v-if="search.totalPages > 1" :model-value="search.page" :length="search.totalPages"
          class="mt-6" @update:model-value="changePage" />
      </v-col>
    </v-row>

    <v-dialog v-model="filtersOpen" max-width="420" scrollable>
      <v-card>
        <v-card-text class="pt-6"><SearchFilters /></v-card-text>
        <v-card-actions><v-spacer /><v-btn color="primary" @click="filtersOpen = false">Ver resultados</v-btn></v-card-actions>
      </v-card>
    </v-dialog>

    <ShareDialog v-model="shareOpen" :title="shareTarget.title" :url="shareTarget.url" />
  </div>
</template>
