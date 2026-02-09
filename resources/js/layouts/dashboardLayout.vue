<template>
    <div v-if="user" class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r hidden md:flex flex-col">
      <div class="p-6 text-lg font-bold border-b">
        панели идоракунӣ
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <DashboardItem v-for="item in menuItems" :key="item.to" :item="item" />
      </nav>
      <div class="p-4 border-t">
        <button @click="logout" class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
          Баромадан аз ҳисоб
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col">

      <!-- Header -->
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
import DashboardItem from '@/pages/dashboard/DashboardItem.vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})

const user = computed(() => authStore.user)



const defaultAvatar =
  'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'

const menuItems = [
  { label: 'Таҳрири маълумоти корбар', to: '/dashboard/profile' },
  { label: 'Сабади харид', to: '/dashboard/cart' },
  { label: 'Молҳои харидоришуда', to: '/dashboard/purchases' },
  { label: 'Молҳои писандида', to: '/dashboard/favorites' },
]

const logout = async () => {
  await authStore.logout()
  router.push('/auth')
}
</script>