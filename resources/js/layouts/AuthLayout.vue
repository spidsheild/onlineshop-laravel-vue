
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isLogin = () => route.name === 'login'
const isRegister = () => route.name === 'register'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

      <!-- Tabs -->
      <div class="flex mb-6 rounded-lg overflow-hidden border">
        <button @click="router.push({ name: 'login' })" :class="[
          'flex-1 py-2 font-medium transition',
          isLogin() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
        ]">
          Воридшавӣ
        </button>

        <button @click="router.push({ name: 'register' })" :class="[
          'flex-1 py-2 font-medium transition',
          isRegister() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
        ]">
          Сабти ном
        </button>
      </div>

      <!-- Card Content -->
      <router-view />
    </div>
  </div>
</template>
