<script setup>
import Button from 'primevue/button';

defineProps(['name', 'path', 'root'])
</script>

<template>
    <div class="bg-green-100 dark:bg-emerald-600 px-6 py-8 md:px-12 lg:px-20">
      <ul class="list-none p-0 m-0 flex items-center font-medium mb-4">
        <li>
          <a v-if="root == null" class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer">Portal</a>
          <a v-if="root != null" class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer">{{ root }}</a>
        </li>
        <li class="px-2">
          <i class="pi pi-angle-right text-surface-500 dark:text-surface-300 leading-normal" />
        </li>
        <li>
          <span class="text-surface-900 dark:text-surface-0 leading-normal">{{ path }}</span>
        </li>
      </ul>
      <div class="flex items-start flex-col lg:justify-between lg:flex-row">
        <div>
          <div class="font-medium text-3xl text-surface-900 dark:text-surface-0">{{ name }}</div>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>