import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/main.vue';
import Login from '@/views/login.vue';
import Register from '@/views/register.vue';
import Cards from '@/views/cards.vue';
import Library from '@/views/library.vue';

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
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/cards',
        name: 'Cards',
        component: Cards
    },
    {
        path: '/cards/:collection',
        name: 'Card',
        component: Cards
    },
    {
        path: '/library',
        name: 'Library',
        component: Library
    },
    {
        path: '/library/book/:id',
        name: 'LibraryBook',
        component: Library
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