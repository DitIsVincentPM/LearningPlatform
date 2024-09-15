<script setup>
import Button from "primevue/button";

defineProps(['id', 'name'])
</script>

<template>
  <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap">
    <div class="text-surface-500 dark:text-surface-300 w-6/12 md:w-2/12 font-medium">{{ id }}</div>
    <div class="text-surface-900 dark:text-surface-0 w-full md:w-8/12 md:order-none order-1">{{ name }}</div>
    <div class="w-6/12 md:w-2/12 flex justify-end">
      <router-link :to="`/cards/${id}`">
        <Button label="Start Learning" icon="pi pi-book" text />
      </router-link>
      <Button label="Edit" icon="pi pi-pencil" outlined />
    </div>
  </li>
</template>

<style scoped>

</style>