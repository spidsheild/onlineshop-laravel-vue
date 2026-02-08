import './bootstrap';

// 2️⃣ app.js (Bootstrap اصلی Vue)

// resources/js/app.js

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import router from './router'
import '../css/app.css'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
const app = createApp(App)
app.component('Navbar', Navbar)
app.component('Footer', Footer)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.mount('#app')
