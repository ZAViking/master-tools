// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
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
    key: process.env.SUPABASE_KEY,
    redirect: false,
    // redirectOptions: {
    //   login: '/',
    //   callback: '/',
    //   include: undefined,
    //   exclude: [],
    //   cookieRedirect: false,
    // },
    // cookieOptions: {
    //   maxAge: 60 * 60 * 8,
    //   sameSite: 'lax',
    //   secure: true
    // },
  },

  // Enable build transpilation for specific modules if necessary
  build: {
    transpile: ['vuedraggable', '@supabase/supabase-js'],
  },

  // Ensure TypeScript is properly configured
  typescript: {
    strict: true,
    shim: false,
  },
})