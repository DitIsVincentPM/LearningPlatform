<script setup>
import Button from "primevue/button";

// Define props for 'id' and 'name'
const props = defineProps(['id', 'name']);

// Emit event to parent component for deletion
const emit = defineEmits(['delete']);

// Method to trigger the delete event
function handleDelete() {
  console.log('Delete clicked for id:', props.id); // Debugging line
  emit('delete', props.id); // Emit the delete event with the collection id
}
</script>

<template>
  <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap">
    <div class="text-surface-500 dark:text-surface-300 w-6/12 md:w-2/12 font-medium">{{ props.id }}</div>
    <div class="text-surface-900 dark:text-surface-0 w-full md:w-6/12 md:order-none order-1">{{ props.name }}</div>
    <div class="w-6/12 md:w-4/12 flex justify-end gap-2"> <!-- Add gap for spacing -->
      <router-link :to="`/cards/${props.id}`">
        <Button label="Start Learning" icon="pi pi-book" text/>
      </router-link>
      <!-- Delete button -->
      <Button label="Delete" icon="pi pi-trash" class="p-button-danger" outlined @click="handleDelete"/>
    </div>
  </li>
</template>

<style scoped>
/* Add custom styling if needed */
</style>
