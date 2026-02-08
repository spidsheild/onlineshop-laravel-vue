<?php

namespace Database\Seeders;
use App\Models\User;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UuserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::factory()->count(50)->create();
    }
}

// 3. اجرای Seeder
// php artisan db:seed --class=UserSeeder


// یا کل seederها:

// php artisan migrate:fresh --seed