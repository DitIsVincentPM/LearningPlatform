<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import flashcard from "@/components/flashcard.vue";
import Pageheader from "@/components/pageheader.vue";
import { getCardsFromCollection } from '@/utils/getCardsFromCollection.js';
import Message from "primevue/message";
import { getCollectionData } from "@/utils/getCollectionData.js";
import ToggleButton from 'primevue/togglebutton';
import WritingTest from "@/components/WritingTest.vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'; // Import Button component
import { useToast } from 'primevue/usetoast';
import {addCards} from "@/utils/addCards.js"; // Import useToast
import {deleteCard} from "@/utils/deleteCard.js"; // Import useToast
import {editCard} from "@/utils/editCard.js"; // Import useToast

const route = useRoute();
const cards = ref([]);
const collection = ref();
const isFlipped = ref(false);
const isTesting = ref(false);
const currentCardIndex = ref(0);
const correctAnswers = ref(0);
const incorrectAnswers = ref([]);
const showSummaryDialog = ref(false);
const toast = useToast(); // Use toast for notifications
const isEditMode = ref(false);
const showEditDialog = ref(false);
const editCardData = ref(null);
const showCreateDialog = ref(false);
const newCardData = ref({ frontText: '', backText: '' });


// Function to create a new card
const createCard = async () => {
  try {
    const collectionId = route.params.id;
    const cardToAdd = {
      name: newCardData.value.frontText,
      description: newCardData.value.backText,
    };

    await addCards(collectionId, [cardToAdd]);
    toast.add({ severity: 'success', summary: 'Card Created', detail: 'New card added successfully' });
    newCardData.value = { frontText: '', backText: '' };
    showCreateDialog.value = false;

    await loadCards()
  } catch (error) {
    console.error('Error creating card:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create card' });
  }
};

// Function to delete a card
const deleteCardL = async (cardId) => {
  try {
    // Call the deleteCard function from the service
    const response = await deleteCard(cardId);

    // If the response is successful, update the local state
    if (response) {
      toast.add({ severity: 'success', summary: 'Card Deleted', detail: `Card ID: ${cardId} deleted successfully` });
      cards.value = cards.value.filter(card => card.id !== cardId); // Update cards array locally
    }
  } catch (error) {
    console.error('Error deleting card:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete card' });
  }
};


// Function to open the edit dialog
const openEditDialog = (card) => {
  editCardData.value = { ...card };
  showEditDialog.value = true;
};

// Function to save card changes
const saveCardChanges = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/editCard/${editCardData.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        frontText: editCardData.value.frontText,
        backText: editCardData.value.backText,
      })
    });

    if (response.ok) {
      const updatedCard = await response.json();
      const index = cards.value.findIndex(c => c.id === editCardData.value.id);
      if (index !== -1) cards.value[index] = updatedCard.card;
      toast.add({ severity: 'success', summary: 'Card Updated', detail: 'Card updated successfully' });
    } else {
      const data = await response.json();
      toast.add({ severity: 'error', summary: 'Error', detail: data.message });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update card' });
  }

  showEditDialog.value = false;
};

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

const generateShareLink = async () => {
  try {
    const collectionId = route.params.id;
    const response = await fetch('http://localhost:8080/api/generate-share-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({collectionId})
    });

    const data = await response.json();
    if (response.ok) {
      navigator.clipboard.writeText(data.link);
      toast.add({
        severity: 'success',
        summary: 'Share Link Generated',
        detail: `Link copied to clipboard: ${data.link}`
      });
    } else {
      toast.add({severity: 'error', summary: 'Error', detail: data.message});
    }
  } catch (error) {
    console.error('Error generating share link:', error);
    toast.add({severity: 'error', summary: 'Error', detail: 'Failed to generate share link'});
  }
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
  <Pageheader name="Collection" root="Collections" :path="collection"></Pageheader>
  <div class="flex justify-center">
    <div class="container">
      <div class="flex justify-center mt-6">
        <ToggleButton @click="isFlipped = !isFlipped" v-model="checked" onLabel="Switch Text" offLabel="Switch Text"
                      onIcon="pi pi-fast-forward" offIcon="pi pi-fast-backward" class="w-36"
                      aria-label="Do you confirm"/>
        <Button v-if="!isTesting" @click="startWritingTest" severity="info" outlined class="ml-4 p-button p-component">
          Start Writing Test
        </Button>
        <Button v-if="isTesting" @click="showSummaryDialog = true" severity="danger" outlined
                class="ml-4 p-button p-component">Stop Test
        </Button>
        <Button @click="generateShareLink" class="ml-4 p-button p-component p-button-secondary">Generate Share Link
        </Button>
        <Button @click="isEditMode = !isEditMode" class="ml-4 p-button p-component p-button-warning">Toggle Edit Mode</Button>
        <Button @click="showCreateDialog = true" class="ml-4 p-button p-component p-button-success">Create Card</Button>
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

          <div v-if="isEditMode" class="flex gap-2 mt-2">
            <Button label="Edit" icon="pi pi-pencil" @click="openEditDialog(card)" class="p-button p-component p-button-info"></Button>
            <Button label="Delete" icon="pi pi-trash" @click="deleteCardL(card.id)" class="p-button p-component p-button-danger"></Button>
          </div>
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
    <Button @click="closeSummaryDialog" label="Close" outlined class="p-button p-component">Close</Button>
  </Dialog>


  <!-- Edit Card Dialog -->
  <Dialog v-model:visible="showEditDialog" header="Edit Card" :style="{ width: '50vw' }">
    <div>
      <p><strong>Front Text:</strong></p>
      <textarea v-model="editCardData.frontText" class="w-full"></textarea>

      <p class="mt-4"><strong>Back Text:</strong></p>
      <textarea v-model="editCardData.backText" class="w-full"></textarea>
    </div>
    <template #footer>
      <Button @click="saveCardChanges" label="Save" icon="pi pi-check" class="p-button p-component p-button-success"></Button>
      <Button @click="showEditDialog = false" label="Cancel" icon="pi pi-times" outlined class="p-button p-component p-button-danger"></Button>
    </template>
  </Dialog>

  <!-- Create Card Dialog -->
  <Dialog v-model:visible="showCreateDialog" header="Create New Card" :style="{ width: '50vw' }">
    <div>
      <p><strong>Front Text:</strong></p>
      <textarea v-model="newCardData.frontText" class="w-full"></textarea>

      <p class="mt-4"><strong>Back Text:</strong></p>
      <textarea v-model="newCardData.backText" class="w-full"></textarea>
    </div>
    <template #footer>
      <Button @click="createCard" label="Create" icon="pi pi-plus" class="p-button p-component p-button-success"></Button>
      <Button @click="showCreateDialog = false" label="Cancel" icon="pi pi-times" outlined class="p-button p-component p-button-danger"></Button>
    </template>
  </Dialog>
</template>