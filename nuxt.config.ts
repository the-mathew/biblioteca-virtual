import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/main.css'],
  // Sin prefijo de carpeta: components/home/HeroCarousel.vue -> <HeroCarousel />
  components: [{ path: '~/components', pathPrefix: false }],
  build: { transpile: ['vuetify'] },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Biblioteca Digital de Bogotá | BibloRed',
      meta: [
        { name: 'theme-color', content: '#16223f' },
        { name: 'description', content: 'Contenidos online de acceso gratuito: libros, revistas, audiolibros, música, videos y más.' }
      ]
    }
  },
  modules: [(_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error plugins existe en tiempo de ejecución
      config.plugins.push(vuetify({ autoImport: true }))
    })
  }, '@pinia/nuxt']
})