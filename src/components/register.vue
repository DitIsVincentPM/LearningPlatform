<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';

const checked1 = ref(true);
const name = ref('');
const nameSecond = ref('');
const password = ref('');
const message = ref('');

var severityError = ref("error")

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/register', {
      name: name.value,
      nameSecond: nameSecond.value,
      password: password.value
    });

    localStorage.setItem('token', response.data.token); // Store token
    message.value = response.data.message;
    severityError = "success"

    window.location.reload();
  } catch (error) {
    message.value = error.response?.data?.message || 'An error occurred';
    severityError = "error";
  }
};

</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
      <div class="text-center mb-8">
        <!-- SVG and welcome message -->
        <svg class="mb-4 mx-auto fill-surface-600 dark:fill-surface-200 h-16" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- SVG path here -->
        </svg>
        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome</div>
        <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Already have an account?</span>
        <a href="/login" class="font-medium no-underline ml-2 text-primary cursor-pointer text-green-300">Login!</a>
      </div>

      <div>
        <Message v-if="message" :severity="severityError" class="mt-4 text-center mb-4">{{ message }}</Message>
        <label for="username" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Name</label>
        <InputText v-model="name" type="text" placeholder="Name" class="w-full mb-4" />

        <label for="surname" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Surname</label>
        <InputText v-model="nameSecond" type="text" placeholder="Surname" class="w-full mb-4" />

        <label for="password" class="mb-2 text-surface-900 dark:text-surface-0 font-medium block">Password</label>
        <InputText v-model="password" type="password" placeholder="Password" class="w-full" />
        <small>No special symbols, minimal 8 characters</small>

        <div class="mt-2 flex items-center justify-between mb-12">
          <div class="flex items-center">
            <Checkbox id="rememberme1" v-model="checked1" :binary="true" class="mr-2" />
            <label for="rememberme1">Remember me</label>
          </div>
          <a class="font-medium no-underline ml-2 text-primary text-right cursor-pointer">Forgot password?</a>
        </div>

        <div class="flex gap-2">
          <Button label="Sign In" icon="pi pi-user-plus" class="w-2/3" @click="handleRegister" />
          <Button label="Log In" severity="secondary" outlined icon="pi pi-user" class="w-1/3" />
        </div>
      </div>
    </div>
  </div>
</template>
