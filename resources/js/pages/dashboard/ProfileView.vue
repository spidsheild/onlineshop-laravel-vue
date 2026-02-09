<!-- 1️⃣ Таҳрири маълумоти корбар – ProfileView.vue -->
<template>
  <div class="max-w-xl bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">Таҳрири маълумоти корбар</h2>

    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label class="block mb-1">Ном</label>
        <input v-model="form.name" class="input" />
      </div>

      <div>
        <label class="block mb-1">Почтаи электронӣ</label>
        <input v-model="form.email" class="input" />
      </div>

      <button class="btn-primary">Захираи тағйирот</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import api from '@/apiClient'

const form = reactive({
  name: '',
  email: '',
})

onMounted(async () => {
  const { data } = await api.get('/user')
  Object.assign(form, data)
})

const updateProfile = async () => {
  await axios.put('/user/profile', form)
  alert('Маълумот бо муваффақият навсозӣ шуд')
}
</script>
