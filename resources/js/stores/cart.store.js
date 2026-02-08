import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // { product, quantity }
  }),

  getters: {
    totalPrice: (state) =>
      state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
  },

  actions: {
    addToCart(product, quantity) {
      const existing = this.items.find(i => i.product.id === product.id)

      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(i => i.product.id === productId)
      if (item && quantity > 0) item.quantity = quantity
    },

    removeFromCart(productId) {
      this.items = this.items.filter(i => i.product.id !== productId)
    },
  },
})
