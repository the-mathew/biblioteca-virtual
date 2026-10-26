// Aplica un cambio al store de búsqueda y lo refleja en la URL (/buscar?q=...&topics=...).
// La URL es la fuente de verdad: buscar.vue la lee y vuelve a llenar el store.
export const useSearchNav = () => {
  const search = useSearchStore()
  const router = useRouter()
  return (patch?: () => void) => {
    patch?.()
    return router.push({ path: '/buscar', query: search.toRouteQuery() })
  }
}
