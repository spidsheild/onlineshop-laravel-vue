<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Faker\Factory as FakerFactory;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Str;
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        $faker = FakerFactory::create('tj_TJ');

        $imageFolder = 'products';

        // ساخت پوشه اگر وجود نداشت
        if (!Storage::disk('public')->exists($imageFolder)) {
            Storage::disk('public')->makeDirectory($imageFolder);
        }

        // نام فایل رندوم
        $imageName = $faker->unique()->lexify('??????') . '.png';
        $imagePath = storage_path('app/public/' . $imageFolder . '/' . $imageName);

        // ساخت عکس ساده 640x480 با رنگ پس‌زمینه دلخواه
        $img = imagecreatetruecolor(640, 480);
        $bgColor = imagecolorallocate($img, rand(100, 255), rand(100, 255), rand(100, 255));
        imagefill($img, 0, 0, $bgColor);
        imagepng($img, $imagePath);
        imagedestroy($img);

        return [
            'title' => $faker->randomElement([
                'Телефони ҳушманд',
                'Компютери дастӣ',
                'Гӯшмонаки бесим',
                'Соати ҳушманд',
                'Планшети рақамӣ',
                'Камераи рақамӣ',
            ]),
            // 'description' => $faker->paragraph(),
            'description' => $faker->randomElement([
                'Ин маҳсулот сифати баланд дошта, барои истифодаи ҳаррӯза мувофиқ аст.',
                'Маҳсулоти муосир бо тарҳи зебо ва кори устувор.',
                'Бо кафолати расмӣ ва нархи дастрас пешниҳод мегардад.',
                'Барои кор ва фароғат интихоби беҳтарин мебошад.',
            ]),

            'price' => $faker->randomFloat(2, 1, 5),
            'stock' => $faker->numberBetween(1, 200),
            'category_id' => Category::inRandomOrder()->first()->id,
            'image' => $imageFolder . '/' . $imageName,
        ];
    }
}
