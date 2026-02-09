import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'



// Нусхаи ниҳоии Store (Setup Store + LocalStorage)
// stores/cart.store.js


const STORAGE_KEY = 'cart_items'

export const useCartStore3 = defineStore('cartc', () => {

    /* =======================
       STATE
    ======================= */
    const isOpen = ref(false)

    const itemsStore = ref(
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    )
    // itemsStore = [{ product, quantity }]

    /* =======================
       GETTERS
    ======================= */
    const totalPriceStore = computed(() =>
        itemsStore.value.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        )
    )

    const totalItems = computed(() =>
        itemsStore.value.reduce((sum, item) => sum + item.quantity, 0)
    )

    /* =======================
       ACTIONS
    ======================= */
    const toggleCart = () => {
        isOpen.value = !isOpen.value
    }

    const closeCart = () => {
        isOpen.value = false
    }

    const addToCart = (product, quantity = 1) => {
        const existing = itemsStore.value.find(
            i => i.product.id === product.id
        )

        if (existing) {
            existing.quantity += quantity
        } else {
            itemsStore.value.push({
                product,
                quantity
            })
        }
    }

    const increase = (productId) => {
        const item = itemsStore.value.find(
            i => i.product.id === productId
        )
        if (item) item.quantity++
    }

    const decrease = (productId) => {
        const item = itemsStore.value.find(
            i => i.product.id === productId
        )
        if (!item) return

        if (item.quantity > 1) {
            item.quantity--
        } else {
            removeFromCart(productId)
        }
    }

    const updateQuantity = (productId, quantity) => {
        const item = itemsStore.value.find(
            i => i.product.id === productId
        )

        if (!item) return

        if (quantity > 0) {
            item.quantity = quantity
        } else {
            removeFromCart(productId)
        }
    }

    const removeFromCart = (productId) => {
        itemsStore.value = itemsStore.value.filter(
            i => i.product.id !== productId
        )
    }

    const clearCart = () => {
        itemsStore.value = []
    }

    /* =======================
       LOCAL STORAGE SYNC
    ======================= */
    watch(
        itemsStore,
        (val) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
        },
        { deep: true }
    )

    return {
        // state
        isOpen,
        itemsStore,

        // getters
        totalPriceStore,
        totalItems,

        // actions
        toggleCart,
        closeCart,
        addToCart,
        increase,
        decrease,
        updateQuantity,
        removeFromCart,
        clearCart
    }
})
