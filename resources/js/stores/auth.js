import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/apiClient'
import router from '@/router'


// ✅ Нусхаи ниҳоии Auth Store (созгор бо Guard ҳирфаӣ)
export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token'))
    const loading = ref(false)
    const errors = ref(null)

    /**
     * ✅ Танҳо манбаи ҳақиқат
     */
    const isAuthenticated = computed(() => !!token.value)

    /**
     * 🔄 Гирифтани маълумоти корбар
     */
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/user')
        user.value = data
      } catch (e) {
        logout()
        throw e
      }
    }

    /**
     * 🔐 login
     */
    const login = async (payload) => {
      loading.value = true
      errors.value = null

      try {
        const { data } = await api.post('/login', payload)

        token.value = data.token
        user.value = data.user

        localStorage.setItem('token', data.token)
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`

        return true
      } catch (e) {
        errors.value = e.response?.data?.errors || 'Login failed'
        return false
      } finally {
        loading.value = false
      }
    }

    /**
     * 📝 register
     */
    const register = async (payload) => {
      loading.value = true
      errors.value = null

      try {
        const { data } = await api.post('/register', payload)

        token.value = data.token
        user.value = data.user

        localStorage.setItem('token', data.token)
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`

        return true
      } catch (e) {
        errors.value = e.response?.data?.errors || 'Register failed'
        return false
      } finally {
        loading.value = false
      }
    }

    /**
     * 🚪 logout
     */
    const logout = async () => {
      try {
        await api.post('/logout')
      } catch (_) {}

      token.value = null
      user.value = null

      localStorage.removeItem('token')
      delete api.defaults.headers.common.Authorization

      router.push({ name: 'login' })
    }

    return {
      user,
      token,
      loading,
      errors,
      isAuthenticated,
      fetchUser,
      login,
      register,
      logout,
    }
  },
  {
    persist: {
      paths: ['token'],
    },
  }
)
