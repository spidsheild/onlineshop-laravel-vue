<template>
  <header class="w-full border-b bg-white sticky top-0 z-50">
    <!-- Top Bar -->
    <div class="hidden md:flex justify-between items-center px-6 py-2 text-sm text-gray-600 bg-gray-50">
      <span>Ирсоли ройгон барои харидҳои болои 500 сомонӣ</span>
      <div class="flex items-center gap-4">
      
        <RouterLink v-if="auth.isAuthenticated" to="/dashboard"
  class="inline-flex items-center px-2 py-1 bg-green-500 text-white border border-green-600  rounded-lg
    font-medium  transition  hover:bg-green-600 hover:border-green-700 hover:text-white">
  панели идоракунӣ
</RouterLink>
         <RouterLink v-else to="/auth"
  class="inline-flex items-center px-2 py-1 bg-red-500 text-white border border-red-600  rounded-lg
    font-medium  transition  hover:bg-red-600 hover:border-red-700 hover:text-white">
  Воридшавӣ / Сабти ном
</RouterLink>

        <!-- Language -->
        <select class="bg-transparent focus:outline-none cursor-pointer">
          <option>TJ</option>
          <option>EN</option>
        </select>
      </div>
    </div>

    <!-- Main Header -->
    <div class="flex items-center justify-between px-4 md:px-6 py-4 gap-4">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <button class="md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          ☰
        </button>
        <span class="text-2xl font-bold text-primary"><a href="/">ShopLogo</a></span>
      </div>

      <!-- Search -->
      <div class="hidden md:flex flex-1 max-w-xl">
        <input type="text" placeholder="Ҷустуҷӯи маҳсулот..."
          class="w-full rounded-r-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-primary" />
        <button class="bg-primary text-white px-5 rounded-l-lg">
          Ҷустуҷӯ
        </button>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <router-link to="/favorites" custom v-slot="{ navigate, href }">
          <a :href="href" target="_blank" @click="navigate">
            ❤️
          </a>
        </router-link>

        <button @click="cart.toggleCart()" class="relative">
          🛒
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ cart.totalPriceStore }}
          </span>
        </button>

<router-link to="/dashboard" custom v-slot="{ navigate, href }">
  <a :href="href" target="_blank" @click="navigate">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      :class="auth.isAuthenticated ? 'text-green-500' : 'text-gray-400'"
    >
      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
    </svg>
  </a>
  
</router-link>
      </div>
    </div>

    <nav class="hidden md:flex justify-center gap-6 px-6 py-3 border-t text-sm">
  <template v-for="item in menu" :key="item.label">

    <!-- Scroll -->
    <a
      v-if="item.type === 'scroll'"
      :href="item.target"
      class="transition-colors hover:text-primary"
      :class="store === item.target.slice(1)
        ? 'font-bold text-primary'
        : 'text-gray-600'"
    >
      {{ item.label }}
    </a>

    <!-- External -->
    <a
      v-else-if="item.type === 'external'"
      :href="item.href"
      target="_blank"
      rel="noopener"
      class="text-gray-600 hover:text-primary"
    >
      {{ item.label }}
    </a>

    <!-- Route -->
    <RouterLink
      v-else-if="item.type === 'route'"
      :to="item.to"
      class="text-gray-600 hover:text-primary"
    >
      {{ item.label }}
    </RouterLink>

  </template>
</nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
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

.text-primary {
  color: var(--color-primary);
}

.bg-primary {
  background-color: var(--color-primary);
}

section {
  scroll-margin-top: 120px;
}
</style>

