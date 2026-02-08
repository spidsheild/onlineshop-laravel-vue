<template>
    <div class="relative w-full overflow-hidden rounded-2xl">
        <!-- Slides -->
        <div class="flex transition-transform duration-700 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <!-- {{ slides }} -->
            <div v-for="slide in slides" :key="slide.id" class="min-w-full h-[420px] relative">
                <img :src="`storage/${slide.image}`" class="w-full h-full object-cover" alt="" />

                <!-- Overlay -->
                <div class="absolute inset-0 bg-black/40 flex items-center">
                    <div class="container mx-auto px-6 text-white max-w-xl">
                        <h2 class="text-3xl font-bold mb-3">
                            {{ slide.title }}
                        </h2>
                        <!-- <p class="mb-4 text-sm opacity-90">
                            {{ slide.description }}
                        </p> -->
                        <div class="flex items-center gap-2">

                            <!-- <RouterLink :to="slide.link"
                                class="bg-primary-500 hover:bg-primary-600 transition px-5 py-2 rounded-xl">
                                مشاهده محصول
                            </RouterLink> -->

                            <!-- <RouterLink :to="{ name: 'product.show', params: { id: slide.id } }"
                                class="bg-primary-400 hover:bg-primary-700 transition px-25 py-2 rounded-xl">
                                مشاهده محصول
                            </RouterLink>
                            <span class="text-xl font-semibold">
                                {{ slide.price }} تومان
                            </span> -->
                        </div>

                        <div class="flex flex-col items-start gap-3 px-45">

                            <span class="text-xl font-semibold px-5">
                                {{ slide.price }} تومان
                            </span>
                            <!-- <RouterLink :to="{ name: 'product.show', params: { id: slide.id } }" class="border border-primary-500 bg-primary-100 text-primary-700
               hover:bg-primary-200 transition px-6 py-2 rounded-xl w-fit">
                                مشاهده محصول
                            </RouterLink> -->

                            <RouterLink :to="{ name: 'product.show', params: { id: slide.id } }" class="border border-primary-500 bg-primary-100 text-primary-700
               hover:bg-primary-500 hover:text-white
               hover:shadow-md hover:-translate-y-0.5
               transition-all duration-300
               px-6 py-2 rounded-xl w-fit">
                                مشاهده محصول
                            </RouterLink>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- Controls -->
        <button @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full">
            ‹
        </button>
        <button @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full">
            ›
        </button>

        <!-- Dots -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button v-for="(_, index) in slides" :key="index" @click="goToSlide(index)" class="w-3 h-3 rounded-full"
                :class="currentIndex === index ? 'bg-white' : 'bg-white/40'" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    slides: {
        type: Array,
        required: true,
    },
    interval: {
        type: Number,
        default: 5000,
    },
})

const currentIndex = ref(0)
let timer = null

const nextSlide = () => {
    currentIndex.value =
        (currentIndex.value + 1) % props.slides.length
}

const prevSlide = () => {
    currentIndex.value =
        (currentIndex.value - 1 + props.slides.length) %
        props.slides.length
}

const goToSlide = (index) => {
    currentIndex.value = index
}

onMounted(() => {
    timer = setInterval(nextSlide, props.interval)
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>
