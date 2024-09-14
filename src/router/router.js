import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/main.vue';
import Login from '@/views/login.vue';
import { isAuthenticated } from '@/utils/auth';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Main
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Login' && isAuthenticated()) {
        // Redirect to home page if already logged in
        next({ name: 'Home' });
    } else {
        next(); // Proceed to the route
    }
});

export default router;