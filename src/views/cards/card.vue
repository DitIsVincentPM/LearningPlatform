<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import flashcard from "@/components/flashcard.vue";
import pageheader from "@/components/pageheader.vue";
import { getCardsFromCollection } from '@/utils/getCardsFromCollection.js';
import Message from "primevue/message";
import { getCollectionData } from "@/utils/getCollectionData.js";
import ToggleButton from 'primevue/togglebutton';
import WritingTest from "@/components/WritingTest.vue";
import Dialog from 'primevue/dialog';

const route = useRoute();
const cards = ref([]);
const collection = ref();
const isFlipped = ref(false);
const isTesting = ref(false);
const currentCardIndex = ref(0);
const correctAnswers = ref(0);
const incorrectAnswers = ref([]);
const showSummaryDialog = ref(false);

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

const flippedCards = computed(() => {
  return cards.value.map(card => ({
    frontText: isFlipped.value ? card.backText : card.frontText,
    backText: isFlipped.value ? card.frontText : card.backText,
    id: card.id
  }));
});

const nextCard = () => {
  if (currentCardIndex.value < cards.value.length - 1) {
    currentCardIndex.value++;
  } else {
    showSummaryDialog.value = true;
  }
};

const startWritingTest = () => {
  isTesting.value = true;
  currentCardIndex.value = 0;
  correctAnswers.value = 0;
  incorrectAnswers.value = [];

  // Shuffle the cards before starting the test
  shuffleArray(cards.value);
};

const handleTestComplete = (isAnswerCorrect) => {
  if (isAnswerCorrect) {
    correctAnswers.value++;
  }
  nextCard();
};


const handleAddIncorrectAnswer = (incorrectAnswer) => {
  incorrectAnswers.value.push(incorrectAnswer);
};

const closeSummaryDialog = () => {
  showSummaryDialog.value = false;
  isTesting.value = false;
};

onMounted(async () => {
  await loadCards();
  await loadCollection();
  shuffleArray(cards.value); // Shuffle cards after loading
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
};

</script>

<template>
  <pageheader name="Collection" root="Collections" :path="collection"></pageheader>
  <div class="flex justify-center">
    <div class="container">
      <div class="flex justify-center mt-6">
        <ToggleButton @click="isFlipped = !isFlipped" v-model="checked" onLabel="Switch Text" offLabel="Switch Text"
                      onIcon="pi pi-fast-forward" offIcon="pi pi-fast-backward" class="w-36"
                      aria-label="Do you confirm"/>
        <button v-if="!isTesting" @click="startWritingTest" class="ml-4 p-button p-component">Start Writing Test</button>
        <button v-if="isTesting" @click="showSummaryDialog = true" class="ml-4 p-button p-component">Stop Test</button>
      </div>

      <h1 class="text-center font-bold text-3xl p-5">{{ collection }}</h1>
      <Message severity="secondary" v-if="cards.length === 0" class="text-center">
        No cards available.
      </Message>

      <div v-else-if="isTesting" class="flex justify-center items-center gap-6 flex-wrap">
        <WritingTest
            :frontText="cards[currentCardIndex].frontText"
            :backText="cards[currentCardIndex].backText"
            @test-complete="handleTestComplete"
            @add-incorrect-answer="handleAddIncorrectAnswer"
        />
      </div>

      <div v-else class="flex justify-center items-center p-5 gap-6 flex-wrap">
        <div v-for="card in flippedCards" :key="card.id" class="col-span-4">
          <flashcard :frontText="card.frontText" :backText="card.backText"></flashcard>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="showSummaryDialog" maximizable modal header="Test Summary" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div>
      <p class="font-bold mb-3">You got {{ correctAnswers }} right out of {{ cards.length }} questions!</p>
      <ul>
        <li v-for="(answer, index) in incorrectAnswers" :key="index" class="mb-5">
          <strong>Question:</strong> {{ answer.frontText }}<br>
          <strong>Correct Answer:</strong> {{ answer.backText }}<br>
          <strong>Your Answer:</strong> {{ answer.userAnswer }}<br>
        </li>
      </ul>
    </div>
    <Button @click="closeSummaryDialog" label="Close" class="p-button p-component">Close</Button>
  </Dialog>
</template>
