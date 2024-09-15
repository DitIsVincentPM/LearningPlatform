<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
    <Card class="text-center shadow-2xl max-w-md mx-auto p-6 bg-white rounded-lg">
      <template #header>
        <div class="text-6xl font-bold text-red-600 mb-4">
          404
        </div>
      </template>
      <template #content>
        <div class="text-2xl font-semibold mb-4 text-gray-800">
          Page Not Found
        </div>
        <p class="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button
            label="Go Back Home"
            icon="pi pi-home"
            class="p-button-rounded p-button-primary"
            @click="goHome"
        />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
/* Optional: Add any additional custom styles here */
</style>
