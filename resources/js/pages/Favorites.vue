<script setup>
import { onMounted } from 'vue'
import { useFavoriteStore } from '@/stores/favorite'
import ProductCard from '@/components/product/ProductCard.vue'
import { Header, Footer, CartDrawer } from '@/components'

const favoriteStore = useFavoriteStore()

onMounted(() => {
    favoriteStore.fetchFavorites()
})
</script>

<template>
    <Header></Header>
    <div>
         <CartDrawer />
        <div class="flex flex-col items-center py-10 space-y-4">
            <h2 class="w-64 text-center rounded-xl bg-gray-200 px-6 py-3 text-gray-800 font-semibold
           hover:bg-gray-300 transition">ЛИСТИ ПИСАНДИДАҲО</h2>
        </div>

        <div class="grid grid-cols-4 gap-4">
            <ProductCard v-for="product in favoriteStore.favorites" :key="product.id" :product="product" />
        </div>

    </div>
    <Footer />
</template>
