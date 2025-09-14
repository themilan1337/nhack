import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image', 'nuxt-mapbox'],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoibWlsYW4xMzM3IiwiYSI6ImNtZmliNGw1NjBqMHUya3F3N2ZlYmI4dGkifQ.1wSnZEu14y4snJroP8xOYA'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  build: {
    transpile: ['gsap']
  },
  nitro: {
    experimental: {
      wasm: true
    }
  }
})