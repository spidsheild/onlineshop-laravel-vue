<template>
    <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div class="mb-6 border-b pb-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Таърихи харидҳо</h2>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16">
            <div class="flex justify-center items-center">
                <div class="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p class="ml-4 text-gray-600">Дар ҳоли дарёфти маълумот...</p>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="purchases.length === 0" class="text-center py-16">
            <h3 class="text-lg font-semibold text-gray-700">Шумо то ҳол хариде анҷом надодаед.</h3>
            <p class="text-gray-500 mt-2">Пас аз анҷоми харид, он дар ин саҳифа намоиш дода мешавад.</p>
        </div>

        <!-- Purchases List -->
        <div v-else class="space-y-6">
            <div v-for="order in purchases" :key="order.id" class="border rounded-lg p-4 sm:p-6 bg-gray-50">
                <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                    <h3 class="font-bold text-lg text-gray-800">Фармоиши №{{ order.id }}</h3>
                    <p class="font-semibold text-gray-600 text-sm sm:text-base">
                        {{ new Date(order.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                    </p>
                </div>

                <div class="border-t pt-4">
                    <ul class="space-y-2">
                        <li v-for="item in order.items" :key="item.id" class="flex justify-between items-center text-sm sm:text-base">
                            <span class="text-gray-700">{{ item.product.title }}</span>
                            <div class="flex items-center gap-4">
                                <span class="text-gray-500">Теъдод: {{ item.quantity }}</span>
                                <span class="font-semibold text-gray-800 w-24 text-right">{{ (item.price * item.quantity).toLocaleString() }} $</span>
                            </div>
                        </li>
                    </ul>
                    <div class="text-right mt-4 font-bold text-base sm:text-lg text-blue-600 border-t pt-2">
                        Маблағи умумӣ: {{ order.total.toLocaleString() }} $
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="lastPage > 1" class="flex justify-center items-center flex-wrap gap-3 mt-8">
            <button
                v-for="page in lastPage"
                :key="page"
                @click="fetchPurchases(page)"
                class="px-4 py-2 rounded-lg border min-w-[44px] text-center hover:bg-gray-100 transition-colors"
                :class="page === currentPage ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white'"
                :disabled="page === currentPage"
            >
                {{ page }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/apiClient'

const purchases = ref([])
const currentPage = ref(1)
const lastPage = ref(1)
const loading = ref(false)

const fetchPurchases = async (page = 1) => {
    if (loading.value) return;
    loading.value = true
    try {
        const { data } = await api.get('/purchases', {
            params: { page }
        })

        purchases.value = data.data
        currentPage.value = data.current_page
        lastPage.value = data.last_page
    } catch (error) {
        console.error("Хатогӣ дар дарёфти харидҳо:", error)
        purchases.value = [] // Дар ҳолати хатогӣ холӣ мондан
    } finally {
        loading.value = false
    }
}

onMounted(() => fetchPurchases())
</script>
