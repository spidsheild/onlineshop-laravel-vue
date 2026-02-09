<script setup>
import { computed } from 'vue'
import { useCartStore3 } from '@/stores/cart'
import api from '@/apiClient'
import { useRouter } from 'vue-router'

const cart = useCartStore3()
const router = useRouter()

// Рӯйхати маҳсулот
const items = computed(() => cart.itemsStore)

// Маблағи умумӣ
const totalPrice = computed(() => cart.totalPriceStore)

const payWithPaypal = async () => {
    try {
        const response = await api.post('/paypal/create-payment', {
            items: items.value.map(item => ({
                product_id: item.product.id,
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
            })),
            total: totalPrice.value,
        })

        window.location.href = response.data.approval_url

    } catch (error) {
        router.push({
            name: 'payment-result',
            query: { status: 'error' },
        })
    }
}


</script>

<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="max-w-2xl w-full mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
            <div class="text-center mb-8">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Саҳифаи пардохт</h1>
            </div>

            <div v-if="!items.length" class="text-center text-gray-500 py-12">
                <p>Маҳсулоте барои пардохт вуҷуд надорад.</p>
                <router-link to="/" class="mt-4 inline-block text-blue-600 hover:underline">
                    Бозгашт ба мағоза
                </router-link>
            </div>

            <div v-else class="space-y-6">
                <!-- Рӯйхати маҳсулот -->
                <div class="space-y-4">
                    <div v-for="item in items" :key="item.product.id"
                        class="border-b pb-4 flex justify-between items-start">
                        <div class="flex items-center gap-4">
                            <img :src="`/storage/${item.product.image}`" class="w-16 h-16 object-cover rounded-md" alt="">
                            <div>
                                <h2 class="font-semibold text-gray-800">{{ item.product.title }}</h2>
                                <p class="text-sm text-gray-500">
                                    Теъдод: {{ item.quantity }}
                                </p>
                            </div>
                        </div>

                        <div class="font-bold text-gray-800">
                            {{ (item.product.price * item.quantity).toLocaleString() }} $
                        </div>
                    </div>
                </div>


                <!-- Маблағи умумӣ -->
                <div class="border-t pt-4 mt-6 flex justify-between items-center">
                    <span class="text-lg font-semibold text-gray-800">Маҷмӯи кулл:</span>
                    <span class="text-xl font-bold text-gray-900">{{ totalPrice.toLocaleString() }} $</span>
                </div>

                <!-- Тугмаҳо -->
                <div class="mt-8 space-y-4 flex flex-col items-center">
                    <button @click="payWithPaypal"
                        class="w-full max-w-sm bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                        Пардохт бо PayPal
                    </button>
                    <router-link to="/cart"
                        class="w-full max-w-sm text-center rounded-lg bg-gray-200 px-6 py-3 text-gray-800 font-semibold hover:bg-gray-300 transition">
                        Бозгашт ба сабад
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
