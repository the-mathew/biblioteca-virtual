<script setup lang="ts">
const auth = useAuthStore()
const route = useRoute()

const email = ref('')
const password = ref('')
const show = ref(false)

const rules = {
  email: [(v: string) => /.+@.+\..+/.test(v) || 'Escribe un correo válido'],
  password: [(v: string) => v.length >= 6 || 'Mínimo 6 caracteres']
}

if (auth.isAuthenticated) await navigateTo('/')
onMounted(() => { auth.error = null })

const submit = async () => {
  if (await auth.login(email.value, password.value)) {
    const r = route.query.redirect
    await navigateTo(typeof r === 'string' && r.startsWith('/') ? r : '/')
  }
}
</script>

<template>
  <div class="container-bdb py-12 d-flex justify-center">
    <v-card width="440" class="pa-6" elevation="3">
      <h1 class="text-h5 section-title mb-1">Ingresa a tu cuenta</h1>
      <p class="section-sub mb-6">Guarda colecciones y comparte contenidos de la biblioteca.</p>

      <v-alert v-if="auth.error" type="error" variant="tonal" class="mb-4" :text="auth.error" />

      <v-form @submit.prevent="submit">
        <v-text-field v-model="email" label="Correo electrónico" type="email" :rules="rules.email"
          variant="outlined" autocomplete="email" />
        <v-text-field v-model="password" label="Contraseña" :type="show ? 'text' : 'password'" :rules="rules.password"
          variant="outlined" autocomplete="current-password"
          :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="show = !show" />
        <v-btn type="submit" color="primary" block size="large" :loading="auth.loading">Ingresa</v-btn>
      </v-form>
    </v-card>
  </div>
</template>
