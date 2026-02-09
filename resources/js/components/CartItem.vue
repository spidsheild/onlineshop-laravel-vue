<script setup>
import { computed } from 'vue'
import { useCartStore3 } from '../stores/cart'
const cart = useCartStore3()

const { item } = defineProps({
    item: {
        type: Object,
        // required: true
    }

})

const price = computed(() => Number(item?.product.price))
const total = computed(() => price.value * item?.quantity)
</script>

<template>
    <div class="border rounded p-3">
        <h3 class="font-semibold">{{ item?.product.title }}</h3>

        <p class="text-sm text-gray-500">
            Нархи воҳид: {{ item?.product.price.toLocaleString() }} сомонӣ
        </p>

        <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2">
                <button @click="cart.updateQuantity(item.product.id, item.quantity - 1)" class="px-2 border">−</button>
                <span>{{ item?.quantity }}</span>
               
                <button @click="cart.updateQuantity(item.product.id, item.quantity + 1)" class="px-2 border">+</button>
                <p><button @click="cart.removeFromCart(item.product.id)" class="px-2 border">ҳазф</button></p>
            </div>
            <strong>
                {{ total }} $
            </strong>
        </div>
    </div>
</template>

