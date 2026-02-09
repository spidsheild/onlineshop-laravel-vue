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
        <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4">
            <h2 class="text-2xl font-bold text-center">Сабти ном</h2>

            <input v-model="form.name" type="text" placeholder="Ном" class="input" />
            <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>

            <input v-model="form.email" type="email" placeholder="Почтаи электронӣ" class="input" />
            <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>

            <input v-model="form.password" type="password" placeholder="Рамзи убур" class="input" />
            <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>

            <input v-model="form.password_confirmation" type="password" placeholder="Такрори рамзи убур" class="input" />

            <button type="submit" :disabled="loading" class="btn-primary">
                Сабти ном
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
