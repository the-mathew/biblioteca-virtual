<script setup lang="ts">
defineProps<{ block?: boolean }>()
const auth = useAuthStore()
</script>

<template>
  <v-menu v-if="auth.isAuthenticated">
    <template #activator="{ props }">
      <v-btn v-bind="props" :block="block" variant="outlined" color="primary" class="text-white"
        prepend-icon="mdi-account-circle" append-icon="mdi-chevron-down">
        {{ auth.user?.name }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item to="/colecciones/usuario" prepend-icon="mdi-bookshelf" title="Mis colecciones" />
      <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" @click="auth.logout()" />
    </v-list>
  </v-menu>

  <template v-else>
    <v-btn :block="block" variant="outlined" color="white" to="/login">Ingresa</v-btn>
    <v-btn :block="block" color="secondary" href="https://www.biblored.gov.co/afiliese-a-biblored" target="_blank">Afíliate</v-btn>
  </template>
</template>
