
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isLogin = () => route.name === 'login'
const isRegister = () => route.name === 'register'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-5 sm:p-8">

      <!-- Tabs -->
      <div class="flex mb-6 rounded-lg overflow-hidden border border-gray-200">
        <button @click="router.push({ name: 'login' })" :class="[
          'flex-1 py-3 text-sm font-medium transition-colors duration-200',
          isLogin() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]">
          Воридшавӣ
        </button>

        <button @click="router.push({ name: 'register' })" :class="[
          'flex-1 py-3 text-sm font-medium transition-colors duration-200',
          isRegister() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]">
          Сабти ном
        </button>
      </div>

      <!-- Card Content -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
