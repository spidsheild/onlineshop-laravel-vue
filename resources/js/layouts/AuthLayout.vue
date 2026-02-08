<!-- <script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isLogin = computed(() => route.path === '/login')
</script> -->

<!-- <template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div class="w-full max-w-md"> -->
<!-- Logo / Title -->
<!-- <div class="text-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800">فروشگاه من</h1>
                <p class="text-gray-500 mt-1">
                    {{ isLogin ? 'ورود به حساب کاربری' : 'ساخت حساب کاربری جدید' }}
                </p>
            </div> -->

<!-- Auth Card -->
<!-- <div class="bg-white rounded-xl shadow-lg p-6">
                <RouterView />
            </div> -->

<!-- Switch Login/Register -->
<!-- <div class="text-center mt-4 text-sm text-gray-600">
                <span v-if="isLogin">
                    حساب کاربری ندارید؟
                    <RouterLink to="/register" class="text-blue-600 hover:underline font-medium">
                        ثبت نام
                    </RouterLink>
                </span>

                <span v-else>
                    قبلاً ثبت نام کرده‌اید؟
                    <RouterLink to="/login" class="text-green-600 hover:underline font-medium">
                        ورود
                    </RouterLink>
                </span>
            </div>
        </div>
    </div>
</template> -->


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
          ورود
        </button>

        <button @click="router.push({ name: 'register' })" :class="[
          'flex-1 py-2 font-medium transition',
          isRegister() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
        ]">
          ثبت نام
        </button>
      </div>

      <!-- Card Content -->
      <router-view />
    </div>
  </div>
</template>
