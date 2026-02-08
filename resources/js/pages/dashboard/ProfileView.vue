<!-- 1️⃣ ویرایش اطلاعات کاربر – ProfileView.vue -->
<template>
  <div class="max-w-xl bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">ویرایش اطلاعات کاربر</h2>

    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label class="block mb-1">نام</label>
        <input v-model="form.name" class="input" />
      </div>

      <div>
        <label class="block mb-1">ایمیل</label>
        <input v-model="form.email" class="input" />
      </div>

      <button class="btn-primary">ذخیره تغییرات</button>
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
  alert('اطلاعات با موفقیت بروزرسانی شد')
}
</script>
