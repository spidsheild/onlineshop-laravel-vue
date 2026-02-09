<script setup>
import { ref, onMounted } from 'vue'
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



const props = defineProps({
    product: Object,
})

const toggle = () => {
    if (!authStore.isAuthenticated) {
        showMessage.value = true

        setTimeout(() => {
            showMessage.value = false
        }, 3000)

        return
    }

    favoriteStore.toggleFavorite(props.product.id)
}

</script>

<template>
    <div class="relative bg-white rounded-xl shadow hover:shadow-lg transition p-4" @mouseenter="hover = true"
        @mouseleave="hover = false">
        <img :src="`/storage/${product.image}`" class="w-full h-48 object-cover rounded-lg" />
        <h3 class="mt-3 font-semibold text-lg">
            {{ product.title }}
        </h3>

        <p class="text-sm text-gray-500">
            {{ hover ? product.description : product.description.slice(0, 60) + '...' }}
        </p>

        <p class="text-sm text-gray-500">
        </p>
        <div class="mt-3 flex justify-between items-center">
            <span class="font-bold text-primary ml-2">
                {{ product.price }} $
            </span>

            <div class="flex gap-2">
                <input type="number" min="1" v-model="quantity" class="w-14 border rounded text-center" />

                <button @click="cartStore.addToCart(product, quantity)" class="bg-primary text-white px-3 py-1 rounded">
                    Илова кардан
                </button>

            </div>
            <div>
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
                Мушоҳидаи маҳсулот
            </RouterLink>
        </div>
        <div class="relative">
            <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-300 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="showMessage"
                    class="absolute -top-12 right-0 bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg">
                    Барои писандидан бояд вориди ҳисоби корбарӣ шавед
                </div>
            </transition>
        </div>
    </div>
</template>