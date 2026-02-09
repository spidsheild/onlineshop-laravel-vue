<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/apiClient'
import { Header, Footer, CartDrawer } from '@/components'

const route = useRoute()

const category = ref(null)
const products = ref([])
const loading = ref(false)
const error = ref(null)
const getAll = ref(null)

const fetchCategory = async () => {
    loading.value = true
    error.value = null

    try {
        const { slug } = route.params
        const response = await api.get(`/categories/${slug}`)
        console.log(response.data);
        getAll.value = response.data
        category.value = response.data.category
        products.value = response.data.products
    } catch (err) {
        error.value = 'Дастабандӣ пайдо нашуд'
    } finally {
        loading.value = false
    }
}

onMounted(fetchCategory)

// Агар корбар байни дастаҳо ҷобаҷо шуд бидуни reload
watch(
    () => route.params.slug,
    () => {
        fetchCategory()
    }
)
</script>

<template>
    <Header></Header>
    <div class="container mx-auto px-4 py-6">
        <CartDrawer />
        <!-- Loading -->
        <div v-if="loading" class="text-center py-20">
            Дар ҳоли боргирӣ...
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center text-red-500 py-20">
            {{ error }}
        </div>

        <!-- Content -->
        <div v-else>
            <!-- Category Header -->
            <div class="mb-6">
                <h1 class="text-2xl font-bold">
                    {{ category?.name }}
                </h1>
                <p class="text-gray-500 mt-1">
                    {{ category?.description }}
                </p>
            </div>

            <!-- Products Grid -->
            <div v-if="products.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="product in products" :key="product.id"
                    class="bg-white rounded-xl shadow hover:shadow-lg transition">
                    <img :src="`/storage/${product.image}`" :alt="product.name" class="w-full h-40 object-cover rounded-t-xl" />

                    <div class="p-3">
                        <h3 class="text-sm font-semibold line-clamp-2">
                            {{ product.name }}
                        </h3>

                        <p class="text-primary font-bold mt-2">
                            {{ product.price }} $
                        </p>
                    </div>
                </div>
            </div>

            <!-- Empty -->
            <div v-else class="text-center text-gray-500 py-20">
                Маҳсулоте дар ин дастабандӣ вуҷуд надорад
            </div>
        </div>
    </div>
    <Footer />
</template>
