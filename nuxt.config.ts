// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image', 'nuxt-mapbox'],
  mapbox: {
    accessToken: 'pk.eyJ1IjoibWlsYW4xMzM3IiwiYSI6ImNtZmliNGw1NjBqMHUya3F3N2ZlYmI4dGkifQ.1wSnZEu14y4snJroP8xOYA'
  }
})