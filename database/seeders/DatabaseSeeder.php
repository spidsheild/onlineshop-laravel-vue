<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 4️⃣ اضافه کردن Seeder به DatabaseSeeder
        // فایل:
// database/seeders/DatabaseSeeder.php
// $this->call(UserSeeder::class);

        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $this->call([
            CategoryImageSeeder::class,
        ]);
    }
}


// 5️⃣ اجرای Seeder
// php artisan db:seed

// یا همراه با migrate:
// php artisan migrate:fresh --seed

