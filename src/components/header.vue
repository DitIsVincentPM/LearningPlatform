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

  <div v-if="!isAuthenticated()" class="grid grid-cols-12 gap-4 grid-nogutter bg-surface-0 dark:bg-surface-950 text-surface-800 dark:text-surface-50 h-full">
    <div class="col-span-12 md:col-span-6 p-12 text-center md:text-left flex items-center ">
      <section>
        <span class="block text-6xl font-bold mb-1">Learning should be </span>
        <div class="text-6xl text-primary font-bold mb-4">fun and easy not hard.</div>
        <p class="mt-0 mb-6 text-surface-700 dark:text-surface-100 leading-normal">The Learning Platform offers alot of quality of life solutions to enhance your learning expierince.</p>

        <router-link to="register" tag="button">
          <Button to="Register" label="Register" class="mr-2" raised icon="pi pi-user-plus w-2/3" />
        </router-link>
        <router-link to="login" tag="button">
          <Button label="Login" outlined icon="pi pi-check w-1/3"/>
        </router-link>
      </section>
    </div>
    <div class="col-span-12 md:col-span-6 overflow-hidden">
      <img src="/imgs/ems2.jpg" alt="Image" class="md:ml-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
  </div>

  <div v-if="isAuthenticated()" class="bg-surface-0 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
    <div class="items-start flex-col lg:justify-between lg:flex-row text-center mt-10">
      <div>
        <div v-if="user" class="font-medium text-3xl text-surface-900 dark:text-surface-0">
          Welkom, {{ user?.username }}
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
    </div>
  </div>
</template>
