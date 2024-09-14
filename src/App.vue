<script setup>
import { ref } from "vue";
import Header from "@/components/header.vue";
import Navbar from "@/components/navbar.vue";

const text = ref("Input");
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

