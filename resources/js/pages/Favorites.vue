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
    <div class="container mx-auto px-4 py-8 min-h-screen">
        <CartDrawer />
        <div class="flex flex-col items-center pt-10 pb-8 space-y-4">
            <h2 class="w-full max-w-xs sm:w-auto text-center rounded-xl bg-gray-200 px-8 py-3 text-gray-800 font-semibold transition">
                Рӯйхати дӯстдоштаҳо
            </h2>
        </div>

        <div v-if="favoriteStore.loading" class="text-center py-20">
            <div class="flex justify-center items-center">
                <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        </div>
        
        <div v-else-if="favoriteStore.favorites.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in favoriteStore.favorites" :key="product.id" :product="product.product" />
        </div>

        <div v-else class="text-center py-20">
            <h3 class="text-xl font-semibold text-gray-700">Рӯйхати дӯстдоштаҳои шумо холӣ аст.</h3>
            <p class="text-gray-500 mt-2">Маҳсулоти писандидаи худро барои дастрасии осон дар ин ҷо илова кунед.</p>
            <router-link to="/products" class="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Ба маҳсулот
            </router-link>
        </div>

    </div>
    <Footer />
</template>
