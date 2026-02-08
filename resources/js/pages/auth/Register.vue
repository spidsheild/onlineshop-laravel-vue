<!-- <template>
    <form @submit.prevent="register">
        <h2>Register</h2>

        <input
            v-model="name"
            type="text"
            placeholder="Name"
            required
        />

        <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
        />

        <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
        />

        <button type="submit">
            Register
        </button>

        <p>
            Already have an account?
            <router-link to="/login">Login</router-link>
        </p>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
    try {
        await auth.register({
            name: name.value,
            email: email.value,
            password: password.value
        })

        router.push('/')
    } catch (e) {
        alert('خطا در ثبت‌نام')
    }
}
</script>

<style scoped>
form {
    max-width: 400px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style> -->

<!-- 📌 نکات مهم

مستقیم به AuthController@register وصل است

توکن در localStorage ذخیره می‌شود

بعد از ثبت‌نام کاربر لاگین است

آماده اضافه کردن validation و error handling -->




<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const loading = ref(false)
const errors = ref({})

const submit = async () => {
    loading.value = true
    errors.value = {}

    try {
        await auth.register(form.value)
        router.push('/')
    } catch (e) {
        if (e.response?.data?.errors) {
            errors.value = e.response.data.errors
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <!-- <div class="min-h-screen flex items-center justify-center bg-gray-100"> -->
        <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4">
            <h2 class="text-2xl font-bold text-center">ثبت نام</h2>

            <input v-model="form.name" type="text" placeholder="نام" class="input" />
            <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>

            <input v-model="form.email" type="email" placeholder="ایمیل" class="input" />
            <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>

            <input v-model="form.password" type="password" placeholder="رمز عبور" class="input" />
            <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>

            <input v-model="form.password_confirmation" type="password" placeholder="تکرار رمز عبور" class="input" />

            <button type="submit" :disabled="loading" class="btn-primary">
                ثبت نام
            </button>
        </form>
    <!-- </div> -->
</template>

<style scoped>
@reference "tailwindcss";

.input {
    @apply w-full p-2 border rounded;
}

.error {
    @apply text-red-500 text-sm;
}

.btn-primary {
    @apply w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700;
}
</style>
