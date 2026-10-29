import { mostViewed } from '~/data/home'

// MOCK: lee los datos locales. Con API, reemplazar por useFetch(`/api/resources/${id}`).
export const useResources = () => {
  const getById = (id: number) => {
    const r = mostViewed.find((x) => x.id === id)
    if (!r) return null
    return {
      ...r,
      // Campos de ejemplo hasta que el modelo real los traiga:
      license: r.exclusive ? 'Uso exclusivo para usuarios de BibloRed' : 'Creative Commons BY-NC-SA 4.0',
      source: 'Biblioteca Digital de Bogotá'
    }
  }

  const related = (resource: { id: number; topics: string[] }, limit = 3) =>
    mostViewed.filter((x) => x.id !== resource.id && x.topics.some((t) => resource.topics.includes(t))).slice(0, limit)

  return { getById, related }
}
