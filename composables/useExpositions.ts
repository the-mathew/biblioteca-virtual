import { expositions, mostViewed } from '~/data/home'

// MOCK: lee los datos locales. Con API: useFetch('/api/expositions') y useFetch(`/api/expositions/${slug}`).
export const useExpositions = () => {
  const all = expositions
  const categories = [...new Set(all.map((e) => e.category))]

  const getBySlug = (slug: string) => {
    const i = all.findIndex((e) => e.slug === slug)
    if (i < 0) return null
    // Contenidos de ejemplo: la API real devolverá los recursos curados de cada exposición.
    const resources = [0, 1, 2].map((k) => mostViewed[(i * 2 + k) % mostViewed.length])
    return { ...all[i], resources }
  }

  const others = (slug: string, limit = 2) => all.filter((e) => e.slug !== slug).slice(0, limit)

  return { all, categories, getBySlug, others }
}
