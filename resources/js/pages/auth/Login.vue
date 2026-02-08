<!-- <template>
<form @submit.prevent="login">
    <input v-model="email" placeholder="email" />
    <input v-model="password" type="password" />
    <button>Login</button>
</form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
}
</script> -->


<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const form = ref({
    email: '',
    password: ''
})

const loading = ref(false)
const error = ref(null)

const submit = async () => {
    loading.value = true
    error.value = null

    try {
        await auth.login(form.value)
        // router.push('/dashboard')

        // 🔑 مسیر قبلی یا dashboard
        const redirectTo = route.query.redirect || '/dashboard'
        router.push(redirectTo)


        // 🧠 Bonus حرفه‌ای(اختیاری)
        // جلوگیری از redirect loop
        // const redirectTo =
        // route.query.redirect && route.query.redirect !== '/login'
        //? route.query.redirect
        // : '/dashboard'

    } catch (e) {
        // console.log(error.response.data)
        console.log(e.response?.data)
        error.value = 'ایمیل یا رمز عبور اشتباه است'
    } finally {
        loading.value = false
    }
}
</script>

<!-- <template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4">
            <h2 class="text-2xl font-bold text-center">ورود</h2>

            <input v-model="form.email" type="email" placeholder="ایمیل" class="input" />

            <input v-model="form.password" type="password" placeholder="رمز عبور" class="input" />

            <p v-if="error" class="error">{{ error }}</p>

            <button type="submit" :disabled="loading" class="btn-primary">
                ورود
            </button>
        </form>
    </div>
</template> -->


<!-- 3️⃣ تغییر کوچک در Login.vue و Register.vue

چون Layout کارت را دارد، بهتر است wrapper صفحه را حذف کنیم.

مثال Login.vue (نسخه مناسب Layout) -->

<template>
    <form @submit.prevent="submit" class="space-y-4">
        <input v-model="form.email" type="email" placeholder="ایمیل" class="input" />
        <input v-model="form.password" type="password" placeholder="رمز عبور" class="input" autocomplete="" />

        <p v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
        </p>

        <button type="submit" class="btn-primary w-full">
            ورود
        </button>
    </form>
</template>



<style scoped>
@reference "tailwindcss";

.input {
    @apply w-full p-2 border rounded;
}

.error {
    @apply text-red-500 text-sm text-center;
}

.btn-primary {
    @apply w-full bg-green-600 text-white p-2 rounded hover:bg-green-700;
}
</style>
ّ
