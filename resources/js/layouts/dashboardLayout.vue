
<template>
  <!-- <pre>store.user = {{ authStore.user }}</pre>
<pre>computed user = {{ user }}</pre>
<pre>loading = {{ authStore.loading }}</pre> -->

  <!-- ✅ راه‌حل درست (بهترین حالت)
🔥 شرط رندر رو روی مقدار واقعی بذار -->
  <!-- <div v-if="user && user.name" class="min-h-screen bg-gray-100 flex"> -->
  <!-- <div v-if="user.name" class="min-h-screen bg-gray-100 flex"> -->
    <div v-if="user" class="min-h-screen bg-gray-100 flex">


      
<!-- <div v-if="!authStore.loading && user.name" class="min-h-screen bg-gray-100 flex"> -->

    <!-- یا شفاف‌تر: -->
    <!-- <div v-if="user !== null" class="min-h-screen bg-gray-100 flex"></div> -->
    <!-- یا حرفه‌ای‌تر با loading: -->
    <!-- <div v-if="!authStore.loading && user"> -->
    <!-- یا اگر loading داری: -->
    <!-- <div v-if="!authStore.loading && user.name"> -->

    <!-- <pre>{{ authStore.user }}</pre> -->
    <!-- <pre>{{ user }}</pre> -->

    <!-- <p>{{ user }}</p> -->
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r hidden md:flex flex-col">
      <div class="p-6 text-lg font-bold border-b">
        داشبورد کاربری
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <DashboardItem v-for="item in menuItems" :key="item.to" :item="item" />
      </nav>

      <!-- <nav class="p-4 space-y-2">
        <RouterLink to="/dashboard/profile">ویرایش اطلاعات</RouterLink>
        <RouterLink to="/dashboard/orders">جزئیات خرید</RouterLink>
        <RouterLink to="/dashboard/cart">سبد خرید</RouterLink>
        <RouterLink to="/dashboard/purchases">کالاهای خریداری‌شده</RouterLink>
        <RouterLink to="/dashboard/favorites">کالاهای پسندیده</RouterLink>
      </nav> -->
      <div class="p-4 border-t">
        <button @click="logout" class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
          خروج از حساب
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col">

      <!-- Header -->
      <!-- <header class="h-16 bg-white border-b flex items-center justify-end px-6"> -->
        <header class="h-16 bg-white border-b flex items-center px-6">

        <div class="flex flex-col items-center py-10 space-y-4 mx-auto ml-120">
        <router-link to="/" class="w-64 text-center rounded-xl bg-gray-200 px-6 py-3 text-gray-800 font-semibold
           hover:bg-gray-300 transition">
          САҲИФАИ АСЛӢ
        </router-link>
       </div>


        <div class="flex items-center gap-3">
          <img :src="`/storage/${user?.user_image}` || defaultAvatar" class="w-10 h-10 rounded-full object-cover" />
          <span class="font-medium">{{ user?.name }}</span>
          <!-- <pre>{{ user }}</pre> -->
        </div>
      </header>

      <!-- Content -->
      <main class="p-6">
        <router-view />
      </main>

    </div>
  </div>
</template>





<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
// import { useAuthStore2 } from '../stores/auth'
// import DashboardItem from '@/components/dashboard/DashboardItem.vue'
import DashboardItem from '@/pages/dashboard/DashboardItem.vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})

// onMounted(() => {
//   if (!authStore.user) {
//     authStore.fetchUser()
//   }
// })

// onMounted(() => {
//   if (!authStore.user || !authStore.user.name) {
//     authStore.fetchUser()
//   }
// })
const user = computed(() => authStore.user)



const defaultAvatar =
  'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'

const menuItems = [
  { label: 'ویرایش اطلاعات کاربر', to: '/dashboard/profile' },
  // { label: 'جزئیات خرید', to: '/dashboard/orders' },
  { label: 'سبد خرید', to: '/dashboard/cart' },
  { label: 'کالاهای خریداری شده', to: '/dashboard/purchases' },
  // { label: 'کالاهای پسندیده', to: '/dashboard/favorites' },
  { label: 'کالاهای پسندیده', to: '/dashboard/favorites' },
]

const logout = async () => {
  await authStore.logout()
  router.push('/auth')
}
</script>



<!-- <template>
  <div class="min-h-screen flex bg-gray-100"> -->

<!-- Sidebar -->
<!-- <aside class="w-64 bg-white border-r">
      <nav class="p-4 space-y-2">
        <RouterLink to="/dashboard/profile">ویرایش اطلاعات</RouterLink>
        <RouterLink to="/dashboard/orders">جزئیات خرید</RouterLink>
        <RouterLink to="/dashboard/cart">سبد خرید</RouterLink>
        <RouterLink to="/dashboard/purchases">کالاهای خریداری‌شده</RouterLink>
        <RouterLink to="/dashboard/favorites">کالاهای پسندیده</RouterLink>
      </nav>
    </aside> -->

<!-- Main -->
<!-- <div class="flex-1 flex flex-col"> -->

<!-- Header -->
<!-- <header class="h-16 bg-white border-b flex justify-end items-center px-6">
        هدر کاربر
      </header> -->

<!-- Dynamic Content -->
<!-- <main class="p-6">
        <router-view />
      </main>

    </div>
  </div>
</template> -->

<!-- <template>
  <div class="min-h-screen flex bg-gray-100"> -->

<!-- Sidebar -->
<!-- <aside class="w-64 bg-white border-r">
      <nav class="p-4 space-y-2">
        <RouterLink
          v-for="item in menu"
          :key="item.to"
          :to="item.to"
          class="block p-2 rounded hover:bg-gray-100"
          active-class="bg-blue-100 text-blue-600"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside> -->

<!-- Main -->
<!-- <div class="flex-1 flex flex-col">
      <header class="h-16 bg-white border-b flex items-center justify-end px-6">
        داشبورد کاربر
      </header>

      <main class="p-6"> -->
<!-- 👇 اینجا کامپوننت‌های فرزند لود می‌شوند -->
<!-- <router-view />
      </main>
    </div>

  </div>
</template>

<script setup>
const menu = [
  { label: 'ویرایش اطلاعات', to: '/dashboard/profile' },
  { label: 'جزئیات خرید', to: '/dashboard/orders' },
  { label: 'سبد خرید', to: '/dashboard/cart' },
  { label: 'خریدها', to: '/dashboard/purchases' },
  { label: 'علاقه‌مندی‌ها', to: '/dashboard/favorites' },
]
</script> -->

<!-- 3️⃣ نتیجه نهایی معماری -->
<!-- DashboardLayout.vue
 ├─ Sidebar (ثابت)
 ├─ Header (ثابت)
 └─ router-view
     ├─ ProfileView.vue
     ├─ OrdersView.vue
     ├─ CartView.vue
     ├─ PurchasesView.vue
     └─ FavoritesView.vue -->
