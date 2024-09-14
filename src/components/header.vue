<script setup>
import { ref, onMounted } from 'vue';
import { isAuthenticated } from '@/utils/auth';
import { getUserData } from '@/utils/getUserData';
import Button from 'primevue/button';

const user = ref(null);

onMounted(async () => {
  if (isAuthenticated()) {
    try {
      const response = await getUserData();
      user.value = response.user; // Access the user object
      console.log(user.value); // Log the user data for debugging
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
});
</script>


<template>
  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
    <div class="items-start flex-col lg:justify-between lg:flex-row text-center mt-10">
      <div>
        <div v-if="user" class="font-medium text-3xl text-surface-900 dark:text-surface-0">
          Welkom, {{ user?.username }}
        </div>
        <div v-if="!user" class="font-medium text-3xl text-surface-900 dark:text-surface-0">
          Welkom to The Learning Platform
        </div>
        <div class="flex justify-center items-center text-surface-700 dark:text-surface-100 flex-wrap">
          <div class="mr-8 flex items-center mt-4">
            <i class="pi pi-users mr-2" />
            <span>5 people are Studying</span>
          </div>
          <div class="mr-8 flex items-center mt-4">
            <i class="pi pi-globe mr-2" />
            <span>200K have studied before you.</span>
          </div>
          <div class="flex items-center mt-4">
            <i class="pi pi-clock mr-2" />
            <span>2.32m Avg. Study Duration</span>
          </div>
        </div>
      </div>
      <div v-if="!isAuthenticated()" class="mt-6 lg:mt-4 flex justify-center">
        <router-link to="register" tag="button">
          <Button to="Register" label="Registreer" class="mr-2" outlined icon="pi pi-user-plus w-2/3" />
        </router-link>
        <router-link to="login" tag="button">
          <Button label="Login" icon="pi pi-check w-1/3"/>
        </router-link>
      </div>
    </div>
  </div>
</template>
