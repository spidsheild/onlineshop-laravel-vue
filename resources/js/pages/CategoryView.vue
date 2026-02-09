<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/apiClient'
import { Header, Footer, CartDrawer } from '@/components'
import ProductCard from '@/components/product/ProductCard.vue' // Илова кардани ProductCard

const route = useRoute()

const category = ref(null)
const products = ref([])
const loading = ref(false)
const error = ref(null)

const fetchCategory = async () => {
    loading.value = true
    error.value = null
    products.value = [] // Холӣ кардани маҳсулоти пешина

    try {
        const { slug } = route.params
        const response = await api.get(`/categories/${slug}`)
        category.value = response.data.category
        products.value = response.data.products
    } catch (err) {
        error.value = 'Дастабандӣ пайдо нашуд ё хатогие рух дод.'
    } finally {
        loading.value = false
    }
}

onMounted(fetchCategory)

// Агар корбар байни дастаҳо ҷобаҷо шуд бидуни reload
watch(
    () => route.params.slug,
    (newSlug) => {
        if (newSlug) {
            fetchCategory()
        }
    }
)
</script>

<template>
    <Header></Header>
    <div class="container mx-auto px-4 py-8 min-h-screen">
        <CartDrawer />
        <!-- Loading -->
        <div v-if="loading" class="text-center py-20">
            <div class="flex justify-center items-center">
                <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p class="ml-4 text-gray-600">Дар ҳоли боргирӣ...</p>
            </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center text-red-500 py-20">
            <h2 class="text-xl font-semibold">Хатогӣ!</h2>
            <p>{{ error }}</p>
            <router-link to="/" class="mt-4 inline-block text-blue-600 hover:underline">Бозгашт ба саҳифаи аслӣ</router-link>
        </div>

        <!-- Content -->
        <div v-else-if="category">
            <!-- Category Header -->
            <div class="mb-8 text-center">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
                    {{ category.name }}
                </h1>
                <p class="text-gray-500 mt-2 max-w-2xl mx-auto">
                    {{ category.description }}
                </p>
            </div>

            <!-- Products Grid -->
            <div v-if="products.length" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>

            <!-- Empty -->
            <div v-else class="text-center text-gray-500 py-20">
                <h3 class="text-lg font-semibold">Маҳсулот ёфт нашуд</h3>
                <p>Дар айни замон дар ин дастабандӣ маҳсулоте вуҷуд надорад.</p>
            </div>
        </div>
    </div>
    <Footer />
</template>
