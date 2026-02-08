<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Faker\Factory as FakerFactory;
use Illuminate\Support\Facades\Storage;

class CategoryImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $faker = FakerFactory::create('tj_TJ');
        $imageFolder = 'categories';

        // ساخت پوشه اگر وجود نداشت
        if (!Storage::disk('public')->exists($imageFolder)) {
            Storage::disk('public')->makeDirectory($imageFolder);
        }

        Category::whereNull('image')->each(function ($category) use ($faker, $imageFolder) {

            $imageName = $faker->unique()->lexify('??????') . '.png';
            $imagePath = storage_path('app/public/' . $imageFolder . '/' . $imageName);

            // ساخت تصویر 640x480
            $img = imagecreatetruecolor(640, 480);
            $bgColor = imagecolorallocate(
                $img,
                rand(100, 255),
                rand(100, 255),
                rand(100, 255)
            );
            imagefill($img, 0, 0, $bgColor);

            imagepng($img, $imagePath);
            imagedestroy($img);

            $category->update([
                'image' => $imageFolder . '/' . $imageName,
            ]);
        });
    }
}
