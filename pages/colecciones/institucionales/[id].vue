<script setup lang="ts">
const route = useRoute()
const auth = useAuthStore()
const mine = useCollectionsStore()
const { getById } = useInstitutionalCollections()

const collection = getById(Number(route.params.id))
if (!collection) {
  throw createError({ statusCode: 404, statusMessage: 'Colección no encontrada', fatal: true })
}

useHead({ title: `${collection.title} | BibloRed` })

// Guardar toda la colección como una colección propia (requiere sesión).
const snackbar = ref('')
const save = () => {
  if (!auth.isAuthenticated) {
    return navigateTo({ path: '/login', query: { redirect: route.fullPath } })
  }
  const existing = mine.collections.find((c) => c.name === collection.title)
  const target = existing ?? mine.create(collection.title)
  const before = target.resourceIds.length
  collection.resources.forEach((r) => mine.addResource(target.id, r.id))
  const added = target.resourceIds.length - before
  snackbar.value = added
    ? `Guardamos ${added} ${added === 1 ? 'contenido' : 'contenidos'} en tu colección “${collection.title}”.`
    : 'Esta colección ya estaba guardada en tus colecciones.'
}

// Compartir
const shareOpen = ref(false)
const shareTarget = ref({ title: '', url: '' })
const share = (title: string, path: string) => {
  shareTarget.value = { title, url: `${window.location.origin}${path}` }
  shareOpen.value = true
}
</script>

<template>
  <div>
    <section class="text-white" :style="{ background: `linear-gradient(120deg, ${collection.color}, #16223f)` }">
      <div class="container-bdb py-10">
        <v-breadcrumbs class="px-0 pt-0 text-white" :items="[
          { title: 'Inicio', to: '/' },
          { title: 'Colecciones institucionales', to: '/colecciones/institucionales' },
          { title: collection.title, disabled: true }
        ]" />
        <v-chip color="secondary" size="small" class="mb-3" prepend-icon="mdi-domain">{{ collection.institution }}</v-chip>
        <h1 class="text-h3 font-weight-bold mb-3" style="max-width:820px">{{ collection.title }}</h1>
        <p class="text-body-1 mb-6" style="max-width:720px">{{ collection.text }}</p>
        <div class="d-flex flex-wrap ga-3">
          <v-btn color="secondary" prepend-icon="mdi-bookmark-plus" @click="save">Guardar en mis colecciones</v-btn>
          <v-btn variant="outlined" color="white" prepend-icon="mdi-share-variant"
            @click="share(collection.title, `/colecciones/institucionales/${collection.id}`)">Compartir</v-btn>
        </div>
      </div>
    </section>

    <div class="container-bdb py-10">
      <h2 class="text-h5 section-title mb-1">Contenidos de la colección</h2>
      <p class="section-sub mb-4">{{ collection.resources.length }} contenidos</p>
      <v-row>
        <v-col v-for="r in collection.resources" :key="r.id" cols="12" sm="6" md="4">
          <ResourceCard :resource="r" @share="share(r.title, `/recursos/${r.id}`)" />
        </v-col>
      </v-row>
    </div>

    <ShareDialog v-model="shareOpen" :title="shareTarget.title" :url="shareTarget.url" />
    <v-snackbar :model-value="!!snackbar" timeout="5000" @update:model-value="snackbar = ''">
      {{ snackbar }}
      <template #actions><v-btn variant="text" to="/colecciones/usuario">Ver mis colecciones</v-btn></template>
    </v-snackbar>
  </div>
</template>
