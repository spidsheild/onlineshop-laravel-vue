<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useCartStore3 } from '@/stores/cart'

const route = useRoute()
const store = useProductStore()
const cartStore = useCartStore3()

const commentForm = reactive({
    name: '',
    body: ''
})


const productId = computed(() => Number(route.params.id))

const cartItem = computed(() => {
    return cartStore.itemsStore.find(
        i => i.product.id === productId.value
    )
})

const displayQuantity = computed(() => {
    return cartItem.value ? cartItem.value.quantity : 0
})

const increase = () => {
    if (cartItem.value) {
        cartStore.updateQuantity(
            productId.value,
            cartItem.value.quantity + 1
        )
    } else {
        cartStore.addToCart(store.product, 1)
    }
}

const decrease = () => {
    if (!cartItem.value) return

    cartStore.updateQuantity(
        productId.value,
        cartItem.value.quantity - 1
    )
}

const remove = () => {
    if (!cartItem.value) return

    cartStore.removeFromCart(productId.value)
}


watch(
    () => route.params.id,
    async (newId) => {
        store.product = null
        store.comments = []
        await store.getProduct(newId)
        await store.getComments(newId)
    },
    { immediate: true }
)
// ⛔ و onMounted رو حذف کن
// این روش کاملاً استاندارد Vue Router ـه.


const submitComment = async () => {
    await store.addComment(route.params.id, commentForm)
    commentForm.name = ''
    commentForm.body = ''
}

</script>


<template>
    <div>
        <!-- لودینگ -->
        <div v-if="store.loading" class="text-center py-20">
            در حال بارگذاری...
            <div class="flex justify-center items-center py-20">
                <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>

        </div>
        <div v-if="store.product" class="max-w-6xl mx-auto p-6">
            <!-- بالا -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- عکس -->
                <div>
                    <img :src="`/storage/${store.product?.image}`" class="w-full h-48 object-cover rounded-lg" />
                </div>

                <!-- مشخصات -->
                <div class="space-y-4">
                    <h1 class="text-2xl font-bold">
                        {{ store.product?.title }}
                    </h1>

                    <p class="text-gray-600">
                        {{ store.product?.short_description }}
                    </p>

                    <p class="text-xl font-semibold text-green-600">
                        {{ store.product.price }} تومان
                    </p>

                    <div class="flex items-center gap-3 mt-4">
                        <button @click="decrease" class="px-3 py-1 border rounded">
                            −
                        </button>

                        <span class="font-bold text-lg w-6 text-center">
                            {{ displayQuantity }}
                        </span>

                        <button @click="increase" class="px-3 py-1 border rounded">
                            +
                        </button>
                    </div>

                </div>
            </div>

            <!-- توضیحات -->
            <div class="mt-12">
                <h2 class="text-xl font-bold mb-2">توضیحات محصول</h2>
                <p class="text-gray-700 leading-7">
                    {{ store.product?.description }}
                </p>
            </div>

            <!-- نظرات -->
            <div class="mt-12">
                <h2 class="text-xl font-bold mb-4">نظرات کاربران</h2>

                <!-- لیست -->
                <div v-if="store.comments && store.comments?.length">
                    <div v-for="comment in store.comments" :key="comment.id" class="border rounded p-4 mb-3">
                        <p class="font-semibold">{{ comment.name }}</p>
                        <p class="text-gray-600">{{ comment.body }}</p>
                    </div>
                </div>

                <!-- فرم -->
                <form @submit.prevent="submitComment" class="mt-6 space-y-3">
                    <input v-model="commentForm.name" placeholder="نام" class="w-full border rounded p-2" />
                    <textarea v-model="commentForm.body" placeholder="نظر شما" class="w-full border rounded p-2" />
                    <button class="bg-green-600 text-white px-4 py-2 rounded">
                        ارسال نظر
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
