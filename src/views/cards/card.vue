<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import flashcard from "@/components/flashcard.vue"; // Ensure the path is correct
import pageheader from "@/components/pageheader.vue";
import { getCardsFromCollection } from '@/utils/getCardsFromCollection.js';
import Message from "primevue/message";
import {getCollectionData} from "@/utils/getCollectionData.js";

const route = useRoute(); // Get the route object
const cards = ref([]);
const collection = ref();

const loadCards = async () => {
  try {
    const collectionId = route.params.id; // Get collectionId from route params
    if (collectionId) {
      const response = await getCardsFromCollection(collectionId);
      cards.value = response.cards || []; // Ensure cards is an array
    } else {
      console.error('Collection ID is missing from route');
    }
  } catch (error) {
    console.error('Error loading card collections:', error);
  }
};

const loadCollection = async () => {
  try {
    const collectionId = route.params.id; // Get collectionId from route params
    if (collectionId) {
      const response = await getCollectionData(collectionId);
      collection.value = response.collection[0].name;
      console.log(collection);
    } else {
      console.error('Collection ID is missing from route');
    }
  } catch (error) {
    console.error('Error loading card collections:', error);
  }
};

onMounted(() => {
  loadCards();
  loadCollection();
});
</script>

<template>
  <pageheader name="Collection" root="Collections" :path="collection"></pageheader>
  <div class="flex justify-center">
    <div class="container">
      <h1 class="text-center font-bold text-3xl p-5 mt-6">{{ collection }}</h1>
      <Message severity="secondary" v-if="cards.length === 0" class="text-center">No cards available.</Message>
      <div v-else class="flex justify-center items-center p-5 gap-6 flex-wrap">
        <div v-for="card in cards" :key="card.id" class="col-span-4">
          <flashcard :frontText="card.frontText" :backText="card.backText"></flashcard>
        </div>
      </div>
    </div>
  </div>
</template>
