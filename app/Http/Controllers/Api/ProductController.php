<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    //
    public function topIndex()
    {
        return Product::with('category')->get();
    }

    public function show($id)
    {
        return Product::with('category')->findOrFail($id);
    }


    public function index(Request $request)
    {
        $query = Product::query()->with('category');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $products = $query->latest()->paginate(28);

        return response()->json([
            'products' => $products, // شامل data + meta + links
            'categories' => Category::all(),
        ]);
    }

}
