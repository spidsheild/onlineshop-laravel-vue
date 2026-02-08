<!-- src/layouts/DefaultLayout.vue -->
<template>
    <div class="min-h-screen flex flex-col">
        <ShopHeader />
        <CartDrawer />

        <main class="flex-1">
            <router-view />
        </main>

        <Footer />
    </div>
</template>

<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import Footer from '@/components/Footer.vue'
import CartDrawer from '@/components/CartDrawer.vue'
</script>
