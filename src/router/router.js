import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/main.vue';
import Login from '@/views/auth/login.vue';
import Register from '@/views/auth/register.vue';
import Cards from '@/views/cards/cards.vue';
import Card from '@/views/cards/card.vue'
import Library from '@/views/library/library.vue';
import NotFound from '@/views/NotFound.vue';

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
        path: '/cards/:id',
        name: 'Card',
        component: Card
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
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
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