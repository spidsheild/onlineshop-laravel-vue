import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/apiClient'

export const useProductStore = defineStore('products', () => {
  // state
  const products = ref([])
  const loading = ref(false)

  // actions
  const fetchProducts = async () => {
    loading.value = true
    try {
      const { data } = await api.get('/topproducts')
      products.value = data

    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    fetchProducts,
  }
})


