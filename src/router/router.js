import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/main.vue';
import Login from '@/views/auth/login.vue';
import Register from '@/views/auth/register.vue';
import Cards from '@/views/cards/cards.vue';
import Card from '@/views/cards/card.vue';
import Library from '@/views/library/library.vue';
import NotFound from '@/views/NotFound.vue';
import Share from '@/views/share.vue'; // Import the Share component

import { isAuthenticated } from '@/utils/auth';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Main,
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false, guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresAuth: false, guest: true }
    },
    {
        path: '/cards',
        name: 'Cards',
        component: Cards,
        meta: { requiresAuth: true }
    },
    {
        path: '/cards/:id',
        name: 'Card',
        component: Card,
        meta: { requiresAuth: true }
    },
    {
        path: '/library',
        name: 'Library',
        component: Library,
        meta: { requiresAuth: true }
    },
    {
        path: '/library/book/:id',
        name: 'LibraryBook',
        component: Library,
        meta: { requiresAuth: true }
    },
    {
        path: '/share/:token',
        name: 'Share',
        component: Share,  // Use the Share component here
        meta: { requiresAuth: false }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isauthenticated = isAuthenticated()

    if (to.meta.requiresAuth && !isauthenticated) {
        next({ name: 'Login' });
    } else if (to.meta.guest && isauthenticated) {
        next({ name: 'Home' });
    } else {
        next(); // Proceed to the route
    }
});



export default router;
