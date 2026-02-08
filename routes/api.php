<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\CategoryController;
use App\Models\Category;
use App\Http\Controllers\Api\PurchaseController;


Route::get('/topproducts', [App\Http\Controllers\Api\ProductController::class, 'topIndex']);
Route::get('/products/{id}', [App\Http\Controllers\Api\ProductController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/cart/add', [App\Http\Controllers\Api\CartController::class, 'add']);
    Route::post('/checkout', [App\Http\Controllers\Api\OrderController::class, 'store']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/paypal/create-payment', [PaypalController::class, 'createPayment']);
});
Route::get('/paypal/success', [PaypalController::class, 'success']);
Route::get('/paypal/cancel', [PaypalController::class, 'cancel']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('order', [App\Http\Controllers\Api\OrderController::class, 'store']);
});

// روت‌های محافظت‌شده باید در api.php باشند
Route::middleware('auth:sanctum')->group(function () {

    // اطلاعات کاربر لاگین‌شده
    Route::get('/user', [UserController::class, 'me']);

    // ویرایش پروفایل
    Route::put('/user/profile', [UserController::class, 'update']);

    // خروج از حساب
    Route::post('/logout', [AuthController::class, 'logout']);

});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/{product}/toggle', [FavoriteController::class, 'toggle']);
});

Route::get('/categories/{slug}', [CategoryController::class, 'show']);


Route::middleware('auth:sanctum')->get('/purchases', [PurchaseController::class, 'index']);


// // routes/api.php
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
