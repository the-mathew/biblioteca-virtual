import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'bdb',
      themes: {
        bdb: {
          dark: false,
          colors: {
            primary: '#16223f',
            secondary: '#da532c',
            background: '#ffffff',
            surface: '#ffffff',
            'surface-variant': '#f3f4f8'
          }
        }
      }
    },
    defaults: {
      VBtn: { rounded: 'pill', variant: 'flat', class: 'text-none font-weight-bold' },
      VCard: { rounded: 'lg' }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
