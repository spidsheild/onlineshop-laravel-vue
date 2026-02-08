<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //
    public function add(Request $request)
    {
        $cart = session()->get('cart', []);
        $id = $request->product_id;

        $cart[$id] = ($cart[$id] ?? 0) + 1;
        session()->put('cart', $cart);

        return response()->json($cart);
    }

    public function index()
    {
        return session('cart', []);
    }
}
