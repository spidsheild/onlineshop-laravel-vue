<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class PurchaseController extends Controller
{

    public function index(Request $request)
    {
        $orders = Order::where('user_id', auth()->id())
            ->with('items:id,order_id,title,price,quantity')
            ->orderByDesc('created_at')
            ->paginate(5); // هر صفحه 5 خرید

        return response()->json($orders);
    }

}
