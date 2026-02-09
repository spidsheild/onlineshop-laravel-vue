<template>
  <Header></Header>
  <div class="home">
    <CartDrawer />
    <div>
      <BannerSlider v-if="bannerProducts.length" :slides="bannerProducts" />
    </div>

    <section class="container mx-auto py-16 min-h-screen" id="sale">
      <h2 class="text-2xl font-bold mb-8">
        Маҳсулоти вижа
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in topProducts" :key="product.id" :product="product" />
      </div>
      <div class="flex justify-center mt-10">
        <router-link to="/products" custom v-slot="{ navigate, href }" class="w-64 text-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold
           hover:bg-blue-700 transition duration-300 shadow-md">
          <a :href="href" target="_blank" @click="navigate">
            Мушоҳидаи ҳамаи маҳсулот
          </a>

        </router-link>
      </div>
    </section>
    <!-- Category Carousel -->
    <section class="mb-10 min-h-screen" id="categories">
      <div class="flex flex-col items-center py-10 space-y-4">
        <h2 class="w-64 text-center rounded-xl bg-gray-200 px-6 py-3 text-gray-800 font-semibold
           hover:bg-gray-300 transition">ДАСТАБАНДИҲО</h2>
      </div>
      <CategoryCarousel :categories="categories" :interval-time="5000" />
    </section>
    <Footer />
  </div>
</template>

<script setup>
// Дар ин саҳифа ҳоло ниёзе ба logic нест
import { ref, computed, watch, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useProductStore } from '@/stores/product.store'
import ProductCard from '@/components/product/ProductCard.vue'
import BannerSlider from '@/components/BannerSlider.vue'
import CategoryCarousel from '@/components/CategoryCarousel.vue'
import { useScrollSpyStore } from '@/stores/scrollSpy'
import { menu } from '@/config/menu'
import { useFavoriteStore } from '@/stores/favorite'

import { Header, Footer, CartDrawer } from '@/components'


const favoriteStore = useFavoriteStore()
const store = useScrollSpyStore()

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})

const products = ref([])


// Вақте productStore.products тағйир ёфт, products ҳам навсозӣ шавад
watch(
  () => productStore.products,
  (newProducts) => {
    products.value = newProducts;
  },
  { immediate: true } // Ҳамин ҳоло ҳам миқдори аввалияро танзим кун
)

const bannerProducts = computed(() => {
  return products.value.slice(0, 3)
})

const topProducts = computed(() => {
  return productStore.products.slice(0, 20)
})



const categories = computed(() => {
  const map = new Map()

  products.value.forEach(product => {
    map.set(product.category.id, product.category)
  })

  return Array.from(map.values())
})


// Танҳо айтемҳои scroll
const scrollItems = menu.filter(item => item.type === 'scroll')




let observer

onMounted(() => {
  const elements = scrollItems
    .map(item => document.querySelector(item.target))
    .filter(el => el !== null) // Танҳо онҳое ки дар саҳифа ҳастанд

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          store.activeSection = entry.target.id
        }
      })
    },
    {
      rootMargin: '-40% 0px -40% 0px',
    }
  )

  elements.forEach(el => observer.observe(el))
})

</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 80px;
}

.btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #3490dc;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

section {
  scroll-margin-top: 120px;
}
</style>
