<script setup>
import { onMounted, ref, watch } from 'vue'
import { useProductStore1 } from '@/stores/product'
import ProductCard from '@/components/product/ProductCard.vue'
import { Header, Footer, CartDrawer } from '@/components'

const productStore = useProductStore1()
const selectedCategory = ref(null)

onMounted(() => {
    productStore.fetchProducts()
})

watch(selectedCategory, (val) => {
    productStore.fetchProducts(val, 1) // با تغییر دسته‌بندی برگرد صفحه 1
})

const changePage = (page) => {
    productStore.fetchProducts(selectedCategory.value, page)
}
</script>


<template>
    <Header />

    <div class="container mx-auto px-4 py-8">
        <CartDrawer />

        <!-- Filter -->
        <div class="flex flex-col items-center py-10 space-y-4">
            <h2 class="w-64 text-center rounded-xl bg-gray-200 px-6 py-3 text-gray-800 font-semibold">
                ЛИСТИ ДАСТАБАНДИҲО
            </h2>
        </div>

        <div class="mb-6 flex justify-center">
            <select v-model="selectedCategory" class="border rounded-lg px-4 py-2">
                <option :value="null">همه دسته‌بندی‌ها</option>
                <option
                    v-for="cat in productStore.categories"
                    :key="cat.id"
                    :value="cat.id"
                >
                    {{ cat.name }}
                </option>
            </select>
        </div>

        <!-- Products -->
        <div v-if="productStore.loading" class="text-center">
            در حال بارگذاری...
            <div class="flex justify-center items-center py-20">
                <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        </div>

        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
            <ProductCard
                v-for="product in productStore.products"
                :key="product.id"
                :product="product"
            />
        </div>

        <!-- Pagination -->
        <div
            v-if="productStore.lastPage > 1"
            class="flex justify-center items-center gap-2 mt-10"
        >
            <button
                class="px-4 py-2 border rounded-lg"
                :disabled="productStore.currentPage === 1"
                @click="changePage(productStore.currentPage - 1)"
            >
                قبلی
            </button>

            <button
                v-for="page in productStore.lastPage"
                :key="page"
                @click="changePage(page)"
                class="px-4 py-2 rounded-lg border"
                :class="page === productStore.currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-white'"
            >
                {{ page }}
            </button>

            <button
                class="px-4 py-2 border rounded-lg"
                :disabled="productStore.currentPage === productStore.lastPage"
                @click="changePage(productStore.currentPage + 1)"
            >
                بعدی
            </button>
        </div>
    </div>

    <Footer />
</template>
