<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;
class OrderController extends Controller
{
    //
    public function store(Request $request)
    {
        $cart = session('cart');

        $order = Order::create([
            'user_id' => $request->user()->id,
            'total_price' => 0
        ]);

        $total = 0;

        foreach ($cart as $productId => $qty) {
            $product = Product::find($productId);
            $total += $product->price * $qty;

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $productId,
                'quantity' => $qty,
                'price' => $product->price
            ]);
        }

        $order->update(['total_price' => $total]);
        session()->forget('cart');

        return response()->json($order);
    }
}
