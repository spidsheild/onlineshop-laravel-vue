<script setup>
import { useCartStore3 } from '@/stores/cart'
const cart = useCartStore3()
</script>

<template>
    <div class="max-w-4xl mx-auto p-6 border border-gray-700 rounded-lg">
    <div class="flex flex-col items-center py-10 space-y-4">
      <h2 class="w-64 text-center rounded-xl bg-gray-200 px-6 py-3 text-gray-800 font-semibold
           hover:bg-gray-300 transition"> Сабади харид </h2>
    </div>

    
    <div v-if="!cart.itemsStore.length" class="flex flex-col items-center py-10 space-y-4">
      Сабади харид холӣ аст
    </div>

    <div v-else class="space-y-4">
      <div v-for="item in cart.itemsStore" :key="item.product.id" class="border p-4 rounded">
        <div class="flex justify-between">
          <span>{{ item.product.title }}</span>

          <div class="flex items-center gap-2">
            <button @click="cart.updateQuantity(item.product.id, item.quantity - 1)" class="px-2 border">−</button>
            <span>{{ item?.quantity }}</span>
            <button @click="cart.updateQuantity(item.product.id, item.quantity + 1)" class="px-2 border">+</button>
            <p><button @click="cart.removeFromCart(item.product.id)" class="px-2 border">ҳазф</button></p>
          </div>

          <span>{{ item.quantity }} × {{ item.product.price.toLocaleString() }}</span>
        </div>
      </div>

      <div class="text-right font-bold text-lg  flex flex-col items-center py-10 space-y-4">
        Маҷмӯи ниҳоӣ: {{ cart.totalPriceStore.toLocaleString() }} $
      </div>


      <div class="flex flex-col items-center py-10 space-y-4">
        

        <router-link to="/checkout" class="w-64 text-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold
           hover:bg-blue-700 transition shadow-md">
          Checkout
        </router-link>

        <router-link to="/" class="w-64 text-center rounded-xl bg-gray-200 px-6 py-3 text-gray-800 font-semibold
           hover:bg-gray-300 transition">
          САҲИФАИ АСЛӢ
        </router-link>
      </div>
    </div>
  </div>
</template>