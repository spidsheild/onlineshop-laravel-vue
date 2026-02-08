// src/config/menu.js
export const menu = [
    {
        label: 'خانه',
        type: 'scroll',
        target: '#home',
        // to: '/',
    },
    {
        label: 'دسته‌بندی‌ها',
        type: 'scroll',
        target: '#categories',
    },

     {
        label: ' فروش ویژه ',
        type: 'scroll',
        target: '#sale',
    },
    {
        label: 'وبلاگ',
        type: 'external',
        href: 'https://example.com/blog',
    },
    {
        label: 'درباره ما',
        type: 'scroll',
        target: '#about-us',
    },
    {
        label: 'تماس با ما',
        type: 'route',
        to: '/contact',
    },
]

//  <nav class="hidden md:flex gap-6 px-6 py-3 border-t text-sm"> -->
//     <!-- <nav class="hidden md:flex justify-center gap-6 px-6 py-3 border-t text-sm">
//       <button class="font-semibold hover:text-primary">دسته‌بندی‌ها</button>
//       <a href="#" class="hover:text-primary">خانه</a>
//       <a href="#" class="hover:text-primary"> فروش ویژه</a> 
//       <a href="#" class="hover:text-primary">جدیدترین‌ها</a>
//       <a href="#" class="hover:text-primary">تماس با ما</a>
//     </nav> 