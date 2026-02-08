// stores/scrollSpy.js
// 2️⃣ Pinia Store (shared state)
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScrollSpyStore = defineStore('scrollSpy', () => {
  const activeSection = ref(null)
  return { activeSection }
})
