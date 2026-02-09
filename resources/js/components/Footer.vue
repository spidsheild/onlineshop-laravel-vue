<template>
  <footer class="bg-gray-900 text-gray-300 mt-16">
    <!-- Top -->
    <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

      <!-- About -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">Мағозаи мо</h3>
        <p class="text-sm leading-7">
          Мағозаи интернетии мо пешниҳодкунандаи беҳтарин маҳсулот бо кафолати сифат,
          дастгирии 24 соата ва ирсоли зуд ба саросари кишвар аст.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">Дастрасии зуд</h3>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/" class="hover:text-white">Саҳифаи аслӣ</RouterLink></li>
          <li><RouterLink to="/products" class="hover:text-white">Маҳсулот</RouterLink></li>
          <li><RouterLink to="/about" class="hover:text-white">Дар бораи мо</RouterLink></li>
          <li><RouterLink to="/contact" class="hover:text-white">Тамос бо мо</RouterLink></li>
        </ul>
      </div>

      <!-- Customer Services -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">Хизматрасонии муштариён</h3>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/faq" class="hover:text-white">Саволҳои маъмул</RouterLink></li>
          <li><RouterLink to="/terms" class="hover:text-white">Қоидаҳо ва муқаррарот</RouterLink></li>
          <li><RouterLink to="/privacy" class="hover:text-white">Ҳарими хусусӣ</RouterLink></li>
          <li><RouterLink to="/returns" class="hover:text-white">Шартҳои бозгашт</RouterLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">Иртибот бо мо</h3>
        <ul class="space-y-3 text-sm">
          <li>� Душанбе, хиёбони айнӣ</li>
          <li>�📞 123456789</li>
          <li>✉️ support@example.com</li>
        </ul>

        <!-- Social -->
        <div class="flex gap-4 mt-4">
          <a href="#" class="hover:text-white">🌐</a>
          <a href="#" class="hover:text-white">📘</a>
          <a href="#" class="hover:text-white">📸</a>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
      © {{ currentYear }} Ҳамаи ҳуқуқҳо маҳфуз аст | OYATULLOI ISMOIL | +992944813003
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())
</script>
