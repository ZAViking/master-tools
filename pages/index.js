export default defineNuxtRouteMiddleware(() => {
    const config = useRuntimeConfig();
    console.log(config.public.supabaseUrl);
  });
  