<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  import "@/assets/CSS/tailwind.css";
  const user = useSupabaseUser()
</script>