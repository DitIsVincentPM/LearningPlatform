<script setup>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import Toast from 'primevue/toast';

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <Toast position="bottom-left" />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* You can add additional styles if needed */
</style>
