<!-- <script setup>
import { useRoute, useRouter } from 'vue-router'
import { useCartStore3 } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cart = useCartStore3()

const status = route.query.status

if (status === 'success') {
  cart.clearCart()
}
</script> -->

<!-- <template>
  <div class="max-w-xl mx-auto p-10 text-center">
    <div v-if="status === 'success'">
      <h1 class="text-3xl font-bold text-green-600 mb-4">
        پرداخت با موفقیت انجام شد ✅
      </h1>
      <p class="text-gray-600 mb-6">
        سفارش شما با موفقیت ثبت شد.
      </p>
    </div>

    <div v-else>
      <h1 class="text-3xl font-bold text-red-600 mb-4">
        پرداخت ناموفق ❌
      </h1>
      <p class="text-gray-600 mb-6">
        مشکلی در فرآیند پرداخت رخ داده است.
      </p>
    </div>

    <button
      @click="router.push('/')"
      class="px-6 py-2 bg-gray-800 text-white rounded"
    >
      بازگشت به فروشگاه
    </button>
  </div>
</template> -->


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
    <!-- موفق -->
    <div v-if="status === 'success'">
      <h1 class="text-3xl font-bold text-green-600 mb-4">
        پرداخت با موفقیت انجام شد ✅
      </h1>
      <p class="text-gray-600 mb-6">
        سفارش شما با موفقیت ثبت شد.
      </p>
    </div>

    <!-- خطا -->
    <div v-else>
      <h1 class="text-3xl font-bold text-red-600 mb-4">
        پرداخت ناموفق ❌
      </h1>

      <p class="text-gray-700 mb-4">
        {{ message || 'مشکلی در فرآیند پرداخت رخ داده است.' }}
      </p>

      <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
        اگر پرداخت با PayPal انجام نشد، لطفاً از روش پرداخت دیگری استفاده کنید.
      </div>
    </div>

    <div v-if="status === 'cancel'">
  <h1 class="text-3xl font-bold text-yellow-600 mb-4">
    پرداخت لغو شد ⚠️
  </h1>
  <p class="text-gray-600">
    پرداخت توسط شما لغو شد و مبلغی کسر نشده است.
  </p>
</div>

    <button
      @click="router.push('/')"
      class="mt-6 px-6 py-2 bg-gray-800 text-white rounded"
    >
      بازگشت به فروشگاه
    </button>
  </div>
</template>
