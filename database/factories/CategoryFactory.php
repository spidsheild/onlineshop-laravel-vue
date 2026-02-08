<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Category;
use Faker\Factory as FakerFactory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
      protected $model = Category::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // 🏷 CategoryFactory (تاجیکی)
        $faker = FakerFactory::create('tj_TJ');
        return [
            //
            'name' => $faker->words(2, true),
            // 'name' => $this->faker->unique()->words(2, true),
        ];
    }
}
