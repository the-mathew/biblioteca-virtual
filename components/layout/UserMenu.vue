<script setup lang="ts">
defineProps<{ block?: boolean }>()
const auth = useAuthStore()
</script>

<template>
  <v-menu v-if="auth.isAuthenticated">
    <template #activator="{ props }">
      <v-btn v-bind="props" :block="block" variant="outlined" color="white"
        prepend-icon="mdi-account-circle" append-icon="mdi-chevron-down">
        {{ auth.user?.name }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item to="/subir" prepend-icon="mdi-upload" title="Subir contenido" />
      <v-list-item to="/mis-aportes" prepend-icon="mdi-folder-account-outline" title="Mis aportes" />
      <v-list-item to="/colecciones/usuario" prepend-icon="mdi-bookshelf" title="Mis colecciones" />
      <v-divider />
      <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" @click="auth.logout()" />
    </v-list>
  </v-menu>

  <v-btn v-else :block="block" color="secondary" to="/login">Ingresa</v-btn>
</template>
