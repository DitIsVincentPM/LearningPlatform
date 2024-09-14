<script setup>
import index from "./index.vue";
import portal from "./portal.vue"
import { isAuthenticated } from '@/utils/auth';
</script>

<template>
  <index v-if="!isAuthenticated()"></index>
  <portal v-if="isAuthenticated()"></portal>
</template>

<style scoped>

</style>