<script setup lang="ts">
useHead({ title: 'Exposiciones | BibloRed' })

const route = useRoute()
const router = useRouter()
const { all, categories } = useExpositions()

// La categoría vive en la URL (?categoria=Música) para poder compartirla.
const selected = computed(() => (typeof route.query.categoria === 'string' ? route.query.categoria : ''))
const filtered = computed(() => (selected.value ? all.filter((e) => e.category === selected.value) : all))

const select = (value: string | null | undefined) =>
  router.push({ path: '/exposiciones', query: value ? { categoria: value } : {} })
</script>

<template>
  <div class="container-bdb py-8" style="min-height:50vh">
    <h1 class="text-h4 section-title mb-1">Exposiciones</h1>
    <p class="section-sub mb-6">Recorre contenidos comentados y seleccionados por expertos y por la comunidad.</p>

    <v-chip-group :model-value="selected" mandatory selected-class="bg-primary" class="mb-6" aria-label="Filtrar por categoría"
      @update:model-value="select">
      <v-chip value="" variant="outlined">Todas</v-chip>
      <v-chip v-for="c in categories" :key="c" :value="c" variant="outlined">{{ c }}</v-chip>
    </v-chip-group>

    <v-row v-if="filtered.length">
      <v-col v-for="e in filtered" :key="e.slug" cols="12" sm="6" md="4">
        <ExpositionCard :exposition="e" />
      </v-col>
    </v-row>

    <div v-else class="text-center py-12">
      <v-icon icon="mdi-image-frame" size="64" color="primary" class="mb-4" />
      <h2 class="text-h6 mb-2">No hay exposiciones en esta categoría</h2>
      <v-btn color="primary" @click="select('')">Ver todas</v-btn>
    </div>
  </div>
</template>
