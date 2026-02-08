<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;


class CategoryController extends Controller
{

     public function show(Request $request, $slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        // Pagination واقعی
        $products = $category->products()
            ->latest()
            ->paginate(20); // هر صفحه 8 محصول

        // والدین دسته‌بندی
        $breadcrumb = $category->parents()->push($category); // شامل خود category هم می‌شود

        return response()->json([
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'image' => $category->image,
            ],
            'products' => $category->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'image' => $product->image,
                ];
            }),
            'breadcrumb' => $breadcrumb->map(fn($c) => ['name' => $c->name, 'slug' => $c->slug])
        ]);
    }
}
