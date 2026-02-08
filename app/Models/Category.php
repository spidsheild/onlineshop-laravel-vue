<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{

  protected $fillable = [
    'name',
    'slug',
    'image'
  ];

  public function products()
  {
    return $this->hasMany(Product::class);
  }

  protected static function booted()
  {
    static::creating(function ($category) {
      $category->slug = Str::slug($category->name);
    });
  }

  // App/Models/Category.php
  public function parent()
  {
    return $this->belongsTo(Category::class, 'parent_id');
  }

  public function parents()
  {
    $parents = collect();
    $category = $this;
    while ($category->parent) {
      $parents->prepend($category->parent);
      $category = $category->parent;
    }
    return $parents;
  }

}
