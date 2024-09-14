<script setup>
import Navbar from "@/components/navbar.vue";
</script>

<template>
  <Navbar></Navbar>

  <div class="items-center flex justify-center">
    <div class="container">
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>

</style>

