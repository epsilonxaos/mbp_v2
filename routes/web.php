<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



// 🌐 Rutas públicas

Route::get('/', function () {
	return Inertia::render('public/index');
})->name('home');
Route::get('/contact', function () {
	return Inertia::render('public/contact');
})->name('contact');



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin-modules.php';
