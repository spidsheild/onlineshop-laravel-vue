<?php
return [

    'paths' => ['api/*', 'login', 'auth/login', 'logout', 'sanctum/csrf-cookie'], // مسیرهایی که CORS فعال شود

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://127.0.0.1:8000',
        'http://localhost:8000',
        
        'http://127.0.0.1:8001',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],

    'allowed_headers' => ['*'],
    // 'max_age' => 0,

    'supports_credentials' => true,

];