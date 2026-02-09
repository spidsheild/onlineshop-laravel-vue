<!-- 3️⃣ Сабади хариди ҷевонӣ (Drawer)

✔ Самти рост
✔ Баландии кулли саҳифа
✔ Собит (бо скролл ҷобаҷо намешавад)

components/CartDrawer.vue -->
<script setup>
import { useCartStore3 } from '@/stores/cart'
import CartItem from './CartItem.vue'

const cartStore = useCartStore3()
</script>

<template>
    <div v-if="cartStore.isOpen" class="fixed inset-0 bg-black/40 z-40" @click.self="cartStore.closeCart()"></div>

    <aside class="fixed top-0 right-0 h-screen w-96 bg-white z-50
           transition-transform duration-300
           overflow-y-auto" :class="cartStore.isOpen ? 'translate-x-0' : 'translate-x-full'">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
            <h2 class="text-lg font-bold">Сабади харид</h2>
            <button @click="cartStore.closeCart()">✖</button>
        </div>

        <!-- Items -->
        <div class="p-4 space-y-4">
            <CartItem v-for="item in cartStore.itemsStore" :key="item.id" :item="item" />
        </div>

        <!-- Footer -->
        <div class="p-4 border-t mt-auto">
            <div class="flex justify-between mb-4">
                <span>Маҷмӯъ:</span>
                <strong>{{ cartStore.totalPriceStore }} $ </strong>
            </div>
            <RouterLink to="/cart" class="block text-center bg-blue-600 text-white py-2 rounded mb-2"
                @click="cartStore.closeCart()" >
                Мушоҳидаи сабади харид
            </RouterLink>

            <button class="w-full border py-2 rounded" @click="cartStore.closeCart()">
                Бастан
            </button>
        </div>
    </aside>
</template>
