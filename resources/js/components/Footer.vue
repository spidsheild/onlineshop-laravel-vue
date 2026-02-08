<!-- <template>بیل</template> -->
 <template>
  <footer class="bg-gray-900 text-gray-300 mt-16">
    <!-- Top -->
    <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

      <!-- About -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">فروشگاه ما</h3>
        <p class="text-sm leading-7">
          فروشگاه اینترنتی ما ارائه‌دهنده بهترین محصولات با تضمین کیفیت،
          پشتیبانی ۲۴ ساعته و ارسال سریع به سراسر کشور است.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">دسترسی سریع</h3>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/" class="hover:text-white">صفحه اصلی</RouterLink></li>
          <li><RouterLink to="/products" class="hover:text-white">محصولات</RouterLink></li>
          <li><RouterLink to="/about" class="hover:text-white">درباره ما</RouterLink></li>
          <li><RouterLink to="/contact" class="hover:text-white">تماس با ما</RouterLink></li>
        </ul>
      </div>

      <!-- Customer Services -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">خدمات مشتریان</h3>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/faq" class="hover:text-white">سوالات متداول</RouterLink></li>
          <li><RouterLink to="/terms" class="hover:text-white">قوانین و مقررات</RouterLink></li>
          <li><RouterLink to="/privacy" class="hover:text-white">حریم خصوصی</RouterLink></li>
          <li><RouterLink to="/returns" class="hover:text-white">شرایط بازگشت</RouterLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">ارتباط با ما</h3>
        <ul class="space-y-3 text-sm">
          <li>📍 تهران، خیابان مثال</li>
          <li>📞 ۰۲۱-۱۲۳۴۵۶۷۸</li>
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
      © {{ currentYear }} تمامی حقوق محفوظ است | OYATULLOI ISMOIL | +992944813003
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())
</script>
