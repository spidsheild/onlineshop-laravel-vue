<script setup>
import { computed } from 'vue'
// import { useCartStore3 } from '@/stores/cart'
import { useCartStore3 } from '../stores/cart'
const cart = useCartStore3()
// const props = defineProps({ item: Object })
// const { item } = defineProps({ item: Object })

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
        <!-- <pre>{{ item }}</pre> -->
        <!-- <h3 class="font-semibold">{{ item.name }}</h3> -->
        <!-- <h3 class="font-semibold">{{ item.product.title }}</h3> -->
        <h3 class="font-semibold">{{ item?.product.title }}</h3>

        <p class="text-sm text-gray-500">
            قیمت واحد: {{ item?.product.price.toLocaleString() }} تومان
            <!-- قیمت واحد: {{ price.toLocaleString() }} تومان -->
            <!-- {{ item?.price ? Number(item.price).toLocaleString() : 0 }} تومان -->
            <!-- {{ Number(item.product.price).toLocaleString() }} تومان -->
            <!-- {{ price.toLocaleString() }} تومان -->
        </p>

        <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2">
                <!-- <button @click="cart.decrease(item.id)" class="px-2 border">−</button> -->
                <!-- <button @click="cart.decrease(item?.product.id)" class="px-2 border">−</button> -->
                <button @click="cart.updateQuantity(item.product.id, item.quantity - 1)" class="px-2 border">−</button>
                <!-- <span>{{ item.quantity }}</span> -->
                <span>{{ item?.quantity }}</span>
                <!-- <input type="number" v-model="item.quantity" class="w-16 border rounded text-center" /> -->
                <!-- <button @click="cart.increase(item.id)" class="px-2 border">+</button> -->
                <!-- <button @click="cart.increase(item?.product.id)" class="px-2 border">+</button> -->
                <button @click="cart.updateQuantity(item.product.id, item.quantity + 1)" class="px-2 border">+</button>
                <p><button @click="cart.removeFromCart(item.product.id)" class="px-2 border">ҳазф</button></p>
            </div>



            <!-- <div class="flex items-center gap-2 mt-2">
                <button @click="cart.updateQuantity(item.product?.id, item?.quantity - 1)">-</button>
                <p>{{ item?.product.id }}</p>

                <input type="number" v-model="item?.quantity" class="w-16 border rounded text-center" />

                <button @click="cart.updateQuantity(item?.product.id, item?.quantity + 1)">+</button>
            </div> -->



            <strong>
                <!-- {{ (item?.price * item?.quantity).toLocaleString() }} تومان -->
                <!-- {{ total.toLocaleString() }} تومان -->
                <!-- {{ (item?.price ?? 0) * (item?.quantity ?? 1) }} تومان -->
                {{ total }} تومان
                <!-- {{ cart.totalPriceStore }} -->
                <!-- {{ cart.totalPrice }} -->
            </strong>
        </div>
    </div>
</template>



<!-- 2️⃣ بهبود تمیزتر (Computed – پیشنهاد حرفه‌ای) -->
<!-- <script setup>
import { computed } from 'vue'
import { useCartStore3 } from '@/stores/cart'

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cart = useCartStore3()

const price = computed(() => Number(item.product.price))
const total = computed(() => price.value * item.quantity)
</script> -->







<!-- ✅ راه‌حل درست (اصولی)/ -->
<!-- CartItem.vue (اصلاح template) -->
<!-- <template>
  <div class="border rounded p-3">
    <h3 class="font-semibold">
      {{ item.product.title }}
    </h3>

    <p class="text-sm text-gray-500">
      قیمت واحد:
      {{ Number(item.product.price).toLocaleString() }} تومان
    </p>

    <div class="flex items-center justify-between mt-2">
      <div class="flex items-center gap-2">
        <button
          @click="cart.decrease(item.product.id)"
          class="px-2 border"
        >
          −
        </button>

        <span>{{ item.quantity }}</span>

        <button
          @click="cart.increase(item.product.id)"
          class="px-2 border"
        >
          +
        </button>
      </div>

      <strong>
        {{
          (Number(item.product.price) * item.quantity).toLocaleString()
        }}
        تومان
      </strong>
    </div>
  </div>
</template> -->


<!-- 3️⃣ اگر دوست داری کدت حرفه‌ای‌تر شود 👇
گزینه بهتر: ساختار item را ساده‌تر کن (در store) -->

<!-- به جای این: -->
<!-- {
  product: {...},
  quantity: 1
} -->
<!-- می‌توانی این را ذخیره کنی: -->
<!-- {
  id: product.id,
  title: product.title,
  price: Number(product.price),
  quantity: 1
} -->
