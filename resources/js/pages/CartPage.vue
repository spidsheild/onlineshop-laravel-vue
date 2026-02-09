<script setup>
import { useCartStore3 } from '@/stores/cart'
import { RouterLink } from 'vue-router';

const cart = useCartStore3()
</script>

<template>
    <div class="bg-gray-100 min-h-screen py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            <div class="flex flex-col items-center text-center mb-8">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Сабади харид</h1>
            </div>

            <div v-if="!cart.itemsStore.length" class="text-center bg-white p-12 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold text-gray-700">Сабади хариди шумо холӣ аст</h2>
                <p class="text-gray-500 mt-2">Барои илова кардани маҳсулот ба мағоза равед.</p>
                <router-link to="/products"
                    class="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Дидани маҳсулот
                </router-link>
            </div>

            <div v-else class="bg-white rounded-lg shadow-md">
                <!-- Cart Items -->
                <div class="p-6 space-y-6">
                    <div v-for="item in cart.itemsStore" :key="item.product.id"
                        class="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-6 last:border-b-0">
                        <div class="flex items-center gap-4 w-full sm:w-auto">
                            <img :src="`/storage/${item.product.image}`" class="w-20 h-20 object-cover rounded-md"
                                :alt="item.product.title" />
                            <div class="flex-grow">
                                <h3 class="font-semibold text-gray-800">{{ item.product.title }}</h3>
                                <p class="text-sm text-gray-500">{{ item.product.price.toLocaleString() }} $</p>
                            </div>
                        </div>

                        <div class="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                            <!-- Quantity Controls -->
                            <div class="flex items-center gap-2">
                                <button @click="cart.updateQuantity(item.product.id, item.quantity - 1)"
                                    class="px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors" :disabled="item.quantity <= 1">－</button>
                                <span class="font-bold text-lg w-8 text-center">{{ item?.quantity }}</span>
                                <button @click="cart.updateQuantity(item.product.id, item.quantity + 1)"
                                    class="px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors">+</button>
                            </div>

                            <!-- Total Price for Item -->
                            <span class="font-bold w-24 text-right">{{ (item.quantity * item.product.price).toLocaleString()
                            }} $</span>

                            <!-- Remove Button -->
                            <button @click="cart.removeFromCart(item.product.id)"
                                class="text-red-500 hover:text-red-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Cart Summary -->
                <div class="bg-gray-50 p-6 rounded-b-lg">
                    <div class="flex justify-between items-center mb-6">
                        <span class="text-lg font-semibold text-gray-800">Маҷмӯи ниҳоӣ:</span>
                        <span class="text-2xl font-bold text-gray-900">{{ cart.totalPriceStore.toLocaleString() }} $</span>
                    </div>

                    <div class="flex flex-col sm:flex-row justify-end items-center gap-4">
                        <router-link to="/products"
                            class="w-full sm:w-auto text-center rounded-lg bg-gray-200 px-6 py-3 text-gray-800 font-semibold hover:bg-gray-300 transition">
                            Идомаи харид
                        </router-link>
                        <router-link to="/checkout"
                            class="w-full sm:w-auto text-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition shadow-md">
                            Ба пардохт
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>