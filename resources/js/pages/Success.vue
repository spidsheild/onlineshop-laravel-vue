
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore3 } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cart = useCartStore3()

const status = computed(() => route.query.status)
const message = computed(() => route.query.message)

if (status.value === 'success') {
  cart.clearCart()
}
</script>


<template>
  <div class="max-w-xl mx-auto p-10 text-center">
    <!-- Муваффақ -->
    <div v-if="status === 'success'">
      <h1 class="text-3xl font-bold text-green-600 mb-4">
        Пардохт бо муваффақият иҷро шуд ✅
      </h1>
      <p class="text-gray-600 mb-6">
        Фармоиши шумо бо муваффақият сабт шуд.
      </p>
    </div>

    <!-- Хато -->
    <div v-else>
      <h1 class="text-3xl font-bold text-red-600 mb-4">
        Пардохти номуваффақ ❌
      </h1>

      <p class="text-gray-700 mb-4">
        {{ message || 'Мушкиле дар раванди пардохт рух додааст.' }}
      </p>

      <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
        Агар пардохт бо PayPal иҷро нашуд, лутфан аз усули дигари пардохт истифода баред.
      </div>
    </div>

    <div v-if="status === 'cancel'">
  <h1 class="text-3xl font-bold text-yellow-600 mb-4">
    Пардохт лағв шуд ⚠️
  </h1>
  <p class="text-gray-600">
    Пардохт аз ҷониби шумо лағв шуд ва маблағе ситонида нашудааст.
  </p>
</div>

    <button
      @click="router.push('/')"
      class="mt-6 px-6 py-2 bg-gray-800 text-white rounded"
    >
      Бозгашт ба мағоза
    </button>
  </div>
</template>
