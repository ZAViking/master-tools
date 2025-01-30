<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <h1 class="text-3xl font-bold mb-6">Link Manager</h1>
  
      <!-- Search Bar -->
      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search links..."
          class="w-full p-3 rounded border border-gray-300"
        />
      </div>
  
      <!-- Category Manager -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Category Manager</h2>
        <input
          v-model="newCategory"
          type="text"
          placeholder="New category name"
          class="w-1/2 p-3 rounded border border-gray-300 mr-2"
        />
        <button
          @click="addCategory"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>
  
      <div v-for="(links, category) in filteredLinks" :key="category" class="mb-10">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">{{ category }}</h2>
          <div>
            <button
              @click="editCategory(category)"
              class="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              @click="deleteCategory(category)"
              class="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
  
        <!-- Links with Drag-and-Drop -->
        <draggable
          v-model="categorizedLinks[category]"
          group="links"
          class="grid grid-cols-1 xl:grid-cols-5 gap-6"
          @end="saveToBackend"
        >
          <div
            v-for="(link, index) in links"
            :key="link.url"
            class="w-32 h-24 bg-gray-300 rounded-xl flex flex-col items-center justify-center shadow-md hover:shadow-lg transition"
          >
            <a
              :href="link.url"
              target="_blank"
              class="text-center text-sm text-gray-800 hover:underline"
            >
              {{ link.name }}
            </a>
            <div class="flex mt-2">
              <button
                @click="editLink(category, index)"
                class="text-xs text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteLink(category, index)"
                class="text-xs text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </draggable>
  
        <!-- Add Link Form -->
        <div class="mt-4">
          <input
            v-model="newLink.name"
            type="text"
            placeholder="Link name"
            class="w-1/3 p-3 rounded border border-gray-300 mr-2"
          />
          <input
            v-model="newLink.url"
            type="text"
            placeholder="Link URL"
            class="w-1/3 p-3 rounded border border-gray-300 mr-2"
          />
          <button
            @click="addLink(category)"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Link
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { useRuntimeConfig } from '#imports';

    const config = useRuntimeConfig();
    console.log(config.public.supabaseUrl); // Example use of runtime config
</script>
  
<script>
    // const supabaseUrl = 'https://bbbwfbmgghrbbktvusjm.supabase.co'
    // const supabaseKey = process.env.SUPABASE_KEY
    // const supabase = createClient(supabaseUrl, supabaseKey)
    import { defineComponent } from 'vue';
    import { useRuntimeConfig } from '#imports';

    import draggable from "vuedraggable"; // For drag-and-drop
    import { createClient } from "@supabase/supabase-js"; // Supabase client

    const config = useRuntimeConfig();
    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);
    console.log(config.public.supabaseUrl); // Example usage

    const { $supabase } = useNuxtApp();

    const { data, error } = await $supabase.from('table_name').select('*');
    console.log(data, error);

  
  export default {
    setup() {
        const config = useRuntimeConfig();
        console.log(config.public.supabaseUrl);
        return {};
    },
    components: {
      draggable,
    },
    data() {
      return {
        searchQuery: "",
        newLink: { name: "", url: "" },
        newCategory: "",
        categorizedLinks: {}, // Links grouped by category
      };
    },
    computed: {
      filteredLinks() {
        if (!this.searchQuery) return this.categorizedLinks;
  
        const query = this.searchQuery.toLowerCase();
        const filtered = {};
  
        for (const category in this.categorizedLinks) {
          const links = this.categorizedLinks[category].filter((link) =>
            link.name.toLowerCase().includes(query)
          );
          if (links.length) filtered[category] = links;
        }
  
        return filtered;
      },
    },
    methods: {
      async fetchLinks() {
        const { data, error } = await supabase.from("links").select("*");
        if (error) {
          console.error("Error fetching links:", error);
          return;
        }
  
        this.categorizedLinks = data.reduce((acc, link) => {
          if (!acc[link.category]) acc[link.category] = [];
          acc[link.category].push({ name: link.name, url: link.url });
          return acc;
        }, {});
      },
      async saveToBackend() {
        const flattenedLinks = [];
        for (const category in this.categorizedLinks) {
          this.categorizedLinks[category].forEach((link) => {
            flattenedLinks.push({ ...link, category });
          });
        }
  
        const { error } = await supabase.from("links").upsert(flattenedLinks);
        if (error) console.error("Error saving links:", error);
      },
      addLink(category) {
        if (!this.newLink.name || !this.newLink.url) {
          alert("All fields are required!");
          return;
        }
  
        this.categorizedLinks[category].push({ ...this.newLink });
        this.newLink = { name: "", url: "" };
        this.saveToBackend();
      },
      editLink(category, index) {
        const newName = prompt(
          "Enter new link name:",
          this.categorizedLinks[category][index].name
        );
        const newUrl = prompt(
          "Enter new link URL:",
          this.categorizedLinks[category][index].url
        );
  
        if (newName && newUrl) {
          this.categorizedLinks[category][index] = { name: newName, url: newUrl };
          this.saveToBackend();
        }
      },
      deleteLink(category, index) {
        this.categorizedLinks[category].splice(index, 1);
        this.saveToBackend();
      },
      addCategory() {
        if (!this.newCategory) {
          alert("Category name is required!");
          return;
        }
  
        if (this.categorizedLinks[this.newCategory]) {
          alert("Category already exists!");
          return;
        }
  
        this.categorizedLinks[this.newCategory] = [];
        this.newCategory = "";
        this.saveToBackend();
      },
      editCategory(oldCategory) {
        const newCategory = prompt("Enter new category name:", oldCategory);
  
        if (newCategory && newCategory !== oldCategory) {
          this.categorizedLinks[newCategory] = this.categorizedLinks[oldCategory];
          delete this.categorizedLinks[oldCategory];
          this.saveToBackend();
        }
      },
      deleteCategory(category) {
        if (confirm(`Are you sure you want to delete category "${category}"?`)) {
          delete this.categorizedLinks[category];
          this.saveToBackend();
        }
      },
    },
    mounted() {
      this.fetchLinks();
    },
  };
  </script>
  
  <style scoped>
    h1 {
        color: #333;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }
  </style>
  