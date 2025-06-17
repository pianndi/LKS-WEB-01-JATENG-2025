<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstallmentController;
use App\Http\Controllers\ValidationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/logout', action: [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('validations', action: [ValidationController::class, 'store']);
        Route::get('validations', action: [ValidationController::class, 'index']);
        Route::get('installment_cars', action: [InstallmentController::class, 'index']);
        Route::get('installment_cars/{id}', action: [InstallmentController::class, 'show']);
        Route::post('applications', action: [InstallmentController::class, 'store']);
        Route::get('applications', action: [ApplicationController::class, 'index']);
    });
});
