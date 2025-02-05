<script setup lang="ts">
  const value = ref('')
  const items = [
  [{
    label: 'Coding',
  }], [{
    label: 'Social Media',
  }]
]
</script>

<template>
  <h1> The Lazy Linker </h1>
  <div class="container">
    <UPopover overlay>
      <UButton color="white" label="Add Bookmark" trailing-icon="i-heroicons-chevron-down-20-solid" />

      <template #panel>
        <h1>Adding Bookmarks</h1>
        <div class="form-container">
          <UTextarea v-model="bookmarkName" placeholder="Bookmark Name..." />
          <UTextarea v-model="bookmarkURL" placeholder="URL..." />
          <UDropdown :items="items" :popper="{ offsetDistance: 0, placement: 'right-start' }">
            <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
          </UDropdown>
        </div>
      </template>
    </UPopover>

    <UPopover overlay>
      <UButton color="white" label="Add Category" trailing-icon="i-heroicons-chevron-down-20-solid" />

      <template #panel>
        <h1>Adding Categories</h1>
        <div class="form-container">
          <UTextarea v-model="bookmarkName" placeholder="Category Name..." />
          <UDropdown :items="items" :popper="{ offsetDistance: 0, placement: 'right-start' }">
            <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
          </UDropdown>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style>
  .container {
    display: flex;
    gap: 1rem;
  }

  .form-container {
    display: flex;
    gap: 1rem;
  }
</style>