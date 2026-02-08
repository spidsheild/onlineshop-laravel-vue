<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    

    protected $fillable = [
        'user_id',
        'paypal_order_id',
        'paypal_payer_id',
        'amount',
        'currency',
        'status',
        'paypal_response',
    ];

    protected $casts = [
        'paypal_response' => 'array',
    ];

}
