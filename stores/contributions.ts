export type ContributionStatus = 'publicado' | 'oculto' | 'retirado'

export interface Contribution {
  id: string
  type: string
  title: string
  author: string
  year: number
  language: string
  description: string
  topics: string[]
  license: string
  fileName: string
  fileSize: number
  status: ContributionStatus
  createdAt: string
}

export type NewContribution = Omit<Contribution, 'id' | 'status' | 'createdAt'>

export const useContributionsStore = defineStore('contributions', () => {
  const auth = useAuthStore()
  const items = ref<Contribution[]>([])
  const hydrated = ref(false)

  const storageKey = computed(() => (auth.user ? `bdb_contributions_${auth.user.id}` : null))

  // Solo cliente. Se llama desde las páginas en onMounted para evitar errores de hidratación.
  function hydrate() {
    if (!import.meta.client || !storageKey.value) return
    try {
      items.value = JSON.parse(localStorage.getItem(storageKey.value) ?? '[]')
    } catch {
      items.value = []
    }
    hydrated.value = true
  }

  watch(
    items,
    (value) => {
      // No escribir hasta haber leído, para no pisar lo guardado con una lista vacía.
      if (import.meta.client && hydrated.value && storageKey.value) {
        localStorage.setItem(storageKey.value, JSON.stringify(value))
      }
    },
    { deep: true }
  )

  // MOCK: en la beta el contenido queda publicado al instante (otros usuarios pueden reportarlo).
  // Con servidor: 1) pedir URL firmada y subir el archivo directo al almacenamiento,
  // 2) POST /api/resources con los metadatos, 3) escanear el archivo antes de exponerlo.
  async function submit(data: NewContribution) {
    if (!hydrated.value) hydrate()
    await new Promise((r) => setTimeout(r, 800))
    const item: Contribution = {
      ...data,
      id: crypto.randomUUID(),
      status: 'publicado',
      createdAt: new Date().toISOString()
    }
    items.value.unshift(item)
    return item
  }

  function remove(id: string) {
    items.value = items.value.filter((c) => c.id !== id)
  }

  return { items, hydrate, submit, remove }
})
