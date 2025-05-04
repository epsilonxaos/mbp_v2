<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\CommandsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



// 🌐 Rutas públicas
Route::get('/', [AppController::class, 'index'])->name('home');
Route::get('/about', [AppController::class, 'about'])->name('about');
Route::get('/artisan', [CommandsController::class, 'run'])->name('artisan');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin-modules.php';
