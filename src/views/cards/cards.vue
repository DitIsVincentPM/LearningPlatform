<script setup>
import Pageheader from "@/components/pageheader.vue";
import Card from "@/components/card.vue";
import Message from 'primevue/message';

import { ref, onMounted } from 'vue';
import { getCardCollections } from "@/utils/getCardCollections.js";

const collections = ref([]); // Initially an empty array

onMounted(async () => {
  try {
    const fetchedCollections = await getCardCollections(); // Fetch card collections from server
    collections.value = fetchedCollections; // Update the collections ref with fetched data
  } catch (error) {
    console.error("Error loading card collections:", error);
  }
});
</script>

<template>
  <Pageheader name="Cards" path="Cards"></Pageheader>
  <div class="bg-surface-0 dark:bg-surface-950 p-10 md:p-20">
    <div class="bg-surface-0 dark:bg-surface-950">
      <div class="font-medium text-3xl text-surface-900 dark:text-surface-0 mb-4 text-center">Your Card Collections</div>
      <div class="text-surface-500 dark:text-surface-300 mb-8 text-center">Here you can see all your collections create new ones or edit old ones.</div>

      <div class="flex justify-center border-0">
      <ul class="list-none p-0 m-0 border-0 justify-center container bg-green-50 dark:bg-emerald-900">
        <li v-for="collection in collections" :key="collection.id" class="mb-4">
          <Card :model="collection" :id="collection.id" :name="collection.name"></Card>
        </li>
      </ul>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <Message class="container flex justify-center" v-if="collections.length == 0" severity="contrast">No collections found.</Message>
  </div>
</template>

<style scoped>

</style>