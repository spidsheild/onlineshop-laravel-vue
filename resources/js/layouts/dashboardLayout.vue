<template>
    <div v-if="user" class="min-h-screen bg-gray-100">
        <!-- Sidebar -->
        <aside 
            :class="[
                'bg-white border-r fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out',
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            ]"
            class="md:relative md:translate-x-0 md:flex md:flex-col">
            
            <div class="p-4 sm:p-6 text-xl font-bold border-b text-center">
                <router-link to="/">Панели идоракунӣ</router-link>
            </div>

            <nav class="flex-1 p-4 space-y-2">
                <DashboardItem v-for="item in menuItems" :key="item.to" :item="item" />
            </nav>
            <div class="p-4 border-t">
                <button @click="logout"
                    class="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Баромадан</span>
                </button>
            </div>
        </aside>

        <!-- Main content -->
        <div class="flex-1 flex flex-col md:ml-64">

            <!-- Header -->
            <header class="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">
                <!-- Mobile Menu Button -->
                <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden text-gray-600 hover:text-gray-800">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <!-- Spacer on desktop -->
                <div class="hidden md:block"></div>

                <!-- User Info -->
                <div class="flex items-center gap-3">
                    <img :src="`/storage/${user?.user_image}` || defaultAvatar" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover" />
                    <span class="font-medium text-sm sm:text-base">{{ user?.name }}</span>
                </div>
            </header>

            <!-- Content -->
            <main class="p-4 sm:p-6 flex-grow">
                <router-view />
            </main>

        </div>
        
        <!-- Sidebar Backdrop (for mobile) -->
        <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="md:hidden fixed inset-0 bg-black opacity-50 z-20"></div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardItem from '@/pages/dashboard/DashboardItem.vue'

const router = useRouter()
const authStore = useAuthStore()
const isSidebarOpen = ref(false)

onMounted(() => {
    authStore.fetchUser()
})

const user = computed(() => authStore.user)

const defaultAvatar =
    'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'

const menuItems = [
    { label: 'Профил', to: '/dashboard/profile' },
    { label: 'Сабади харид', to: '/dashboard/cart' },
    { label: 'Харидҳо', to: '/dashboard/purchases' },
    { label: 'Дӯстдоштаҳо', to: '/dashboard/favorites' },
]

const logout = async () => {
    await authStore.logout()
    router.push('/auth')
}
</script>