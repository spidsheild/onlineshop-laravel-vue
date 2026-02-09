<!-- 1️⃣ Таҳрири маълумоти корбар – ProfileView.vue -->
<template>
  <div class="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
    <h2 class="text-xl sm:text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Таҳрири профил</h2>

    <div v-if="loadingInitial" class="text-center py-10">
        <p>Дар ҳоли боргирии маълумот...</p>
    </div>
    <form v-else @submit.prevent="updateProfile" class="space-y-6">
      <div>
        <label for="name" class="block mb-2 font-medium text-gray-700">Ном</label>
        <input id="name" type="text" v-model="form.name" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label for="email" class="block mb-2 font-medium text-gray-700">Почтаи электронӣ</label>
        <input id="email" type="email" v-model="form.email" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div class="pt-2">
        <button 
          type="submit" 
          :disabled="loadingUpdate"
          class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center">
          <svg v-if="loadingUpdate" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="loadingUpdate">Дар ҳоли навсозӣ...</span>
          <span v-else>Захираи тағйирот</span>
        </button>
      </div>
    </form>
    
    <div v-if="successMessage" class="mt-4 text-center text-green-600 bg-green-50 p-3 rounded-lg">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mt-4 text-center text-red-600 bg-red-50 p-3 rounded-lg">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/apiClient'

const form = reactive({
  name: '',
  email: '',
})

const loadingInitial = ref(false)
const loadingUpdate = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(async () => {
  loadingInitial.value = true
  try {
    const { data } = await api.get('/user')
    Object.assign(form, data)
  } catch(e) {
    errorMessage.value = "Хатогӣ дар гирифтани маълумоти корбар."
  } finally {
    loadingInitial.value = false
  }
})

const updateProfile = async () => {
  loadingUpdate.value = true
  successMessage.value = ''
  errorMessage.value = ''
  try {
    await api.put('/user/profile', form)
    successMessage.value = 'Маълумот бо муваффақият навсозӣ шуд.'
  } catch (e) {
    errorMessage.value = 'Хатогӣ дар навсозии маълумот. Лутфан дубора кӯшиш кунед.'
  } finally {
    loadingUpdate.value = false
  }
}
</script>
