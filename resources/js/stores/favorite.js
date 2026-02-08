import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/apiClient'
import { useAuthStore } from '@/stores/auth'



export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref([])
  const loaded = ref(false)

  /**
   * ❤️ گرفتن لیست علاقه‌مندی‌ها
   */
  const fetchFavorites = async () => {
    const auth = useAuthStore()

    // ❌ مهمان → هیچ کاری نکن
    if (!auth.isAuthenticated) {
      favorites.value = []
      loaded.value = true
      return
    }

    // ⛔ جلوگیری از درخواست تکراری
    if (loaded.value) return

    try {
      const { data } = await api.get('/favorites')
      favorites.value = data
    } catch (error) {
      // 🔕 401 را بی‌صدا هندل کن
      if (error.response?.status !== 401) {
        console.error(error)
      }
    } finally {
      loaded.value = true
    }
  }

  /**
   * 🔄 افزودن / حذف علاقه‌مندی
   */
  const toggleFavorite = async (product) => {
    const auth = useAuthStore()

    // ❌ مهمان → بفرست به لاگین
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
   * 🧹 پاک‌سازی (مثلاً بعد logout)
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
















// 1️⃣ اصلاح favorite.js (مهم‌ترین بخش)
// نسخه‌ی نهایی و تمیز 👇

// export const useFavoriteStore = defineStore('favorite', () => {
//   const favorites = ref([])
//   const loaded = ref(false)

//   const fetchFavorites = async () => {
//     if (loaded.value) return

//     const { data } = await api.get('/favorites')
//     favorites.value = data
//     loaded.value = true
//   }

//   const toggleFavorite = async (product) => {
//     const exists = favorites.value.some(p => p.id === product.id)

//     // 🔥 Optimistic Update
//     if (exists) {
//       favorites.value = favorites.value.filter(p => p.id !== product.id)
//     } else {
//       favorites.value.push(product)
//     }

//     try {
//       await api.post(`/favorites/${product.id}/toggle`)
//     } catch (error) {
//       // ❌ Rollback در صورت خطا
//       if (exists) {
//         favorites.value.push(product)
//       } else {
//         favorites.value = favorites.value.filter(p => p.id !== product.id)
//       }
//     }
//   }

//   const isFavorited = (productId) => {
//     return favorites.value.some(p => p.id === productId)
//   }

//   return {
//     favorites,
//     fetchFavorites,
//     toggleFavorite,
//     isFavorited
//   }
// })






// راه‌حل تمیز و استاندارد (پیشنهادی ✅)
// 1️⃣ اصلاح Store (favorite.js)

// یک فلگ اضافه می‌کنیم تا فقط یک‌بار favorites لود بشه:

// export const useFavoriteStore = defineStore('favorite', () => {
//   const favorites = ref([])
//   const loaded = ref(false)

//   const fetchFavorites = async () => {
//     if (loaded.value) return

//     const { data } = await api.get('/favorites')
//     favorites.value = data
//     loaded.value = true
//   }

//   const toggleFavorite = async (productId) => {
//     const { data } = await api.post(`/favorites/${productId}/toggle`)

//     if (data.favorited) {
//       await fetchFavorites()
//     } else {
//       favorites.value = favorites.value.filter(
//         p => p.id !== productId
//       )
//     }
//   }

//   const isFavorited = (productId) => {
//     return favorites.value.some(p => p.id === productId)
//   }

//   return {
//     favorites,
//     fetchFavorites,
//     toggleFavorite,
//     isFavorited
//   }
// })







// export const useFavoriteStore = defineStore('favorite', () => {
//   const favorites = ref([])

//   const fetchFavorites = async () => {
//     const { data } = await api.get('/favorites')
//     favorites.value = data
//   }

//   const toggleFavorite = async (productId) => {
//     const { data } = await api.post(`/favorites/${productId}/toggle`)

//     if (data.favorited) {
//       await fetchFavorites()
//     } else {
//       favorites.value = favorites.value.filter(
//         p => p.id !== productId
//       )
//     }
//   }

//   const isFavorited = (productId) => {
//     return favorites.value.some(p => p.id === productId)
//   }

//   return {
//     favorites,
//     fetchFavorites,
//     toggleFavorite,
//     isFavorited
//   }
// })
