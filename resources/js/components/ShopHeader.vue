<template>
  <header class="w-full border-b bg-white sticky top-0 z-50">
    <!-- Top Bar -->
    <div class="hidden md:flex justify-between items-center px-6 py-2 text-sm text-gray-600 bg-gray-50 border-b">
      <span>Ирсоли ройгон барои харидҳои болои 500 сомонӣ</span>
      <div class="flex items-center gap-4">
        <RouterLink v-if="auth.isAuthenticated" to="/dashboard"
          class="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700 transition hover:bg-gray-50">
          Панели идоракунӣ
        </RouterLink>
        <RouterLink v-else to="/auth"
          class="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md font-medium text-sm transition hover:bg-blue-700">
          Воридшавӣ / Сабти ном
        </RouterLink>
      </div>
    </div>

    <!-- Main Header -->
    <div class="flex items-center justify-between px-4 md:px-6 py-3 gap-4">
      <!-- Logo and Mobile Menu Toggle -->
      <div class="flex items-center gap-4">
        <button class="md:hidden text-gray-600" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <router-link to="/" class="text-2xl font-bold text-primary">ShopLogo</router-link>
      </div>

      <!-- Search Bar (Desktop) -->
      <div class="hidden md:flex flex-1 max-w-xl">
        <input type="text" placeholder="Ҷустуҷӯи маҳсулот..."
          class="w-full rounded-l-lg border-y border-l border-gray-300 px-4 py-2 focus:outline-none focus:border-primary" />
        <button class="bg-primary text-white px-5 rounded-r-lg">
          Ҷустуҷӯ
        </button>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <router-link to="/favorites" class="text-gray-600 hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </router-link>

        <button @click="cart.toggleCart()" class="relative text-gray-600 hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="cart.itemsStore.length > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ cart.itemsStore.length }}
          </span>
        </button>

        <router-link to="/dashboard" class="hidden sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"
              :class="auth.isAuthenticated ? 'text-green-500' : 'text-gray-400'">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
        </router-link>
      </div>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex justify-center gap-6 px-6 py-3 border-t text-sm">
      <template v-for="item in menu" :key="item.label">
        <component :is="item.type === 'scroll' ? 'a' : 'RouterLink'"
          :href="item.type === 'scroll' ? item.target : undefined"
          :to="item.type === 'route' ? item.to : undefined"
          :target="item.type === 'external' ? '_blank' : undefined"
          :rel="item.type === 'external' ? 'noopener' : undefined"
          class="transition-colors hover:text-primary"
          :class="item.type === 'scroll' && store.activeSection === item.target.slice(1) ? 'font-bold text-primary' : 'text-gray-600'">
          {{ item.label }}
        </component>
      </template>
    </nav>
    
    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div v-if="mobileMenuOpen" class="md:hidden border-t bg-white">
        <div class="p-4">
           <input type="text" placeholder="Ҷустуҷӯи маҳсулот..."
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-primary" />
        </div>
        <nav class="flex flex-col p-4 space-y-3">
          <template v-for="item in menu" :key="item.label">
             <component :is="item.type === 'scroll' ? 'a' : 'RouterLink'"
              @click="mobileMenuOpen = false"
              :href="item.type === 'scroll' ? item.target : undefined"
              :to="item.type === 'route' ? item.to : undefined"
              :target="item.type === 'external' ? '_blank' : undefined"
              :rel="item.type === 'external' ? 'noopener' : undefined"
              class="transition-colors hover:text-primary text-gray-600 py-1">
              {{ item.label }}
            </component>
          </template>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useCartStore3 } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useScrollSpyStore } from '@/stores/scrollSpy'
import { menu } from '@/config/menu'

const store = useScrollSpyStore()
const auth = useAuthStore()
const cart = useCartStore3()
const mobileMenuOpen = ref(false)

</script>

<style>
:root {
  --color-primary: #2563eb;
}
.text-primary { color: var(--color-primary); }
.bg-primary { background-color: var(--color-primary); }

/* Transitions for mobile menu */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
