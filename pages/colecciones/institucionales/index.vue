<script setup lang="ts">
useHead({ title: 'Colecciones institucionales | BibloRed' })

const route = useRoute()
const router = useRouter()
const { all } = useInstitutionalCollections()

// El texto buscado vive en la URL (?q=...) para poder compartirlo.
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const text = ref(q.value)
watch(q, (v) => (text.value = v))

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return term ? all.filter((c) => `${c.title} ${c.text} ${c.institution}`.toLowerCase().includes(term)) : all
})

const apply = () => router.push({ path: '/colecciones/institucionales', query: text.value.trim() ? { q: text.value.trim() } : {} })
const clear = () => { text.value = ''; apply() }
</script>

<template>
  <div class="container-bdb py-8" style="min-height:50vh">
    <h1 class="text-h4 section-title mb-1">Colecciones institucionales</h1>
    <p class="section-sub mb-6">Selecciones de contenidos armadas por bibliotecas y entidades aliadas.</p>

    <v-form class="mb-6" style="max-width:520px" @submit.prevent="apply">
      <v-text-field v-model="text" placeholder="Buscar colecciones" variant="outlined" density="comfortable" hide-details
        prepend-inner-icon="mdi-magnify" clearable aria-label="Buscar colecciones" @click:clear="clear" />
    </v-form>

    <p class="text-body-2 mb-4" aria-live="polite">
      <strong>{{ filtered.length }}</strong> {{ filtered.length === 1 ? 'colección' : 'colecciones' }}
      <template v-if="q">para “{{ q }}”</template>
    </p>

    <v-row v-if="filtered.length">
      <v-col v-for="c in filtered" :key="c.id" cols="12" sm="6" md="4" lg="3">
        <CollectionCard :collection="c" />
      </v-col>
    </v-row>

    <div v-else class="text-center py-12">
      <v-icon icon="mdi-bookshelf" size="64" color="primary" class="mb-4" />
      <h2 class="text-h6 mb-2">No encontramos colecciones</h2>
      <p class="section-sub mb-4">Prueba con otras palabras.</p>
      <v-btn color="primary" @click="clear">Ver todas</v-btn>
    </div>
  </div>
</template>
