import { collections, mostViewed } from '~/data/home'

// MOCK: lee los datos locales. Con API: useFetch('/api/collections/institutional').
const institutions = ['Biblioteca Nacional de Colombia', 'BibloRed', 'Banco de la República', 'Agrosavia']

export const useInstitutionalCollections = () => {
  const all = collections.map((c, i) => ({ ...c, institution: institutions[i % institutions.length] }))

  const getById = (id: number) => {
    const i = all.findIndex((c) => c.id === id)
    if (i < 0) return null
    // Contenidos de ejemplo: la API real devolverá los recursos curados de cada colección.
    const resources = [0, 1, 2, 3, 4].map((k) => mostViewed[(i + k) % mostViewed.length])
    return { ...all[i], resources }
  }

  return { all, getById }
}
