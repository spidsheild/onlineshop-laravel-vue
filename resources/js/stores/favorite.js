import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/apiClient'
import { useAuthStore } from '@/stores/auth'



export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref([])
  const loaded = ref(false)

  /**
   * ❤️ Гирифтани рӯйхати писандидаҳо
   */
  const fetchFavorites = async () => {
    const auth = useAuthStore()

    // ❌ Меҳмон → ҳеҷ кор накун
    if (!auth.isAuthenticated) {
      favorites.value = []
      loaded.value = true
      return
    }

    // ⛔ Пешгирӣ аз дархости такрорӣ
    if (loaded.value) return

    try {
      const { data } = await api.get('/favorites')
      favorites.value = data
    } catch (error) {
      // 🔕 401-ро бесадо ҳал кун
      if (error.response?.status !== 401) {
        console.error(error)
      }
    } finally {
      loaded.value = true
    }
  }

  /**
   * 🔄 Илова / ҳазфи писандида
   */
  const toggleFavorite = async (product) => {
    const auth = useAuthStore()

    // ❌ Меҳмон → фирист ба воридшавӣ
    if (!auth.isAuthenticated) {
      auth.logout() // یا router.push('/login')
      return
    }

    const exists = favorites.value.some(p => p.id === product.id)

    // 🔥 Optimistic UI
    if (exists) {
      favorites.value = favorites.value.filter(p => p.id !== product.id)
    } else {
      favorites.value.push(product)
    }

    try {
      await api.post(`/favorites/${product.id}/toggle`)
    } catch (error) {
      // 🔙 Rollback
      if (exists) {
        favorites.value.push(product)
      } else {
        favorites.value = favorites.value.filter(p => p.id !== product.id)
      }
    }
  }

  const isFavorited = (productId) => {
    return favorites.value.some(p => p.id === productId)
  }

  /**
   * 🧹 Тозакунӣ (масалан баъди logout)
   */
  const reset = () => {
    favorites.value = []
    loaded.value = false
  }

  return {
    favorites,
    fetchFavorites,
    toggleFavorite,
    isFavorited,
    reset,
  }
})
