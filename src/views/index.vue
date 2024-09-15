<script setup>
import Header from "@/components/header.vue";
import Button from 'primevue/button';
</script>

<template>
  <Header name="Home"></Header>

  <div class="flex justify-center dark:bg-emerald-500 bg-green-50">
    <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20 text-center w-2/3">
      <div class="mb-4 font-bold text-3xl">
        <span class="text-surface-900 dark:text-surface-0">One Software, </span>
        <span class="dark:text-emerald-900 text-green-600">Many Tools</span>
      </div>
      <div class="text-surface-700 dark:text-surface-100 mb-12">It's designed with students in mind.</div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-4 mb-6 px-8">
            <span class="p-4 shadow mb-4 inline-block bg-surface-0 dark:bg-surface-900" style="border-radius: 10px">
                <i class="pi pi-desktop text-4xl text-green-500 dark:text-emerald-900"></i>
            </span>
          <div class="text-surface-900 dark:text-surface-0 text-xl mb-4 font-medium">Cards</div>
          <span class="text-surface-700 dark:text-surface-100 leading-normal">A simple flipping card system to learn languages and difinitions in minutes.</span>
        </div>
        <div class="col-span-12 md:col-span-4 mb-6 px-8">
            <span class="p-4 shadow mb-4 inline-block bg-surface-0 dark:bg-surface-900" style="border-radius: 10px">
                <i class="pi pi-lock text-4xl text-green-500 dark:text-emerald-900"></i>
            </span>
          <div class="text-surface-900 dark:text-surface-0 text-xl mb-4 font-medium">Library</div>
          <span class="text-surface-700 dark:text-surface-100 leading-normal">Upload your PDF books and keep them in one place, read them on side or download them.</span>
        </div>
        <div class="col-span-12 md:col-span-4 mb-6 px-8">
            <span class="p-4 shadow mb-4 inline-block bg-surface-0 dark:bg-surface-900" style="border-radius: 10px">
                <i class="pi pi-lock text-4xl text-green-500 dark:text-emerald-900"></i>
            </span>
          <div class="text-surface-900 dark:text-surface-0 text-xl mb-4 font-medium">Courses</div>
          <span class="text-surface-700 dark:text-surface-100 leading-normal">Wanne learn something new, a large library of writen courses are available or links to courses!</span>
        </div>
        <div class="col-span-12 md:col-span-4 mb-6 px-8">
            <span class="p-4 shadow mb-4 inline-block bg-surface-0 dark:bg-surface-900" style="border-radius: 10px">
                <i class="pi pi-check-circle text-4xl text-green-500 dark:text-emerald-900"></i>
            </span>
          <div class="text-surface-900 dark:text-surface-0 text-xl mb-4 font-medium">Easy to Use</div>
          <span class="text-surface-700 dark:text-surface-100 leading-normal">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
        </div>
        <div class="col-span-12 md:col-span-4 mb-6 px-8">
            <span class="p-4 shadow mb-4 inline-block bg-surface-0 dark:bg-surface-900" style="border-radius: 10px">
                <i class="pi pi-lock text-4xl text-green-500 dark:text-emerald-900"></i>
            </span>
          <div class="text-surface-900 dark:text-surface-0 text-xl mb-4 font-medium">Contribute</div>
          <span class="text-surface-700 dark:text-surface-100 leading-normal">Are you a developer and have something in mind, make a pull request to the github with the changes.</span>
        </div>
        <div class="col-span-12 md:col-span-4 mb-6 px-8">
            <span class="p-4 shadow mb-4 inline-block bg-surface-0 dark:bg-surface-900" style="border-radius: 10px">
                <i class="pi pi-github text-4xl text-green-500 dark:text-emerald-900"></i>
            </span>
          <div class="text-surface-900 dark:text-surface-0 text-xl mb-4 font-medium">Open Source</div>
          <span class="text-surface-700 dark:text-surface-100 leading-normal">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <div class="text-surface-700 dark:text-surface-100 text-center">
      <div class="text-green-600 font-bold mb-4"><i class="pi pi-discord"></i>&nbsp;POWERED BY DISCORD</div>
      <div class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-4">Join Our Learners Community</div>
      <div class="text-surface-700 dark:text-surface-100 text-2xl mb-8">Wanne find people to Study with or wanne chat? This is the place to be.</div>
      <Button label="Join Now" icon="pi pi-discord" class="font-bold px-8 py-4 whitespace-nowrap" raised rounded></Button>
    </div>
  </div>
</template>

<style scoped>

</style>