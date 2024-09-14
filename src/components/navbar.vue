<script setup>
import Menubar from "primevue/menubar";
import {ref} from "vue";

const items = ref([
  {
    label: 'Company',
    root: true,
    items: [
      [
        {
          items: [
            { label: 'Features', icon: 'pi pi-list', subtext: 'Subtext of item' },
            { label: 'Customers', icon: 'pi pi-users', subtext: 'Subtext of item' },
            { label: 'Case Studies', icon: 'pi pi-file', subtext: 'Subtext of item' }
          ]
        }
      ],
      [
        {
          items: [
            { label: 'Solutions', icon: 'pi pi-shield', subtext: 'Subtext of item' },
            { label: 'Faq', icon: 'pi pi-question', subtext: 'Subtext of item' },
            { label: 'Library', icon: 'pi pi-search', subtext: 'Subtext of item' }
          ]
        }
      ],
      [
        {
          items: [
            { label: 'Community', icon: 'pi pi-comments', subtext: 'Subtext of item' },
            { label: 'Rewards', icon: 'pi pi-star', subtext: 'Subtext of item' },
            { label: 'Investors', icon: 'pi pi-globe', subtext: 'Subtext of item' }
          ]
        }
      ],
      [
        {
          items: [{ image: 'https://primefaces.org/cdn/primevue/images/uikit/uikit-system.png', label: 'GET STARTED', subtext: 'Build spectacular apps in no time.' }]
        }
      ]
    ]
  },
  {
    label: 'Home',
    icon: 'pi pi-list',
    to: { name: 'Home' },
    root: true,
  },
  {
    label: 'Login',
    icon: 'pi pi-list',
    to: { name: 'Login' },
    root: true,
  }
]);
</script>

<template>
  <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu, root }">
        <router-link :to="item.to" v-ripple class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
        </router-link>
      </template>
  </Menubar>
</template>

<style scoped>

</style>