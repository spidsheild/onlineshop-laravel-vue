<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class FavoriteController extends Controller
{
    //
    public function index(Request $request)
    {
        return $request->user()
            ->favorites()
            ->with('favoritedBy')
            ->get();
    }

    public function toggle(Product $product, Request $request)
    {
        $user = $request->user();

        if ($user->favorites()->where('product_id', $product->id)->exists()) {
            $user->favorites()->detach($product->id);
            return response()->json(['favorited' => false]);
        }

        $user->favorites()->attach($product->id);
        return response()->json(['favorited' => true]);
    }
}
