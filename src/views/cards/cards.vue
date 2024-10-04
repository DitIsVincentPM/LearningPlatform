<script setup>
import Pageheader from "@/components/pageheader.vue";
import Card from "@/components/card.vue";
import Button from 'primevue/button'; // Import PrimeVue Button
import Dialog from 'primevue/dialog'; // Import PrimeVue Dialog
import InputText from 'primevue/inputtext'; // Import PrimeVue InputText
import Message from 'primevue/message'; // Import PrimeVue Message

import { ref, onMounted } from 'vue';
import { getCardCollections } from "@/utils/getCardCollections.js";
import { createCardCollection } from "@/utils/createCardCollections.js";
import { deleteCardCollection } from "@/utils/deleteCardCollection.js"; // Import delete utility

// Reactive references for data and dialog visibility
const showCreateDialog = ref(false); // Toggle for create dialog
const collectionName = ref(""); // Input for new collection name
const collections = ref([]); // Array to store collections
const showDeleteDialog = ref(false); // Toggle for delete confirmation dialog
const selectedCollection = ref(null); // Store the collection to delete

// Fetch collections on mount
onMounted(async () => {
  try {
    const fetchedCollections = await getCardCollections();
    collections.value = fetchedCollections;
  } catch (error) {
    console.error("Error loading card collections:", error);
  }
});

// Function to create a card collection
async function createCardCollections() {
  try {
    await createCardCollection(collectionName.value);
    const updatedCollections = await getCardCollections(); // Refresh collections
    collections.value = updatedCollections;
    showCreateDialog.value = false; // Close dialog after creation
    collectionName.value = ""; // Clear input
  } catch (error) {
    console.error("Error creating card collection:", error);
  }
}

// Toggle create modal function
function toggleCreateModal() {
  showCreateDialog.value = !showCreateDialog.value;
}

// Open delete confirmation dialog
function openDeleteDialog(collection) {
  selectedCollection.value = collection;
  showDeleteDialog.value = true;
}

// Function to delete a card collection
async function confirmDeleteCollection() {
  if (!selectedCollection.value) return;

  try {
    await deleteCardCollection(selectedCollection.value.id); // Call API to delete the collection
    const updatedCollections = await getCardCollections(); // Refresh collections
    collections.value = updatedCollections; // Update UI with new collections
    showDeleteDialog.value = false; // Close delete dialog
    selectedCollection.value = null; // Clear selected collection
  } catch (error) {
    console.error("Error deleting card collection:", error);
  }
}
</script>

<template>
  <Pageheader name="Cards" path="Cards"/>

  <div class="bg-surface-0 dark:bg-surface-950 p-10 md:p-20">
    <div class="bg-surface-0 dark:bg-surface-950 w-100">
      <div class="flex w-100 p-0 m-0 justify-center items-center gap-8 mb-9">
        <div>
          <div class="font-medium text-3xl text-surface-900 dark:text-surface-0 mb-4 text-center">Your Card Collections</div>
          <div class="text-surface-500 dark:text-surface-300 text-center">
            Here you can see all your collections, create new ones, or edit old ones.
          </div>
        </div>
        <div>
          <Button @click="toggleCreateModal" severity="success" outlined>Create new</Button>
        </div>
      </div>

      <div class="flex justify-center border-0">
        <ul class="list-none p-0 m-0 border-0 justify-center container bg-green-50 dark:bg-emerald-900">
          <li v-for="collection in collections" :key="collection.id">
            <Card :id="collection.id" :name="collection.name" @delete="openDeleteDialog(collection)" />
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <Message class="container flex justify-center" v-if="collections.length === 0" severity="contrast">
      No collections found.
    </Message>
  </div>

  <!-- Dialog for creating a new card collection -->
  <Dialog v-model:visible="showCreateDialog" modal header="Create Collection" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div>
      <InputText id="collectionName" v-model="collectionName" placeholder="Collection Name"/>
    </div>
    <div class="p-mt-3 flex gap-2 mt-4">
      <Button @click="createCardCollections" severity="success" label="Submit" class="p-button p-component"/>
      <Button @click="toggleCreateModal" severity="danger" outlined label="Close" class="p-button p-component p-ml-2"/>
    </div>
  </Dialog>

  <!-- Dialog for delete confirmation -->
  <Dialog v-model:visible="showDeleteDialog" modal header="Confirm Delete" :style="{ width: '30rem' }">
    <div class="text-center">
      <p>Are you sure you want to delete the collection: <strong>{{ selectedCollection?.name }}</strong>?</p>
    </div>
    <div class="p-mt-3 flex gap-2 mt-4">
      <Button @click="confirmDeleteCollection" severity="danger" label="Delete" class="p-button p-component"/>
      <Button @click="showDeleteDialog = false" severity="secondary" outlined label="Cancel" class="p-button p-component p-ml-2"/>
    </div>
  </Dialog>
</template>

<style scoped>
/* Add custom styling if needed */
</style>
