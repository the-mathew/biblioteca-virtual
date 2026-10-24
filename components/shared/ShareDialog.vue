<script setup lang="ts">
const props = defineProps<{ title: string; url: string }>()
const open = defineModel<boolean>({ default: false })
const copied = ref(false)

const text = 'Encuentra este contenido en la Biblioteca Digital de Bogotá'
const links = computed(() => [
  { name: 'WhatsApp', icon: 'mdi-whatsapp', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${props.url}`)}` },
  { name: 'Facebook', icon: 'mdi-facebook', href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(props.url)}` },
  { name: 'Twitter', icon: 'mdi-twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(props.url)}` }
])

const copy = async () => {
  await navigator.clipboard.writeText(props.url)
  copied.value = true
}
</script>

<template>
  <v-dialog v-model="open" max-width="440">
    <v-card>
      <v-card-title class="text-wrap pt-4">Compartir este contenido</v-card-title>
      <v-card-subtitle class="text-wrap">{{ title }}</v-card-subtitle>
      <v-card-text>
        <p class="mb-3">Copia el enlace o compártelo en redes sociales</p>
        <v-list density="compact">
          <v-list-item v-for="l in links" :key="l.name" :href="l.href" target="_blank" rel="noopener"
            :prepend-icon="l.icon" :title="`Comparte en ${l.name}`" />
          <v-list-item prepend-icon="mdi-link-variant" title="Copia el enlace" @click="copy" />
        </v-list>
      </v-card-text>
      <v-card-actions><v-spacer /><v-btn variant="text" @click="open = false">Cerrar</v-btn></v-card-actions>
    </v-card>
    <v-snackbar v-model="copied" timeout="2000">¡Link copiado!</v-snackbar>
  </v-dialog>
</template>
