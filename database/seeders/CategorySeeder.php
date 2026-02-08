<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Category::factory()->count(10)->create();
         $categories = [
            'телефон',
            'ноутбук',
            'планшет',
            'Компютерҳо ва ҷузъҳо',
            'Монитор',
            'Лавозимоти мобилӣ',
            'Гӯшмонакҳо',
            'Соати интеллектуалӣ',
            'Камера',
            'Таҷҳизоти хонагӣ',
            'Телевизион',
            'Консоли бозӣ',
            'Бозиҳо ва вақтхушӣ',
            'Шабака ва модем',
            'Принтер ва сканер',
            'Таҷҳизоти нигоҳдорӣ',
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category
            ]);
        }
    }
}
