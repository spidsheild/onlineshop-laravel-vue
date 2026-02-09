<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PaypalController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/test', function () {
    // return view('welcome');

});

Route::get('/paypal/success', [PaypalController::class, 'success']);
Route::get('/paypal/cancel', [PaypalController::class, 'cancel']);


// Ҳамаи суроғаҳо (/ , /shop , /product/1 ва ...)

// Ҳамаро ба як view воҳид мефиристад

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!paypal).*$');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/logout',   [AuthController::class, 'logout']);
