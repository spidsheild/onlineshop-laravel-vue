<?php

namespace Database\Factories;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;
use Faker\Factory as FakerFactory;
use Intervention\Image\ImageManagerStatic as Image;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $faker = FakerFactory::create('tj_TJ');

        $imageFolder = 'users';

        // ساخت پوشه اگر وجود نداشت
        if (!Storage::disk('public')->exists($imageFolder)) {
            Storage::disk('public')->makeDirectory($imageFolder);
        }

        // نام فایل رندوم
        $imageName = $this->faker->unique()->lexify('??????') . '.png';
        $imagePath = storage_path('app/public/' . $imageFolder . '/' . $imageName);

        // ساخت عکس ساده 640x480 با رنگ پس‌زمینه دلخواه
        $img = imagecreatetruecolor(640, 480);
        $bgColor = imagecolorallocate($img, rand(100, 255), rand(100, 255), rand(100, 255));
        imagefill($img, 0, 0, $bgColor);
        imagepng($img, $imagePath);
        imagedestroy($img);

        
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'user_image' => $imageFolder . '/' . $imageName,

            'remember_token' => Str::random(10),
            'description' => fake()->paragraph(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
