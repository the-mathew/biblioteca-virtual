<script setup lang="ts">
const search = useSearchStore()
const go = useSearchNav()

const hasFilters = computed(() => search.topics.length > 0 || search.exclusiveOnly)

const clearFilters = () =>
  go(() => {
    search.topics = []
    search.exclusiveOnly = false
    search.page = 1
  })

const setTopics = (value: string[] | null) =>
  go(() => {
    search.topics = value ?? []
    search.page = 1
  })

const setExclusive = (value: boolean | null) =>
  go(() => {
    search.exclusiveOnly = !!value
    search.page = 1
  })
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-2">
      <h2 class="text-subtitle-1 font-weight-bold">Filtros</h2>
      <v-btn v-if="hasFilters" variant="text" size="small" color="secondary" @click="clearFilters">Limpiar filtros</v-btn>
    </div>

    <v-switch :model-value="search.exclusiveOnly" label="Solo exclusivos BibloRed" color="secondary"
      density="compact" hide-details inset @update:model-value="setExclusive" />

    <v-divider class="my-4" />

    <h3 class="text-subtitle-2 font-weight-bold mb-1">Temas</h3>
    <v-checkbox v-for="t in search.availableTopics" :key="t" :model-value="search.topics" :value="t" :label="t"
      density="compact" hide-details multiple color="primary" @update:model-value="setTopics" />
  </div>
</template>
