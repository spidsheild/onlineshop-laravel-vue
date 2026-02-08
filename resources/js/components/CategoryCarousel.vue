<!-- 📁 CategoryCarousel.vue – نسخه بهینه نهایی -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    categories: { type: Array, required: true },
    intervalTime: { type: Number, default: 4000 }
})

const router = useRouter()
const currentIndex = ref(0)
const isHovering = ref(false)
let interval = null

// Responsive
const cardsPerView = ref(1)
const updateCardsPerView = () => {
    const width = window.innerWidth
    if (width >= 1280) cardsPerView.value = 5
    else if (width >= 1024) cardsPerView.value = 4
    else if (width >= 768) cardsPerView.value = 3
    else if (width >= 640) cardsPerView.value = 2
    else cardsPerView.value = 1
}
window.addEventListener('resize', updateCardsPerView)
updateCardsPerView()

// Infinite loop
const clones = computed(() => props.categories.slice(0, cardsPerView.value))
const displayCategories = computed(() => [...props.categories, ...clones.value])
const totalSlides = computed(() => Math.ceil(props.categories.length / cardsPerView.value))

// Navigation
const nextSlide = () => {
    currentIndex.value++
    if (currentIndex.value > totalSlides.value) {
        setTimeout(() => { currentIndex.value = 0 }, 500)
    }
}
const prevSlide = () => {
    if (currentIndex.value === 0) {
        currentIndex.value = totalSlides.value
        setTimeout(() => { currentIndex.value = totalSlides.value - 1 }, 0)
    } else currentIndex.value--
}

const goToCategory = (slug) => router.push({ name: 'category', params: { slug } })

// Lazy load
const loadedImages = ref(new Set())
const onImageLoad = (id) => loadedImages.value.add(id)

// Swipe / Drag
let startX = 0
let isDragging = false
const onTouchStart = (e) => { isDragging = true; startX = e.touches ? e.touches[0].clientX : e.clientX }
const onTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const diff = x - startX
    if (diff > 50) { prevSlide(); isDragging = false }
    else if (diff < -50) { nextSlide(); isDragging = false }
}
const onTouchEnd = () => { isDragging = false }

// Translate
const translateX = computed(() => `-${currentIndex.value * (100 / cardsPerView.value)}%`)

// Mounted / Unmounted
onMounted(() => {
    interval = setInterval(() => { if (!isHovering.value) nextSlide() }, props.intervalTime)

    // اضافه کردن passive event listener برای touch
    const carousel = document.querySelector('.carousel-container')
    if (carousel) {
        carousel.addEventListener('touchstart', onTouchStart, { passive: true })
        carousel.addEventListener('touchmove', onTouchMove, { passive: true })
        carousel.addEventListener('touchend', onTouchEnd)
    }
})

onUnmounted(() => {
    clearInterval(interval)
    window.removeEventListener('resize', updateCardsPerView)

    const carousel = document.querySelector('.carousel-container')
    if (carousel) {
        carousel.removeEventListener('touchstart', onTouchStart)
        carousel.removeEventListener('touchmove', onTouchMove)
        carousel.removeEventListener('touchend', onTouchEnd)
    }
})
</script>

<template>
    <div class="carousel-container relative w-full overflow-hidden select-none" @mouseenter="isHovering = true"
        @mouseleave="isHovering = false">
        <div class="flex transition-transform duration-500" :style="{ transform: `translateX(${translateX})` }">
            <div v-for="category in displayCategories" :key="category.id + '-' + Math.random()"
                :class="'px-2 flex-shrink-0'" :style="{ width: 100 / cardsPerView + '%' }">
                <div class="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                    @click="goToCategory(category.slug)">
                    <!-- Skeleton loader -->
                    <div v-if="!loadedImages.has(category.id)"
                        class="w-full h-56 bg-gray-200 animate-pulse rounded-t-xl"></div>
                    <!-- Actual image -->
                    <img v-else :src="`storage/${category.image}`" :alt="category.name"
                        class="w-full h-56 object-cover rounded-t-xl" />
                    <!-- Lazy load trigger -->
                    <img v-if="!loadedImages.has(category.id)" :src="`storage/${category.image}`"
                        @load="onImageLoad(category.id)" class="hidden" />
                    <div class="p-4 text-center">
                        <h3 class="text-lg font-semibold">{{ category.name }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Controls -->
        <button @click="prevSlide"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10">‹</button>
        <button @click="nextSlide"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10">›</button>

        <!-- Dots -->
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
            <span v-for="n in totalSlides" :key="n" @click="currentIndex = n - 1" :class="{
                'w-3 h-3 rounded-full cursor-pointer transition-colors': true,
                'bg-blue-500': currentIndex === n - 1,
                'bg-gray-300': currentIndex !== n - 1
            }"></span>
        </div>
    </div>
</template>
