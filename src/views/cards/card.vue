<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import flashcard from "@/components/flashcard.vue";
import pageheader from "@/components/pageheader.vue";
import { getCardsFromCollection } from '@/utils/getCardsFromCollection.js';
import Message from "primevue/message";
import { getCollectionData } from "@/utils/getCollectionData.js";
import ToggleButton from 'primevue/togglebutton';

const route = useRoute();
const cards = ref([]);
const collection = ref();
const isFlipped = ref(false); // State for toggling

const loadCards = async () => {
  try {
    const collectionId = route.params.id;
    if (collectionId) {
      const response = await getCardsFromCollection(collectionId);
      cards.value = response.cards || [];
    } else {
      console.error('Collection ID is missing from route');
    }
  } catch (error) {
    console.error('Error loading card collections:', error);
  }
};

const loadCollection = async () => {
  try {
    const collectionId = route.params.id;
    if (collectionId) {
      const response = await getCollectionData(collectionId);
      collection.value = response.collection[0].name;
    } else {
      console.error('Collection ID is missing from route');
    }
  } catch (error) {
    console.error('Error loading card collections:', error);
  }
};

// Computed property to switch frontText and backText
const flippedCards = computed(() => {
  return cards.value.map(card => ({
    frontText: isFlipped.value ? card.backText : card.frontText,
    backText: isFlipped.value ? card.frontText : card.backText,
    id: card.id
  }));
});

onMounted(() => {
  loadCards();
  loadCollection();
});
</script>

<template>
  <pageheader name="Collection" root="Collections" :path="collection"></pageheader>
  <div class="flex justify-center">
    <div class="container">
      <div class="flex justify-center mt-6">
        <ToggleButton @click="isFlipped = !isFlipped" v-model="checked" onLabel="Switch Text" offLabel="Switch Text" onIcon="pi pi-fast-forward" offIcon="pi pi-fast-backward" class="w-36" aria-label="Do you confirm" />
      </div>

      <h1 class="text-center font-bold text-3xl p-5">{{ collection }}</h1>
      <Message severity="secondary" v-if="cards.length === 0" class="text-center">
        No cards available.
      </Message>

      <div v-else class="flex justify-center items-center p-5 gap-6 flex-wrap">
        <div v-for="card in flippedCards" :key="card.id" class="col-span-4">
          <flashcard :frontText="card.frontText" :backText="card.backText"></flashcard>
        </div>
      </div>
    </div>
  </div>
</template>
