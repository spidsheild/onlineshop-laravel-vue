import Home from '../pages/Home.vue'
import Cart from '../pages/CartPage.vue'
import Checkout from '../pages/Checkout.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import SingleProduct from '@/pages/SingleProduct.vue'

// Layout
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// Pages
import ProfileView from '@/pages/dashboard/ProfileView.vue'
import CartView from '@/pages/dashboard/CartView.vue'
import PurchasesView from '@/pages/dashboard/PurchasesView.vue'


import ProductsIndex from '@/pages/ProductsIndex.vue'

export const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    { path: '/cart', component: Cart },
    {
        path: '/checkout',
        component: Checkout,
        meta: { requiresAuth: true },
    },
    {
        path: '/products/:id',
        name: 'product.show',
        component: SingleProduct
    },
    {
        path: '/checkout',
        component: () => import('@/pages/Checkout.vue'),
    },
    {
        path: '/payment-result',
        name: 'payment-result',
        component: () => import('@/pages/Success.vue'),
    },

    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login,
                meta: { guest: true }
            },
            {
                path: 'register',
                name: 'register',
                component: Register,
                meta: { guest: true }
            },
            {
                path: '',
                redirect: { name: 'login' }, // Пешфарз
            },
        ],
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                redirect: '/dashboard/profile',
            },
            {
                path: 'profile',
                component: ProfileView,
            },
            {
                path: 'cart',
                component: CartView,
            },
            {
                path: 'purchases',
                component: PurchasesView,
            },
            {
                path: 'favorites',
                component: () => import('@/pages/dashboard/Favorites.vue'),
            },
        ]
    },



    {
        path: '/products',
        name: 'products.index',
        component: ProductsIndex,
    },
    {
        path: '/favorites',
        component: () => import('@/pages/Favorites.vue'),
        meta: { requiresAuth: true },
    },

    {
        path: '/category/:slug',
        name: 'category',
        component: () => import('@/pages/CategoryView.vue')
    },



    { path: '/about', component: Home },
    { path: '/contact', component: Home },

    { path: '/faq', component: Home },
    { path: '/terms', component: Home },
    { path: '/privacy', component: Home },
    { path: '/returns', component: Home },

]
