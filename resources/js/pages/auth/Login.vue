
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
        
        const redirectTo = route.query.redirect || '/dashboard'
        router.push(redirectTo)

    } catch (e) {
        console.log(e.response?.data)
        error.value = 'Почтаи электронӣ ё рамзи убур хато аст'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <form @submit.prevent="submit" class="space-y-4">
        <input v-model="form.email" type="email" placeholder="Почтаи электронӣ" class="input" />
        <input v-model="form.password" type="password" placeholder="Рамзи убур" class="input" autocomplete="" />

        <p v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
        </p>

        <button type="submit" class="btn-primary w-full">
            Воридшавӣ
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
