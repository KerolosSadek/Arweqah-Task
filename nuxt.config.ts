export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  css: [
    '@/assets/css/tailwind.css',
    'vuetify/styles',
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@pinia/nuxt'],
})
