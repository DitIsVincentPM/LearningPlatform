<script setup>
import Button from "primevue/button";

defineProps(['name'])
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
    <ul class="list-none p-0 m-0 flex items-center font-medium mb-4">
      <li>
        <a class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer">{{ name }}</a>
      </li>
      <!-- <li class="px-2">
        <i class="pi pi-angle-right text-surface-500 dark:text-surface-300 leading-normal" />
      </li>
      <li>
        <span class="text-surface-900 dark:text-surface-0 leading-normal">Analytics</span>
      </li>-->
    </ul>
    <div class="flex items-start flex-col lg:justify-between lg:flex-row">
      <div>
        <div class="font-medium text-3xl text-surface-900 dark:text-surface-0">Welkom</div>
        <div class="flex items-center text-surface-700 dark:text-surface-100 flex-wrap">
          <div class="mr-8 flex items-center mt-4">
            <i class="pi pi-users mr-2" />
            <span>5 Mensen zijn aan het studeren</span>
          </div>
          <div class="mr-8 flex items-center mt-4">
            <i class="pi pi-globe mr-2" />
            <span>3 Mensen Geholpen</span>
          </div>
          <div class="flex items-center mt-4">
            <i class="pi pi-clock mr-2" />
            <span>2.32m Avg. Duration</span>
          </div>
        </div>
      </div>
      <div class="mt-4 lg:mt-0">
        <Button label="Registreer" class="mr-2" outlined icon="pi pi-user-plus" />
        <Button label="Login" icon="pi pi-check" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>