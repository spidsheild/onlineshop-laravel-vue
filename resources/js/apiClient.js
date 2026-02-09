// ۱️⃣ Файли apiClient.js (барои API Laravel)
import axios from 'axios';
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

// Агар токен дорем → танзим кун
const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

/**
 * ✅ Response Interceptor ҳушманд
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const originalRequest = error.config

    // Танҳо агар:
    // 1️⃣ 401 бошад
    // 2️⃣ Корбар ворид шуда бошад
    // 3️⃣ Қаблан retry нашуда бошад
    if (
      status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true

      const auth = useAuthStore()

      // ❌ Меҳмон → ҳеҷ кор накун
      if (!auth.isAuthenticated) {
        return Promise.reject(error)
      }

      // ✅ Ворид шудааст → logout
      auth.logout()

      // ⛔ Ин push амалан дар logout иҷро мешавад
      // router.push({ name: 'login' })
    }

    return Promise.reject(error)
  }
)

export default api
