<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Illuminate\Support\Facades\Log;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
class PaypalController extends Controller
{
    public function createPayment(Request $request)
    {
        // اگر دوست داری ساخت‌یافته‌تر (حرفه‌ای‌تر) باشه 👌
        session([
            'checkout' => [
                'user_id' => auth()->id(),
                'items' => $request->items,
            ]
        ]);

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAccessToken();
        $provider->setAccessToken($token);

        $items = [];
        $total = 0;

        foreach ($request->items as $item) {
            $price = number_format($item['price'], 2, '.', '');
            $qty = (int) $item['quantity'];

            $items[] = [
                'name' => $item['title'],
                'unit_amount' => [
                    'currency_code' => 'USD',
                    'value' => $price,
                ],
                'quantity' => (string) $qty,
            ];

            $total += $price * $qty;
        }

        $order = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => url('/paypal/success'),
                "cancel_url" => url('/paypal/cancel'),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => number_format($total, 2, '.', ''),
                        "breakdown" => [
                            "item_total" => [
                                "currency_code" => "USD",
                                "value" => number_format($total, 2, '.', '')
                            ]
                        ]
                    ],
                    "items" => $items
                ]
            ]
        ]);

        return response()->json([
            'approval_url' => collect($order['links'])
                ->where('rel', 'approve')
                ->first()['href']
        ]);
    }



    // 🛠 اصلاح نهایی متد success (نسخه امن)
// 🔥 نسخه اصلاح‌شده
    public function success(Request $request)
    {
        try {
            if (!$request->has('token')) {
                throw new \Exception('PayPal token not found');
            }

            $checkout = session('checkout');

            if (!$checkout || empty($checkout['items'])) {
                throw new \Exception('Checkout session expired');
            }

            $provider = new PayPalClient;
            $provider->setApiCredentials(config('paypal'));
            $provider->getAccessToken();

            $response = $provider->capturePaymentOrder($request->token);

            Log::info('PAYPAL RESPONSE', $response);

            if ($response['status'] !== 'COMPLETED') {
                throw new \Exception('Payment not completed');
            }

            DB::beginTransaction();

            $payment = $response['purchase_units'][0]['payments']['captures'][0];

            $order = Order::firstOrCreate(
                ['paypal_order_id' => $response['id']],
                [
                    'user_id' => $checkout['user_id'],
                    'amount' => $payment['amount']['value'],
                    'currency' => $payment['amount']['currency_code'],
                    'status' => 'paid',
                    'paypal_response' => $response,
                ]
            );

            foreach ($checkout['items'] as $item) {

                // 1️⃣ گرفتن محصول
                $product = Product::findOrFail($item['product_id']);

                // 2️⃣ بررسی موجودی
                if ($product->stock < $item['quantity']) {
                    throw new \Exception('موجودی کالا کافی نیست');
                }

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'title' => $item['title'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                ]);

                // 4️⃣ کم کردن موجودی
                $product->decrement('stock', $item['quantity']);

            }


            session()->forget('checkout');

            DB::commit();

            return redirect(
                config('app.frontend_url') . '/payment-result?status=success'
            );

        } catch (\Throwable $e) {

            DB::rollBack();

            Log::error('PAYPAL ERROR', [
                'message' => $e->getMessage()
            ]);

            return redirect(
                config('app.frontend_url') .
                '/payment-result?status=error&message=' .
                urlencode($e->getMessage())
            );
        }
    }

}
