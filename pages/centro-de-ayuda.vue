<script setup lang="ts">
import { helpCategories } from '~/data/help'

useHead({ title: 'Centro de ayuda | BibloRed' })

const route = useRoute()
const router = useRouter()

// Búsqueda y tema viven en la URL (?q=...&tema=...) para poder compartirlos.
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const tema = computed(() => (typeof route.query.tema === 'string' ? route.query.tema : ''))
const text = ref(q.value)
watch(q, (v) => (text.value = v))

const go = (query: { q?: string; tema?: string }) => {
  const clean = Object.fromEntries(Object.entries(query).filter(([, v]) => !!v))
  router.push({ path: '/centro-de-ayuda', query: clean })
}
const search = () => go({ q: text.value.trim(), tema: tema.value })
const toggleTema = (id: string) => go({ q: q.value, tema: tema.value === id ? '' : id })
const clearAll = () => { text.value = ''; go({}) }

const results = computed(() => {
  const term = q.value.trim().toLowerCase()
  return helpCategories
    .filter((c) => !tema.value || c.id === tema.value)
    .map((c) => ({ ...c, faqs: c.faqs.filter((f) => !term || `${f.q} ${f.a}`.toLowerCase().includes(term)) }))
    .filter((c) => c.faqs.length)
})
const total = computed(() => results.value.reduce((n, c) => n + c.faqs.length, 0))

const contactOpen = ref(false)
const sent = ref(false)
</script>

<template>
  <div>
    <section class="bg-primary py-10">
      <div class="container-bdb">
        <h1 class="text-h3 font-weight-bold mb-2">Centro de ayuda</h1>
        <p class="mb-6">Encuentra respuestas sobre tu cuenta, tus colecciones y cómo compartir contenido.</p>
        <v-form style="max-width:640px" @submit.prevent="search">
          <v-text-field v-model="text" placeholder="¿En qué podemos ayudarte?" variant="solo" rounded="pill" hide-details
            prepend-inner-icon="mdi-magnify" clearable aria-label="Buscar en la ayuda" @click:clear="clearAll" />
        </v-form>
      </div>
    </section>

    <div class="container-bdb py-10">
      <!-- Temas -->
      <v-row class="mb-8">
        <v-col v-for="c in helpCategories" :key="c.id" cols="6" sm="4" md="2" class="flex-grow-1">
          <v-card :variant="tema === c.id ? 'flat' : 'outlined'" :color="tema === c.id ? 'primary' : undefined"
            class="pa-4 text-center h-100" role="button" :aria-pressed="tema === c.id" @click="toggleTema(c.id)">
            <v-icon :icon="c.icon" size="32" class="mb-2" />
            <div class="text-body-2 font-weight-bold">{{ c.title }}</div>
          </v-card>
        </v-col>
      </v-row>

      <p v-if="q || tema" class="text-body-2 mb-4" aria-live="polite">
        <strong>{{ total }}</strong> {{ total === 1 ? 'respuesta' : 'respuestas' }}
        <template v-if="q">para “{{ q }}”</template>
        <v-btn variant="text" size="small" color="secondary" class="ml-2" @click="clearAll">Quitar filtros</v-btn>
      </p>

      <!-- Preguntas -->
      <section v-for="c in results" :key="c.id" class="mb-8" style="max-width:860px">
        <h2 class="text-h6 section-title mb-3 d-flex align-center ga-2"><v-icon :icon="c.icon" /> {{ c.title }}</h2>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="f in c.faqs" :key="f.id" :title="f.q" :text="f.a" />
        </v-expansion-panels>
      </section>

      <div v-if="!results.length" class="text-center py-10">
        <v-icon icon="mdi-help-circle-outline" size="64" color="primary" class="mb-4" />
        <h2 class="text-h6 mb-2">No encontramos respuestas</h2>
        <p class="section-sub mb-4">Prueba con otras palabras o escríbenos.</p>
        <v-btn color="primary" @click="clearAll">Ver todas las preguntas</v-btn>
      </div>

      <!-- Contacto -->
      <v-card class="pa-6 mt-4" variant="tonal" color="primary" style="max-width:860px">
        <h2 class="text-h6 mb-1">¿No encontraste lo que buscabas?</h2>
        <p class="mb-4">Cuéntanos tu duda y te responderemos por correo.</p>
        <v-btn color="primary" prepend-icon="mdi-email-outline" @click="contactOpen = true">Contáctanos</v-btn>
      </v-card>
    </div>

    <ContactDialog v-model="contactOpen" @sent="sent = true" />
    <v-snackbar v-model="sent" timeout="4000">Gracias, recibimos tu mensaje.</v-snackbar>
  </div>
</template>
