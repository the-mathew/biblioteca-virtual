export interface UserCollection {
  id: string
  name: string
  resourceIds: number[]
  createdAt: string
}

export const useCollectionsStore = defineStore('collections', () => {
  const auth = useAuthStore()
  const collections = ref<UserCollection[]>([])

  // Una clave por usuario, para que cada cuenta tenga sus propias colecciones.
  const storageKey = computed(() => (auth.user ? `bdb_collections_${auth.user.id}` : null))

  // Se llama desde el layout en onMounted (solo cliente) para evitar errores de hidratación.
  function hydrate() {
    if (!import.meta.client || !storageKey.value) {
      collections.value = []
      return
    }
    try {
      collections.value = JSON.parse(localStorage.getItem(storageKey.value) ?? '[]')
    } catch {
      collections.value = []
    }
  }

  watch(storageKey, () => hydrate())
  watch(
    collections,
    (value) => {
      if (import.meta.client && storageKey.value) localStorage.setItem(storageKey.value, JSON.stringify(value))
    },
    { deep: true }
  )

  function create(name: string) {
    const collection: UserCollection = {
      id: crypto.randomUUID(),
      name: name.trim(),
      resourceIds: [],
      createdAt: new Date().toISOString()
    }
    collections.value.push(collection)
    return collection
  }

  function remove(id: string) {
    collections.value = collections.value.filter((c) => c.id !== id)
  }

  function addResource(collectionId: string, resourceId: number) {
    const c = collections.value.find((c) => c.id === collectionId)
    if (c && !c.resourceIds.includes(resourceId)) c.resourceIds.push(resourceId)
  }

  function removeResource(collectionId: string, resourceId: number) {
    const c = collections.value.find((c) => c.id === collectionId)
    if (c) c.resourceIds = c.resourceIds.filter((id) => id !== resourceId)
  }

  const collectionsWith = (resourceId: number) =>
    collections.value.filter((c) => c.resourceIds.includes(resourceId))

  return { collections, hydrate, create, remove, addResource, removeResource, collectionsWith }
})
