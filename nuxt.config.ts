// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon'
  ],
  css: ['@/assets/css/main.css', '@/assets/css/tailwind.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  // Enable build transpilation for specific modules if necessary
  build: {
    transpile: ['vuedraggable', '@supabase/supabase-js'],
  },

  // Add runtime config if using Supabase (e.g., environment variables)
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
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