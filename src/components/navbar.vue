<script setup>
import Menubar from "primevue/menubar";
import {ref} from "vue";
import { isAuthenticated } from '@/utils/auth';

const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};

const items = ref([
  {
    auth: false,
    dontshowonauth: false,
    label: 'The Learning Platform',
    icon: 'pi pi-book',
    root: true,
  },
  {
    auth: false,
    dontshowonauth: true,
    label: 'Home',
    icon: 'pi pi-list',
    to: { name: 'Home' },
    root: true,
  },
  {
    auth: true,
    dontshowonauth: false,
    label: 'Portal',
    icon: 'pi pi-desktop',
    to: { name: 'Home' },
    root: true,
  },
  {
    auth: true,
    dontshowonauth: false,
    label: 'My Cards',
    icon: 'pi pi-id-card',
    to: { name: 'Cards' },
    root: true,
  },
  {
    auth: true,
    dontshowonauth: false,
    label: 'My Library',
    icon: 'pi pi-bookmark-fill',
    to: { name: 'Library' },
    root: true,
  },
  {
    auth: false,
    dontshowonauth: true,
    label: 'Login',
    icon: 'pi pi-sign-in',
    to: { name: 'Login' },
    root: true,
  },
  {
    auth: false,
    dontshowonauth: true,
    label: 'Register',
    icon: 'pi pi-user-plus',
    to: { name: 'Register' },
    root: true,
  },
  {
    auth: true,
    dontshowonauth: false,
    label: 'Logout',
    icon: 'pi pi-sign-out',
    action: logout,
    root: true,
  },
]);

</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu, root }">
      <!-- For navigation links like Login, Home, Register -->
      <router-link
          v-if="item.to && ((!item.auth && !item.dontshowonauth) || (!isAuthenticated() && item.dontshowonauth) || (isAuthenticated() && !item.dontshowonauth))"
          :to="item.to"
          v-ripple
          class="flex items-center"
          v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
      </router-link>

      <div
          v-if="item.auth && !item.to && isAuthenticated()"
          @click="item.action"
          class="flex items-center cursor-pointer"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </div>
    </template>
    <template #end>
      <Avatar label="V" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
    </template>
  </Menubar>
</template>

<style scoped>

</style>