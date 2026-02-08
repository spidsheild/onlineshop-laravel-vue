<script setup>
import { computed } from 'vue'
import { useCartStore3 } from '@/stores/cart'
import api from '@/apiClient'
import { useRouter } from 'vue-router'

const cart = useCartStore3()
const router = useRouter()

// لیست محصولات
const items = computed(() => cart.itemsStore)

// مبلغ کل
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
        <div class="max-w-4xl mx-auto p-6 border border-gray-700 rounded-lg">
        <div class="text-right text-xl font-bold border-t pt-4  flex flex-col items-center py-10 space-y-4">
            <h1 class="text-2xl font-bold mb-6">صفحه پرداخت</h1>
        </div>

        <div v-if="!items.length" class="text-center text-gray-500">
            محصولی برای پرداخت وجود ندارد
        </div>

        <div v-else class="space-y-4">
            <!-- لیست محصولات -->
            <div v-for="item in items" :key="item.product.id" class="border rounded p-4 flex justify-between">
                <div>
                    <h2 class="font-semibold">{{ item.product.title }}</h2>
                    <p class="text-sm text-gray-500">
                        تعداد: {{ item.quantity }}
                    </p>
                </div>

                <div class="font-bold">
                    {{ (item.product.price * item.quantity).toLocaleString() }} تومان
                </div>
            </div>

            <!-- مبلغ کل -->
            <div class="text-right text-xl font-bold border-t pt-4  flex flex-col items-center py-10 space-y-4">
                مجموع کل: {{ totalPrice.toLocaleString() }} تومان
            </div>
            <div class="flex flex-col items-center py-10 space-y-4">

 <button @click="payWithPaypal" class=" w-64 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
                    پرداخت با PayPal
                </button>
<router-link to="/cart" class="w-64 text-center rounded-xl bg-gray-200 px-6 py-3 text-gray-800 font-semibold
           hover:bg-gray-300 transition">
                    АҚИБ ГАШТАН
                </router-link>
            </div>
        </div>
    </div>
</template>
