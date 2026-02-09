<script setup>
import { onMounted } from 'vue'
import { useFavoriteStore } from '@/stores/favorite'
import ProductCard from '@/components/product/ProductCard.vue'

const favoriteStore = useFavoriteStore()

onMounted(() => {
    // Маълумот аллакай дар App.vue дархост шудааст, аммо барои эҳтиёт
    if (favoriteStore.favorites.length === 0) {
        favoriteStore.fetchFavorites()
    }
})
</script>

<template>
    <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div class="mb-6 border-b pb-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Маҳсулоти дӯстдошта</h2>
        </div>

        <!-- Loading State -->
        <div v-if="favoriteStore.loading" class="text-center py-16">
            <div class="flex justify-center items-center">
                <div class="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p class="ml-4 text-gray-600">Дар ҳоли боргирӣ...</p>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="favoriteStore.favorites.length === 0" class="text-center py-16">
            <h3 class="text-lg font-semibold text-gray-700">Рӯйхати дӯстдоштаҳои шумо холӣ аст.</h3>
            <p class="text-gray-500 mt-2">Маҳсулоти писандидаи худро барои дастрасии осон дар ин ҷо илова кунед.</p>
             <router-link to="/products" class="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Ба маҳсулот
            </router-link>
        </div>

        <!-- Favorites Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard v-for="fav in favoriteStore.favorites" :key="fav.id" :product="fav.product" />
        </div>
    </div>
</template>
