
import { createRouter, createWebHistory } from 'vue-router'
import { useCartStore3 } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { routes } from './routes'




const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to) => {
  const auth = useAuthStore()

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const guestOnly = to.matched.some(r => r.meta.guest)
  const isLoggedIn = auth.isAuthenticated

  // 🔒 Танҳо route-ҳои муҳофизатшуда
  if (requiresAuth && !isLoggedIn) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  // 🚫 Танҳо меҳмон
  if (guestOnly && isLoggedIn) {
    return { name: 'dashboard' }
  }

  // 🔍 Танҳо барои route муҳофизатшуда
  if (requiresAuth && isLoggedIn && !auth.user) {
    try {
      await auth.fetchUser()
    } catch {
      return { name: 'login' }
    }
  }

  return true
})


export default router
