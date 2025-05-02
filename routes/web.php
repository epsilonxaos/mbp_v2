<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



// 🌐 Rutas públicas
Route::get('/', function () {
	return Inertia::render('public/welcome');
})->name('home');



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
