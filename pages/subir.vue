<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Subir contenido | BibloRed' })

const auth = useAuthStore()
const store = useContributionsStore()
const search = useSearchStore()
onMounted(() => store.hydrate())

const MAX_FILE_MB = 100
const MAX_COVER_MB = 5
const ALLOWED_EXT = ['pdf', 'epub', 'mp3', 'm4a', 'mp4']
const thisYear = new Date().getFullYear()

const types = [
  { title: 'Libro', color: '#2f5d8a' },
  { title: 'Revista', color: '#6b3f8a' },
  { title: 'Audiolibro', color: '#2f6b4f' },
  { title: 'Música', color: '#a3352a' },
  { title: 'Video', color: '#1d1d1d' },
  { title: 'Documento', color: '#8a6d2f' }
]
const languages = ['Español', 'Inglés', 'Portugués', 'Francés', 'Lengua indígena', 'Otro']
const licenses = [
  { title: 'Creative Commons BY (atribución)', value: 'CC BY 4.0' },
  { title: 'Creative Commons BY-SA (atribución, compartir igual)', value: 'CC BY-SA 4.0' },
  { title: 'Creative Commons BY-NC (sin uso comercial)', value: 'CC BY-NC 4.0' },
  { title: 'Creative Commons BY-NC-SA', value: 'CC BY-NC-SA 4.0' },
  { title: 'Creative Commons BY-ND (sin obras derivadas)', value: 'CC BY-ND 4.0' },
  { title: 'Dominio público (CC0)', value: 'CC0 1.0' },
  { title: 'Todos los derechos reservados', value: 'Todos los derechos reservados' }
]

const form = reactive({
  type: '',
  title: '',
  author: auth.user?.name ?? '',
  year: thisYear,
  language: 'Español',
  description: '',
  topics: [] as string[],
  license: '',
  file: null as File | File[] | null,
  cover: null as File | File[] | null,
  ownsRights: false,
  acceptTerms: false
})

// Según la versión de Vuetify, v-file-input entrega un File o un arreglo.
const one = (v: File | File[] | null | undefined) => (Array.isArray(v) ? v[0] : v) ?? null
const ext = (f: File | null) => f?.name.split('.').pop()?.toLowerCase() ?? ''

const rules = {
  required: (v: unknown) => (typeof v === 'string' ? !!v.trim() : !!v) || 'Este campo es obligatorio',
  file: [
    (v: File | File[] | null) => !!one(v) || 'Selecciona el archivo a subir',
    (v: File | File[] | null) => !one(v) || ALLOWED_EXT.includes(ext(one(v))) || `Formatos permitidos: ${ALLOWED_EXT.join(', ').toUpperCase()}`,
    (v: File | File[] | null) => !one(v) || one(v)!.size <= MAX_FILE_MB * 1024 * 1024 || `El archivo supera los ${MAX_FILE_MB} MB`
  ],
  cover: [
    (v: File | File[] | null) => !one(v) || one(v)!.type.startsWith('image/') || 'La portada debe ser una imagen',
    (v: File | File[] | null) => !one(v) || one(v)!.size <= MAX_COVER_MB * 1024 * 1024 || `La portada supera los ${MAX_COVER_MB} MB`
  ],
  year: (v: number) => (Number.isInteger(+v) && +v >= 1000 && +v <= thisYear) || `Escribe un año entre 1000 y ${thisYear}`,
  description: (v: string) => v.trim().length >= 30 || 'Escribe al menos 30 caracteres',
  topics: (v: string[]) => (v.length >= 1 && v.length <= 5) || 'Elige entre 1 y 5 temas',
  confirm: (v: boolean) => !!v || 'Debes confirmarlo para continuar'
}

// Vista previa de la portada
const coverUrl = ref<string | null>(null)
watch(() => form.cover, (v) => {
  if (coverUrl.value) URL.revokeObjectURL(coverUrl.value)
  const f = one(v)
  coverUrl.value = f && f.type.startsWith('image/') ? URL.createObjectURL(f) : null
})
onBeforeUnmount(() => coverUrl.value && URL.revokeObjectURL(coverUrl.value))

const previewColor = computed(() => types.find((t) => t.title === form.type)?.color ?? '#16223f')
const formatSize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`)

const formRef = ref()
const submitting = ref(false)
const submit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  const file = one(form.file)!
  submitting.value = true
  await store.submit({
    type: form.type, title: form.title.trim(), author: form.author.trim(), year: +form.year,
    language: form.language, description: form.description.trim(), topics: form.topics,
    license: form.license, fileName: file.name, fileSize: file.size
  })
  submitting.value = false
  await navigateTo('/mis-aportes?creado=1')
}
</script>

<template>
  <div class="container-bdb py-8">
    <h1 class="text-h4 section-title mb-1">Subir contenido</h1>
    <p class="section-sub mb-4">Comparte una obra tuya con la comunidad de la biblioteca.</p>

    <v-alert type="info" variant="tonal" class="mb-6" icon="mdi-information-outline">
      Durante la beta, tu contenido se publica de inmediato. Otros usuarios podrán reportarlo si no cumple las normas
      o infringe derechos de autor, y puede ocultarse o retirarse.
    </v-alert>

    <v-row>
      <v-col cols="12" md="8">
        <v-form ref="formRef" @submit.prevent="submit">
          <!-- 1. Archivo -->
          <v-card class="pa-6 mb-6" elevation="1">
            <h2 class="text-h6 section-title mb-4">1. Archivo y portada</h2>
            <v-file-input v-model="form.file" label="Archivo de la obra" :accept="ALLOWED_EXT.map((e) => '.' + e).join(',')"
              prepend-icon="" prepend-inner-icon="mdi-paperclip" variant="outlined" :rules="rules.file"
              :hint="`PDF, EPUB, MP3, M4A o MP4. Máximo ${MAX_FILE_MB} MB.`" persistent-hint show-size />
            <v-file-input v-model="form.cover" label="Portada (opcional)" accept="image/*" prepend-icon=""
              prepend-inner-icon="mdi-image-outline" variant="outlined" class="mt-4" :rules="rules.cover"
              :hint="`JPG, PNG o WebP. Máximo ${MAX_COVER_MB} MB.`" persistent-hint />
          </v-card>

          <!-- 2. Información -->
          <v-card class="pa-6 mb-6" elevation="1">
            <h2 class="text-h6 section-title mb-4">2. Información de la obra</h2>
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-select v-model="form.type" :items="types" item-title="title" item-value="title" label="Tipo de contenido"
                  variant="outlined" :rules="[rules.required]" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="form.language" :items="languages" label="Idioma" variant="outlined" />
              </v-col>
            </v-row>
            <v-text-field v-model="form.title" label="Título" variant="outlined" maxlength="150" counter :rules="[rules.required]" />
            <v-row dense>
              <v-col cols="12" sm="8">
                <v-text-field v-model="form.author" label="Autor o autora" variant="outlined" :rules="[rules.required]" />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model.number="form.year" label="Año" type="number" variant="outlined" :rules="[rules.year]" />
              </v-col>
            </v-row>
            <v-textarea v-model="form.description" label="Descripción" rows="4" variant="outlined" maxlength="1000" counter
              :rules="[rules.description]" />
            <v-combobox v-model="form.topics" :items="search.availableTopics" label="Temas" multiple chips closable-chips
              variant="outlined" :rules="[rules.topics]" hint="Elige de la lista o escribe uno nuevo y presiona Enter (máximo 5)."
              persistent-hint />
          </v-card>

          <!-- 3. Licencia y autoría -->
          <v-card class="pa-6 mb-6" elevation="1">
            <h2 class="text-h6 section-title mb-4">3. Licencia y autoría</h2>
            <v-select v-model="form.license" :items="licenses" label="Licencia" variant="outlined" :rules="[rules.required]"
              hint="Define qué pueden hacer otras personas con tu obra." persistent-hint />
            <v-checkbox v-model="form.ownsRights" :rules="[rules.confirm]" class="mt-4"
              label="Declaro que soy el autor de esta obra o que tengo los derechos para compartirla." />
            <v-checkbox v-model="form.acceptTerms" :rules="[rules.confirm]"
              label="Acepto los términos y condiciones y entiendo que otros usuarios podrán reportar mi contenido." />
          </v-card>

          <div class="d-flex flex-wrap ga-3">
            <v-btn type="submit" color="primary" size="large" :loading="submitting" prepend-icon="mdi-upload">Publicar contenido</v-btn>
            <v-btn variant="outlined" color="primary" size="large" to="/mis-aportes">Cancelar</v-btn>
          </div>
        </v-form>
      </v-col>

      <!-- Vista previa -->
      <v-col cols="12" md="4" class="d-none d-md-block">
        <div style="position: sticky; top: 96px">
          <p class="text-subtitle-2 mb-2">Vista previa</p>
          <v-card elevation="2">
            <div class="pa-4 d-flex flex-column justify-space-between text-white"
              :style="{ height: '220px', background: coverUrl ? `center / cover url(${coverUrl})` : previewColor }">
              <v-chip v-if="form.type" size="small" color="secondary" class="align-self-start">{{ form.type }}</v-chip>
              <span v-else />
              <div v-if="!coverUrl" class="text-h6 font-weight-bold">{{ form.title || 'Título de tu obra' }}</div>
            </div>
            <v-card-text>
              <div v-if="coverUrl" class="text-subtitle-1 font-weight-bold mb-1">{{ form.title || 'Título de tu obra' }}</div>
              <div class="text-body-2 mb-2"><strong>Por:</strong> {{ form.author || '—' }} · {{ form.year || '—' }}</div>
              <p class="text-body-2 clamp-3 mb-2">{{ form.description || 'Aquí verás la descripción de tu obra.' }}</p>
              <v-chip v-for="t in form.topics" :key="t" size="x-small" class="mr-1 mb-1" variant="outlined">{{ t }}</v-chip>
              <div v-if="one(form.file)" class="text-caption text-medium-emphasis mt-2">
                <v-icon icon="mdi-paperclip" size="small" /> {{ one(form.file)!.name }} · {{ formatSize(one(form.file)!.size) }}
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
