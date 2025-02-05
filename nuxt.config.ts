// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxtjs/supabase',
  ],
  css: ['@/assets/css/main.css', '@/assets/css/tailwind.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },

  // Enable build transpilation for specific modules if necessary
  build: {
    transpile: ['vuedraggable', '@supabase/supabase-js'],
  },

  redirect: {
    login: '/login',
    callback: '/confirm',
    include: undefined,
    exclude: [],
    cookieRedirect: false,
  },

  cookieOptions: {
    maxAge: 60 * 60 * 8,
    sameSite: 'lax',
    secure: true
  },


  // Ensure TypeScript is properly configured
  typescript: {
    strict: true,
    shim: false,
  },

  imports: {
    autoImport: true, // Ensure auto-import of composables like useRuntimeConfig
  },
})