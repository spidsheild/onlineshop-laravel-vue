<template>
  <header class="w-full border-b bg-white sticky top-0 z-50">
    <!-- <span class="fixed bottom-4 left-4 bg-black text-white p-2 text-xs">
      {{ activeSection }}
    </span> -->
    <!-- Top Bar -->
    <div class="hidden md:flex justify-between items-center px-6 py-2 text-sm text-gray-600 bg-gray-50">
      <span>ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
      <div class="flex items-center gap-4">
        <!-- <div> -->
        <!-- اگر لاگین کرده -->
        <!-- <RouterLink v-if="auth.isAuthenticated" to="/dashboard" class="hover:text-primary font-medium"> -->
        <!-- داشبورد -->
        <!-- </RouterLink> -->

        <!-- اگر لاگین نکرده -->
        <!-- <AuthLayout v-else />
        </div> -->
        <!-- <button class="hover:text-primary">ورود / ثبت‌نام</button> -->
        <!-- <select class="bg-transparent focus:outline-none">
          <option>TJ</option>
          <option>EN</option>
        </select> -->

        <!-- Auth -->
        <!-- <RouterLink v-if="auth.isAuthenticated" to="/dashboard" class="hover:text-primary font-medium transition">
          داشبورد
        </RouterLink> -->
        <RouterLink v-if="auth.isAuthenticated" to="/dashboard"
  class="inline-flex items-center px-2 py-1 bg-green-500 text-white border border-green-600  rounded-lg
    font-medium  transition  hover:bg-green-600 hover:border-green-700 hover:text-white">
  داشبورد
</RouterLink>

        <!-- <RouterLink v-else to="/auth" class="hover:text-primary transition">
          ورود / ثبت‌نام
        </RouterLink> -->

         <RouterLink v-else to="/auth"
  class="inline-flex items-center px-2 py-1 bg-red-500 text-white border border-red-600  rounded-lg
    font-medium  transition  hover:bg-red-600 hover:border-red-700 hover:text-white">
  ورود / ثبت‌نام
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
        <input type="text" placeholder="جستجوی محصول..."
          class="w-full rounded-r-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-primary" />
        <button class="bg-primary text-white px-5 rounded-l-lg">
          جستجو
        </button>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <!-- <button class="relative">
          ❤️
        </button> -->
        <!-- <router-link to="/favorites" class="btn">
          ❤️
        </router-link> -->

        <router-link to="/favorites" custom v-slot="{ navigate, href }">
          <a :href="href" target="_blank" @click="navigate">
            ❤️
          </a>
        </router-link>

        <button @click="cart.toggleCart()" class="relative">
          🛒
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            <!-- 3{{ cart.items.length }} -->
            {{ cart.totalPriceStore }}
          </span>
        </button>

        <!-- <button class="hidden md:block">
          👤
        </button> -->

        <!-- <router-link to="/dashboard" custom v-slot="{ navigate, href }">
          <a :href="href" target="_blank" @click="navigate">
            👤
          </a>
        </router-link> -->
        <!-- <router-link to="/dashboard" custom v-slot="{ navigate, href }">
          <a :href="href"  target="_blank"  @click="navigate"
    :class="auth.isAuthenticated ? 'bg-green-500' : ''">
    👤
  </a>
</router-link> -->

<!-- <router-link to="/dashboard" custom v-slot="{ navigate, href }">
  <a :href="href" target="_blank" @click="navigate">
    <span :class="auth.isAuthenticated ? 'text-green-500' : ''">
      👤
    </span>
    <span :class="auth.isAuthenticated ? 'text-green-500 transition hover:text-green-600' : ''">
  👤
</span>
<span :class="auth.isAuthenticated ? 'filter hue-rotate-90 saturate-200' : ''">
  👤
</span>
  </a>
</router-link> -->

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

    <!-- 2️⃣ منو (Tailwind + Vue) -->
    <!-- <nav class="fixed top-0 left-0 right-0 bg-white shadow flex gap-6 p-4">
      <a v-for="item in menu" :key="item.id" :href="`#${item.id}`" class="transition" :class="activeSection === item.id
        ? 'font-bold text-blue-600'
        : 'text-gray-500'">
        {{ item.label }}
      </a>
    </nav> -->

    <!-- <nav class="hidden md:flex justify-center gap-6 px-6 py-3 border-t text-sm">
      <a v-for="item in menu" :key="item.id" :href="`#${item.id}`" class="transition-colors hover:text-primary" :class="store.activeSection === item.id
        ? 'font-bold text-primary'
        : 'text-gray-600'">
        {{ item.label }}
      </a>
    </nav> -->

    <!-- <nav class="hidden md:flex justify-center gap-6 px-6 py-3 border-t text-sm">
      <template v-for="item in menu" :key="item.label"> -->

        <!-- اسکرول داخل صفحه -->
        <!-- <a v-if="item.type === 'scroll'" :href="item.target" class="transition-colors hover:text-primary" :class="store.activeSection === item.target.slice(1)
          ? 'font-bold text-primary'
          : 'text-gray-600'">
          {{ item.label }}
        </a> -->

        <!-- لینک خارجی -->
        <!-- <a v-else-if="item.type === 'external'" :href="item.href" target="_blank" rel="noopener"
          class="text-gray-600 hover:text-primary">
          {{ item.label }}
        </a> -->

        <!-- route داخلی -->
        <!-- <RouterLink v-else-if="item.type === 'route'" :to="item.to" class="text-gray-600 hover:text-primary">
          {{ item.label }}
        </RouterLink>

      </template>
    </nav> -->

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

   

    <!-- Navigation -->
    <!-- <nav class="hidden md:flex gap-6 px-6 py-3 border-t text-sm"> -->
    <!-- <nav class="hidden md:flex justify-center gap-6 px-6 py-3 border-t text-sm">
      <button class="font-semibold hover:text-primary">دسته‌بندی‌ها</button>
      <a href="#" class="hover:text-primary">خانه</a>
      <a href="#" class="hover:text-primary">فروش ویژه</a>
      <a href="#" class="hover:text-primary">جدیدترین‌ها</a>
      <a href="#" class="hover:text-primary">تماس با ما</a>
    </nav> -->


    <!-- <div class="hidden md:flex justify-center">
      <nav class="flex gap-6 px-6 py-3 border-t text-sm">
        <button class="font-semibold hover:text-primary">دسته‌بندی‌ها</button>
        <a href="#" class="hover:text-primary">خانه</a>
        <a href="#" class="hover:text-primary">فروش ویژه</a>
        <a href="#" class="hover:text-primary">جدیدترین‌ها</a>
        <a href="#" class="hover:text-primary">تماس با ما</a>
      </nav>
    </div> -->
    <!-- Mobile Menu -->
    <!-- <div v-if="mobileMenuOpen" class="md:hidden border-t px-4 py-4 space-y-4">
      <input type="text" placeholder="جستجو..." class="w-full border rounded-lg px-3 py-2" />

      <a href="#" class="block">خانه</a>
      <a href="#" class="block">دسته‌بندی‌ها</a>
      <a href="#" class="block">فروش ویژه</a>
      <a href="#" class="block">حساب کاربری</a>
    </div> -->
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CartDrawer from './CartDrawer.vue'

import { useCartStore3 } from '@/stores/cart'
// import { useCartStore3 } from '../stores/cart'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useScrollSpyStore } from '@/stores/scrollSpy'
import { menu } from '@/config/menu'



const store = useScrollSpyStore()
const auth = useAuthStore()
const cart = useCartStore3()
const mobileMenuOpen = ref(false)



// const menu = [
//   { id: 'home', label: 'خانه' },
//   { id: 'sale', label: 'فروش ویژه' },
//   { id: 'categories', label: 'دسته‌بندی‌ها' },
//   { id: 'new', label: 'جدیدترین‌ها' },
//   { id: 'contact', label: 'تماس با ما' },
// ]

// 1️⃣ تعریف منو به‌صورت هوشمند
// const menu = [
//   {
//     label: 'دسته‌بندی‌ها',
//     type: 'scroll',
//     target: '#categories',
//   },
//   {
//     label: 'خانه',
//     type: 'scroll',
//     target: '#home',
//     // target: '',
//   },
  
  
//   {
//     label: 'وبلاگ',
//     type: 'external',
//     href: 'https://example.com/blog',
//   },
//   {
//     label: 'درباره ما',
//     type: 'scroll',
//     target: '#about-us', // می‌تونه div باشه
//   },
//   {
//     label: 'تماس با ما',
//     type: 'route',
//     to: '/contact',
//   },
// ]



</script>

<style>
/* اگر از theme سفارشی Tailwind استفاده می‌کنی */
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



<!-- 3️⃣ Header سایت (شرطی بر اساس لاگین)

/components/AppHeader.vue -->

<!-- <script setup>
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/AuthLayout.vue'

const auth = useAuthStore()
</script> -->

<!-- <template>
  <header class="w-full border-b bg-white">
    <div class="container mx-auto flex items-center justify-between px-4 py-4"> -->

<!-- Logo -->
<!-- <RouterLink to="/" class="text-lg font-bold">
        MyApp
      </RouterLink> -->

<!-- Right Side -->
<!-- <div> -->
<!-- اگر لاگین کرده -->
<!-- <RouterLink v-if="auth.isAuthenticated" to="/dashboard"
          class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700">
          رفتن به داشبورد
        </RouterLink> -->

<!-- اگر لاگین نکرده -->
<!-- <AuthLayout v-else />
      </div>

    </div>
  </header>
</template> -->
