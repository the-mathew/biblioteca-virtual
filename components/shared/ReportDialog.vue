<script setup lang="ts">
const props = defineProps<{ resourceId: number; title: string }>()
const emit = defineEmits<{ sent: [] }>()
const open = defineModel<boolean>({ default: false })

const store = useReportsStore()
const loading = ref(false)
const reason = ref('')
const details = ref('')

const reasons = [
  { value: 'copyright', label: 'Infringe derechos de autor' },
  { value: 'inappropriate', label: 'Contenido inapropiado u ofensivo' },
  { value: 'incorrect', label: 'Información incorrecta o engañosa' },
  { value: 'other', label: 'Otro motivo' }
]

const needsDetails = computed(() => reason.value === 'other')
const valid = computed(() => !!reason.value && (!needsDetails.value || details.value.trim().length >= 10))

watch(open, (v) => {
  if (v) {
    reason.value = ''
    details.value = ''
  }
})

const send = async () => {
  if (!valid.value) return
  loading.value = true
  await store.submit(props.resourceId, reason.value, details.value)
  loading.value = false
  open.value = false
  emit('sent')
}
</script>

<template>
  <v-dialog v-model="open" max-width="480">
    <v-card>
      <v-card-title class="text-wrap pt-4">Reportar contenido</v-card-title>
      <v-card-subtitle class="text-wrap">{{ title }}</v-card-subtitle>

      <v-card-text>
        <v-radio-group v-model="reason" label="¿Cuál es el problema?" hide-details class="mb-4">
          <v-radio v-for="r in reasons" :key="r.value" :label="r.label" :value="r.value" color="primary" />
        </v-radio-group>

        <v-textarea v-model="details" rows="3" variant="outlined" counter="500" maxlength="500"
          :label="needsDetails ? 'Cuéntanos qué pasa (mínimo 10 caracteres)' : 'Detalles (opcional)'" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="open = false">Cancelar</v-btn>
        <v-btn color="secondary" :disabled="!valid" :loading="loading" @click="send">Enviar reporte</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
