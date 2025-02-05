<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="user" />
    <Auth v-else />
  </div>
  
</template>

<script setup>
  import "@/assets/CSS/tailwind.css";
  const user = useSupabaseUser()
</script>