// ۱️⃣ فایل apiClient.js (برای API لاراول)
import axios from 'axios';
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

// اگر توکن داریم → ست کن
const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

/**
 * ✅ Response Interceptor هوشمند
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const originalRequest = error.config

    // فقط اگر:
    // 1️⃣ 401 باشد
    // 2️⃣ کاربر لاگین بوده باشد
    // 3️⃣ قبلاً retry نشده باشد
    if (
      status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true

      const auth = useAuthStore()

      // ❌ مهمان → هیچ کاری نکن
      if (!auth.isAuthenticated) {
        return Promise.reject(error)
      }

      // ✅ لاگین بوده → logout
      auth.logout()

      // ⛔ این push عملاً در logout انجام می‌شود
      // router.push({ name: 'login' })
    }

    return Promise.reject(error)
  }
)

export default api








// // نسخه صحیح apiClient.js برای Sanctum Token-Based ✅
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     Accept: 'application/json',
//   },
// })

// // ست کردن توکن
// const token = localStorage.getItem('token')
// if (token) {
//   api.defaults.headers.common.Authorization = `Bearer ${token}`
// }

// /**
//  * Response Interceptor
//  */
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status
//     const originalRequest = error.config

//     if (status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true

//       // توکن نامعتبر یا حذف شده
//       localStorage.removeItem('token')
//       delete api.defaults.headers.common.Authorization

//       // ریدایرکت به لاگین
//       router.push({ name: 'login' })
//     }

//     return Promise.reject(error)
//   }
// )

// export default api





// نسخه استاندارد برای پروژه تو (Vue 3 + Pinia + Sanctum)
// Session / Cookie-based
// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true, // مهم برای Sanctum
//     headers: {
//         Accept: 'application/json',
//     },
// })

// /**
//  * Response Interceptor
//  */
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const status = error.response?.status
//         const originalRequest = error.config

//         // جلوگیری از loop بی‌نهایت
//         if (status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true

//             // چون Sanctum داری → refresh token نداریم
//             // پس session نامعتبره → logout
//             try {
//                 // این endpoint اختیاریه (اگه logout سمت بک‌اند داری)
//                 // await api.post('/logout')
//             } catch (e) { }

//             // پاک‌سازی state
//             localStorage.removeItem('token')

//             // ریدایرکت به لاگین
//             router.push({ name: 'login' })
//         }

//         return Promise.reject(error)
//     }
// )

// export default api






// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: {
//         Accept: 'application/json',
//     },
// })

// // ست کردن توکن در صورت وجود
// const token = localStorage.getItem('token')
// if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

// /**
//  * Response Interceptor
//  */
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const status = error.response?.status

//         if (status === 401) {
//             // پاک کردن توکن
//             localStorage.removeItem('token')
//             delete api.defaults.headers.common['Authorization']

//             // ریدایرکت (بسته به پروژه‌ات یکی رو انتخاب کن)
//             // window.location.href = '/login'

//             // یا اگه از router استفاده می‌کنی:
//             // router.push('/login')
//         }

//         return Promise.reject(error)
//     }
// )

// export default api


// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     Accept: 'application/json',
//   },
// })

// // اگر توکن توی localStorage هست → ست کن
// const token = localStorage.getItem('token')
// if (token) {
//   api.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

// export default api














export const apiClient = axios.create({
    // baseURL: 'http://localhost:8000/api', // URL مخصوص API
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,

    // headers: {
    //     Accept: 'application/json'
    // }
});

// اضافه کردن توکن به همه درخواست‌ها
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));





// const api = axios.create({
//     baseURL: 'http://localhost:8000/api',
//     withCredentials: true,
//     headers: {
//         Accept: 'application/json'
//     }
// })

// export default api