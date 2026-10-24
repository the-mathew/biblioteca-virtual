export interface User {
  id: number
  name: string
  email: string
}

interface Session {
  token: string
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  // La sesión vive en una cookie: persiste al recargar y también está disponible
  // en el servidor (SSR), así el header no parpadea entre "Ingresa" y el nombre.
  const session = useCookie<Session | null>('bdb_session', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 días
    sameSite: 'lax',
    secure: !import.meta.dev
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  const user = computed(() => session.value?.user ?? null)
  const token = computed(() => session.value?.token ?? null)
  const isAuthenticated = computed(() => !!session.value?.token)

  // MOCK: reemplazar por $fetch('/api/auth/login', { method: 'POST', body: {...} }).
  // Con un backend real, el token debe viajar en una cookie httpOnly puesta por el servidor.
  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      await new Promise((r) => setTimeout(r, 600))
      if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')
      const name = email.split('@')[0].replace(/[._-]/g, ' ')
      session.value = {
        token: `mock-${Date.now()}`,
        user: { id: Math.abs(hash(email)), name: name.charAt(0).toUpperCase() + name.slice(1), email }
      }
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'No pudimos iniciar sesión. Intenta de nuevo.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    session.value = null
    await navigateTo('/')
  }

  return { user, token, isAuthenticated, loading, error, login, logout }
})

function hash(s: string) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0
  return h
}
