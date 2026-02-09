<script setup>
import { useCartStore3 } from '@/stores/cart'
import { RouterLink } from 'vue-router';
const cart = useCartStore3()
</script>

<template>
  <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
    <div class="mb-6 border-b pb-4">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Сабади харид</h2>
    </div>

    <div v-if="!cart.itemsStore.length" class="text-center py-16">
        <h3 class="text-lg font-semibold text-gray-700">Сабади хариди шумо холӣ аст.</h3>
        <p class="text-gray-500 mt-2">Барои илова кардани маҳсулот ба мағоза равед.</p>
        <router-link to="/products" class="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Дидани маҳсулот
        </router-link>
    </div>

    <div v-else>
      <!-- Cart Items Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="border-b">
            <tr class="text-sm text-gray-600">
              <th class="font-semibold p-2">Маҳсулот</th>
              <th class="font-semibold p-2 hidden sm:table-cell">Нарх</th>
              <th class="font-semibold p-2">Теъдод</th>
              <th class="font-semibold p-2 text-right">Маблағ</th>
              <th class="font-semibold p-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.itemsStore" :key="item.product.id" class="border-b">
              <td class="p-2">
                <div class="flex items-center gap-3">
                  <img :src="`/storage/${item.product.image}`" class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" :alt="item.product.title" />
                  <div>
                    <div class="font-semibold text-gray-800">{{ item.product.title }}</div>
                    <div class="text-gray-500 text-sm sm:hidden">{{ item.product.price.toLocaleString() }} $</div>
                  </div>
                </div>
              </td>
              <td class="p-2 hidden sm:table-cell">{{ item.product.price.toLocaleString() }} $</td>
              <td class="p-2">
                <div class="flex items-center gap-2">
                  <button @click="cart.updateQuantity(item.product.id, item.quantity - 1)" class="px-2 py-0.5 border rounded hover:bg-gray-100" :disabled="item.quantity <= 1">-</button>
                  <span>{{ item?.quantity }}</span>
                  <button @click="cart.updateQuantity(item.product.id, item.quantity + 1)" class="px-2 py-0.5 border rounded hover:bg-gray-100">+</button>
                </div>
              </td>
              <td class="p-2 text-right font-semibold">{{ (item.quantity * item.product.price).toLocaleString() }} $</td>
              <td class="p-2 text-right">
                <button @click="cart.removeFromCart(item.product.id)" class="text-red-500 hover:text-red-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cart Summary -->
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex justify-between items-center text-lg sm:text-xl">
              <span class="font-semibold text-gray-800">Маҷмӯи ниҳоӣ:</span>
              <span class="font-bold text-gray-900">{{ cart.totalPriceStore.toLocaleString() }} $</span>
          </div>
          <router-link to="/checkout" class="mt-4 w-full block text-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition shadow-md">
            Ба пардохт
          </router-link>
      </div>
    </div>
  </div>
</template>