
<template>

  <div>
    <router-view />
  </div>
</template>

<script setup>
import CartItem from '@/components/CartItem.vue'
import { useFavoriteStore } from '@/stores/favorite'

// هیچ چیزی لازم نیست

import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'


const auth = useAuthStore()
const favoriteStore = useFavoriteStore()

onMounted(() => {
  if (auth.token) {
    auth.fetchUser()
  }
})

onMounted(() => {
  favoriteStore.fetchFavorites()
})
</script>

<style>
body {
  margin: 0;
}
</style>