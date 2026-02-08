import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/apiClient'

export const useProductStore = defineStore('product', () => {
    const product = ref(null)
    const comments = ref([])
    const loading = ref(false)

    const getProduct = async (id) => {
        loading.value = true
        product.value = null
        comments.value = []

        try {
            const res = await api.get(`/products/${id}`)
            product.value = res.data
        } finally {
            loading.value = false
        }
    }

    const getComments = async (id) => {
        try {
            const res = await api.get(`/products/${id}/comments`)
            comments.value = res.data?.data ?? []
        } catch (error) {
            comments.value = []
            console.error('getComments error:', error)
        }
    }

    const addComment = async (id, payload) => {
        await api.post(`/products/${id}/comments`, payload)
        await getComments(id)
    }

    return {
        product,
        comments,
        loading,
        getProduct,
        getComments,
        addComment
    }
})


export const useProductStore1 = defineStore('products', () => {
    const products = ref([])
    const categories = ref([])
    const loading = ref(false)

    const currentPage = ref(1)
    const lastPage = ref(1)

    const fetchProducts = async (categoryId = null, page = 1) => {
        loading.value = true

        const res = await api.get('/products', {
            params: {
                category_id: categoryId,
                page: page,
            },
        })

        products.value = res.data.products.data
        currentPage.value = res.data.products.current_page
        lastPage.value = res.data.products.last_page
        categories.value = res.data.categories

        loading.value = false
    }

    return {
        products,
        categories,
        loading,
        currentPage,
        lastPage,
        fetchProducts,
    }
})

