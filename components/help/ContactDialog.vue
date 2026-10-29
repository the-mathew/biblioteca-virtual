<script setup lang="ts">
const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ sent: [] }>()

const auth = useAuthStore()
const formRef = ref()
const loading = ref(false)
const form = reactive({ name: '', email: '', topic: 'Duda general', message: '' })
const topics = ['Duda general', 'Problema con mi cuenta', 'Subir contenido', 'Derechos de autor', 'Otro']

const rules = {
  required: (v: string) => !!v?.trim() || 'Este campo es obligatorio',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Escribe un correo válido',
  message: (v: string) => v.trim().length >= 10 || 'Cuéntanos un poco más (mínimo 10 caracteres)'
}

// Al abrir, precarga los datos de la sesión si existe.
watch(open, (v) => {
  if (v) {
    form.name = auth.user?.name ?? ''
    form.email = auth.user?.email ?? ''
    form.topic = 'Duda general'
    form.message = ''
  }
})

// MOCK: reemplazar por $fetch('/api/contact', { method: 'POST', body: form }).
const send = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  open.value = false
  emit('sent')
}
</script>

<template>
  <v-dialog v-model="open" max-width="520">
    <v-card>
      <v-card-title class="pt-4">Contáctanos</v-card-title>
      <v-card-subtitle class="text-wrap">Cuéntanos tu duda y te responderemos por correo.</v-card-subtitle>
      <v-card-text class="pt-4">
        <v-form ref="formRef" @submit.prevent="send">
          <v-text-field v-model="form.name" label="Nombre" variant="outlined" :rules="[rules.required]" autocomplete="name" />
          <v-text-field v-model="form.email" label="Correo electrónico" type="email" variant="outlined" :rules="[rules.email]" autocomplete="email" />
          <v-select v-model="form.topic" :items="topics" label="Tema" variant="outlined" />
          <v-textarea v-model="form.message" label="Mensaje" rows="4" variant="outlined" maxlength="1000" counter :rules="[rules.message]" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="open = false">Cancelar</v-btn>
        <v-btn color="primary" :loading="loading" @click="send">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
