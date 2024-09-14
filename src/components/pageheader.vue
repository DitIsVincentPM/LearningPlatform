<script setup>
import Button from 'primevue/button';

defineProps(['name', 'path'])
</script>

<template>
    <div class="bg-green-100 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
      <ul class="list-none p-0 m-0 flex items-center font-medium mb-4">
        <li>
          <a class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer">Portal</a>
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
        <div class="mt-4 lg:mt-0">
          <Button label="Add" class="mr-2" severity="secondary" outlined icon="pi pi-user-plus" />
          <Button label="Save" severity="secondary" icon="pi pi-check" />
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>