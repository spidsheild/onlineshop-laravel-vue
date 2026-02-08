<script setup>
import { ref, onMounted } from 'vue'
// import { useCartStore } from '@/stores/cart.stoe'
// import { useCartStore } from '../../stores/cart.store'

import { useCartStore3 } from '@/stores/cart'
import { useFavoriteStore } from '@/stores/favorite'
import { useAuthStore } from '@/stores/auth'
const cartStore = useCartStore3()
const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()

const products = ref([])
const quantity = ref(1)
const hover = ref(false)
const showMessage = ref(false)

// const apiUrl = import.meta.env.VITE_API_URL


const props = defineProps({
    product: Object,
})
// const props = defineProps({
//     product: {
//         type: Object,
//         default: () => ({
//             description: '',
//             image: '',
//             title: '',
//             price: 0,
//             id: null
//         })
//     }
// })


// const toggle = () => {
//     favoriteStore.toggleFavorite(props.product.id)
// }



const toggle = () => {
    // if (!authStore.isLoggedIn) {
    if (!authStore.isAuthenticated) {
        // isAuthenticated
        showMessage.value = true

        setTimeout(() => {
            showMessage.value = false
        }, 3000)

        return
    }

    favoriteStore.toggleFavorite(props.product.id)
}


// onMounted(() => {
//   favoriteStore.fetchFavorites()
// })


// const shortDescription = computed(() =>
//     props.product.description.slice(0, 60) + '...'
// )
</script>

<template>
    <div class="relative bg-white rounded-xl shadow hover:shadow-lg transition p-4" @mouseenter="hover = true"
        @mouseleave="hover = false">
        <!-- :src="product.image" -->
        <img :src="`/storage/${product.image}`" class="w-full h-48 object-cover rounded-lg" />
        <!-- <img :src="`${import.meta.env.VITE_API_URL}/storage/${product.image}`" /> -->
        <!-- <img :src="`${apiUrl}/storage/${product.image}`" class="w-full h-48 object-cover rounded-lg"/> -->
        <!-- <img :src="product.image" /> -->
        <!-- <img
  v-if="product.image"
  :src="`${apiUrl}/storage/${product.image}`"
  class="w-full h-48 object-cover rounded-lg"
/> -->

        <!-- <img :src="`${import.meta.env.VITE_API_URL}/storage/${product.image}`" class="w-full h-48 object-cover rounded-lg"> -->
        <!-- <img v-if="product?.image" :src="`/storage/${product.image}`" /> -->
        <!-- <p>{{ product }}</p> -->
        <h3 class="mt-3 font-semibold text-lg">
            <!-- {{ product.name }} -->
            {{ product.title }}
        </h3>

        <p class="text-sm text-gray-500">
            {{ hover ? product.description : product.description.slice(0, 60) + '...' }}
        </p>
        <!-- <p class="text-sm text-gray-500">
            {{
                hover
                    ? product?.description
                    : (product?.description ?? '').slice(0, 60) + '...'
            }}
        </p> -->

        <p class="text-sm text-gray-500">
            <!-- {{ hover ? product.description : shortDescription }} -->
        </p>
        <div class="mt-3 flex justify-between items-center">
            <span class="font-bold text-primary ml-2">
                {{ product.price }} $
            </span>

            <div class="flex gap-2">
                <input type="number" min="1" v-model="quantity" class="w-14 border rounded text-center" />

                <button @click="cartStore.addToCart(product, quantity)" class="bg-primary text-white px-3 py-1 rounded">
                    افزودن
                </button>

            </div>
            <div>
                <!-- <button @click="toggle" class=" top-3 left-3 text-4xl transition transform hover:scale-110" :class="favoriteStore.isFavorited(product.id)
                    ? 'text-red-500'
                    : 'text-gray-300'">
                    ♥
                </button> -->
            </div>

            <div>
                <!-- <button @click="toggle" :disabled="!authStore.isAuthenticated"
                    class="text-4xl transition transform relative" :class="[
                        favoriteStore.isFavorited(product.id)
                            ? 'text-red-500'
                            : 'text-gray-500 hover:text-red-400',

                        !authStore.isAuthenticated
                            ? 'opacity-40 cursor-not-allowed'
                            : 'hover:scale-110'
                    ]">
                    ♥
                </button> -->
                <button @click="favoriteStore.toggleFavorite(product)" :disabled="!authStore.isAuthenticated"
                    class="text-4xl transition transform relative" :class="[
                        favoriteStore.isFavorited(product.id)
                            ? 'text-red-500'
                            : 'text-gray-500 hover:text-red-400',

                        !authStore.isAuthenticated
                            ? 'opacity-40 cursor-not-allowed'
                            : 'hover:scale-110'
                    ]">
                    ♥
                </button>

            </div>
        </div>
        <div class="w-full h-12 mt-4 bg-primary rounded-lg">
            <RouterLink :to="{ name: 'product.show', params: { id: product.id } }"
                class="flex w-full h-full justify-center items-center">
                مشاهده محصول
            </RouterLink>

            <!-- <RouterLink v-if="product?.id" :to="{ name: 'product.show', params: { id: product.id } }">
                مشاهده محصول
            </RouterLink> -->

            <!-- <RouterLink :to="product?.id ? { name: 'product.show', params: { id: product.id } } : '#'"> مشاهده محصول</RouterLink> -->

            <!-- <RouterLink :to="{ name: 'SingleProduct', params: { id: product.id } }"
                class="flex w-full h-full justify-center items-center">
                مشاهده محصول
            </RouterLink> -->
        </div>
        <div class="relative">
            <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-300 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="showMessage"
                    class="absolute -top-12 right-0 bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg">
                    برای پسندیدن باید وارد حساب کاربری شوید
                </div>
            </transition>
        </div>
    </div>
</template>


<!-- <script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFavoriteStore } from '@/stores/favorite'

const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()

const showMessage = ref(false)

const toggle = () => {
  if (!authStore.isLoggedIn) {
    showMessage.value = true

    setTimeout(() => {
      showMessage.value = false
    }, 3000)

    return
  }

  favoriteStore.toggleFavorite(product.id)
}
</script> -->







<!-- <script setup>
import { useFavoriteStore } from '@/stores/favorite'

const props = defineProps({
  product: Object
})

const favoriteStore = useFavoriteStore()

const toggle = () => {
  favoriteStore.toggleFavorite(props.product.id)
}
</script>

<template>
  <div class="border rounded-xl p-4 relative">
    <img :src="product.image" class="w-full h-40 object-cover rounded" />

    <h3 class="mt-2 font-bold">{{ product.title }}</h3>
    <p class="text-gray-500">{{ product.price }} تومان</p>

    <button
      @click="toggle"
      class="absolute top-3 left-3 text-2xl"
      :class="favoriteStore.isFavorited(product.id)
        ? 'text-red-500'
        : 'text-gray-300'"
    >
      ♥
    </button>
  </div>
</template> -->