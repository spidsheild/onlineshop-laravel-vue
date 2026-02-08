<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Product extends Model
{
    // برای اینکه لاراول متد factory() را بشناسد
    use HasFactory;
   
    protected $fillable = [
        'title',
        'description',
        'price',
        'stock',
        'image',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    protected $casts = [
        'price' => 'float',
        // 'price' => 'decimal:2',
    ];

}
