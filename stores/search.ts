import { mostViewed } from '~/data/home'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const topics = ref<string[]>([])
  const exclusiveOnly = ref(false)
  const page = ref(1)
  const pageSize = 12

  // MOCK: filtra los datos locales. Con API, reemplazar por useFetch('/api/search', { query: ... }).
  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    return mostViewed.filter((r) => {
      const matchesText = !q || `${r.title} ${r.author} ${r.text}`.toLowerCase().includes(q)
      const matchesTopics = !topics.value.length || topics.value.some((t) => r.topics.includes(t))
      const matchesExclusive = !exclusiveOnly.value || r.exclusive
      return matchesText && matchesTopics && matchesExclusive
    })
  })

  const availableTopics = computed(() => [...new Set(mostViewed.flatMap((r) => r.topics))].sort())
  const paged = computed(() => results.value.slice((page.value - 1) * pageSize, page.value * pageSize))
  const totalPages = computed(() => Math.max(1, Math.ceil(results.value.length / pageSize)))

  // Sincroniza el store con la URL (?q=...&topics=a,b) para que las búsquedas sean compartibles.
  function setFromRoute(q: Record<string, unknown>) {
    query.value = typeof q.q === 'string' ? q.q : ''
    topics.value = typeof q.topics === 'string' && q.topics ? q.topics.split(',') : []
    exclusiveOnly.value = q.exclusive === '1'
    page.value = Number(q.page) > 0 ? Number(q.page) : 1
  }

  function toRouteQuery() {
    return {
      ...(query.value && { q: query.value }),
      ...(topics.value.length && { topics: topics.value.join(',') }),
      ...(exclusiveOnly.value && { exclusive: '1' }),
      ...(page.value > 1 && { page: String(page.value) })
    }
  }

  function reset() {
    query.value = ''
    topics.value = []
    exclusiveOnly.value = false
    page.value = 1
  }

  return { query, topics, exclusiveOnly, page, results, paged, totalPages, availableTopics, setFromRoute, toRouteQuery, reset }
})
