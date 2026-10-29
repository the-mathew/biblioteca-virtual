<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Mis aportes | BibloRed' })

const route = useRoute()
const store = useContributionsStore()
onMounted(() => store.hydrate())

const created = ref(route.query.creado === '1')
const toDelete = ref<string | null>(null)
const confirmOpen = computed({ get: () => !!toDelete.value, set: (v) => { if (!v) toDelete.value = null } })

const statusColor: Record<string, string> = { publicado: 'success', oculto: 'warning', retirado: 'error' }
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })

const confirmDelete = () => {
  if (toDelete.value) store.remove(toDelete.value)
  toDelete.value = null
}
</script>

<template>
  <div class="container-bdb py-8" style="min-height:50vh">
    <div class="d-flex flex-wrap align-center justify-space-between ga-3 mb-6">
      <h1 class="text-h4 section-title">Mis aportes</h1>
      <v-btn color="secondary" to="/subir" prepend-icon="mdi-upload">Subir contenido</v-btn>
    </div>

    <v-alert v-model="created" type="success" variant="tonal" closable class="mb-6"
      text="¡Tu contenido fue publicado! Gracias por compartirlo con la comunidad." />

    <div v-if="!store.items.length" class="text-center py-12">
      <v-icon icon="mdi-folder-open-outline" size="64" color="primary" class="mb-4" />
      <h2 class="text-h6 mb-2">Aún no has subido contenido</h2>
      <p class="section-sub mb-4">Comparte tu primera obra con la comunidad de la biblioteca.</p>
      <v-btn color="primary" to="/subir">Subir mi primera obra</v-btn>
    </div>

    <v-row v-else>
      <v-col v-for="c in store.items" :key="c.id" cols="12" md="6">
        <v-card elevation="2" class="h-100 d-flex flex-column">
          <v-card-item>
            <template #prepend><v-chip size="small" color="primary" variant="tonal">{{ c.type }}</v-chip></template>
            <template #append><v-chip size="small" :color="statusColor[c.status]">{{ c.status }}</v-chip></template>
          </v-card-item>
          <v-card-title class="text-wrap">{{ c.title }}</v-card-title>
          <v-card-subtitle>{{ c.author }} · {{ c.year }} · {{ c.language }}</v-card-subtitle>
          <v-card-text class="flex-grow-1">
            <p class="text-body-2 clamp-3 mb-3">{{ c.description }}</p>
            <v-chip v-for="t in c.topics" :key="t" size="x-small" class="mr-1 mb-1" variant="outlined">{{ t }}</v-chip>
            <div class="text-caption text-medium-emphasis mt-2">
              Licencia: {{ c.license }} · Subido el {{ fmtDate(c.createdAt) }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" color="error" prepend-icon="mdi-delete-outline" @click="toDelete = c.id">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="confirmOpen" max-width="420">
      <v-card>
        <v-card-title class="pt-4">¿Eliminar este aporte?</v-card-title>
        <v-card-text>Dejará de estar disponible en la biblioteca. Esta acción no se puede deshacer.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="toDelete = null">Cancelar</v-btn>
          <v-btn color="error" @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
