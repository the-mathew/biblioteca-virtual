<script setup lang="ts">
const props = defineProps<{ resourceId: number; title: string }>()
const open = defineModel<boolean>({ default: false })

const store = useCollectionsStore()
const newName = ref('')

const toggle = (collectionId: string, checked: boolean) =>
  checked ? store.addResource(collectionId, props.resourceId) : store.removeResource(collectionId, props.resourceId)

const create = () => {
  if (!newName.value.trim()) return
  const c = store.create(newName.value)
  store.addResource(c.id, props.resourceId)
  newName.value = ''
}
</script>

<template>
  <v-dialog v-model="open" max-width="460" scrollable>
    <v-card>
      <v-card-title class="text-wrap pt-4">Añadir a colecciones</v-card-title>
      <v-card-subtitle class="text-wrap">{{ title }}</v-card-subtitle>

      <v-card-text style="max-height:320px">
        <p v-if="!store.collections.length" class="section-sub">Aún no tienes colecciones. Crea la primera aquí abajo.</p>
        <v-checkbox v-for="c in store.collections" :key="c.id" :model-value="c.resourceIds.includes(resourceId)"
          :label="`${c.name} (${c.resourceIds.length})`" density="compact" hide-details color="primary"
          @update:model-value="(v) => toggle(c.id, !!v)" />
      </v-card-text>

      <v-divider />
      <v-card-text>
        <v-form class="d-flex ga-2" @submit.prevent="create">
          <v-text-field v-model="newName" label="Nueva colección" variant="outlined" density="compact" hide-details />
          <v-btn type="submit" color="primary" height="40" :disabled="!newName.trim()">Crear y añadir</v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions><v-spacer /><v-btn variant="text" @click="open = false">Listo</v-btn></v-card-actions>
    </v-card>
  </v-dialog>
</template>
