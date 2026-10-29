export interface Report {
  id: string
  resourceId: number
  reason: string
  details: string
  reporterId: number | null
  createdAt: string
}

export const useReportsStore = defineStore('reports', () => {
  const auth = useAuthStore()
  const reports = ref<Report[]>([])

  // MOCK: reemplazar por $fetch('/api/reports', { method: 'POST', body: {...} }).
  // En el servidor: ocultar el recurso al acumular N reportes y avisar a un administrador.
  async function submit(resourceId: number, reason: string, details: string) {
    await new Promise((r) => setTimeout(r, 500))
    reports.value.push({
      id: crypto.randomUUID(),
      resourceId,
      reason,
      details: details.trim(),
      reporterId: auth.user?.id ?? null,
      createdAt: new Date().toISOString()
    })
    return true
  }

  const hasReported = (resourceId: number) => reports.value.some((r) => r.resourceId === resourceId)

  return { reports, submit, hasReported }
})
