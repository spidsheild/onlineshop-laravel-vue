// src/config/menu.js
export const menu = [
    {
        label: 'Хона',
        type: 'scroll',
        target: '#home',
        // to: '/',
    },
    {
        label: 'Дастабандиҳо',
        type: 'scroll',
        target: '#categories',
    },

     {
        label: ' Фурӯши вижа ',
        type: 'scroll',
        target: '#sale',
    },
    {
        label: 'Веблог',
        type: 'external',
        href: 'https://example.com/blog',
    },
    {
        label: 'Дар бораи мо',
        type: 'scroll',
        target: '#about-us',
    },
    {
        label: 'Тамос бо мо',
        type: 'route',
        to: '/contact',
    },
]