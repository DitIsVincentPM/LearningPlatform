import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'; // Assuming Nora is correctly configured
import './assets/main.css'
import 'primeicons/primeicons.css'
import router from '@/router/router.js'; // Import the router
import dotenv from 'dotenv';

const app = createApp(App);

// Configure PrimeVue with the theme
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
});
app.use(router);

app.mount('#app');
