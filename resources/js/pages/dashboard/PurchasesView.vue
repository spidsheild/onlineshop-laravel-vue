<template>
<div class="bg-white p-6 rounded shadow ">
     <div class="mb-6 border-b pb-4 max-w-4xl mx-auto p-6 flex flex-col items-center py-10 space-y-4">
     <h2 class="text-xl font-bold mb-4">کالاهای خریداری شده</h2>
     </div>
    

    <div v-for="order in purchases" :key="order.id" class="mb-6 border-b pb-4 max-w-4xl mx-auto p-6">
      <h3 class="font-semibold text-gray-700">
        {{ new Date(order.created_at).toLocaleDateString() }}
      </h3>

      <ul class="list-disc pr-5 mt-2">
        <li v-for="item in order.items" :key="item.id">
          {{ item.title }} × {{ item.quantity }}
        </li>
      </ul>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-2 mt-6">
      <button
        v-for="page in lastPage"
        :key="page"
        @click="fetchPurchases(page)"
        class="px-3 py-1 border rounded"
        :class="page === currentPage ? 'bg-blue-600 text-white' : 'bg-white'"
      >
        {{ page }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/apiClient'

const purchases = ref([])
const currentPage = ref(1)
const lastPage = ref(1)

const fetchPurchases = async (page = 1) => {
  const { data } = await api.get('/purchases', {
    params: { page }
  })

  purchases.value = data.data
  currentPage.value = data.current_page
  lastPage.value = data.last_page
}

onMounted(() => fetchPurchases())
</script>
