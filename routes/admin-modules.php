<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware('auth')->group(function () {


	Route::prefix('users')->group(function () {
		Route::get('/', [UsersController::class, 'show'])->name('admin.users.index');
		Route::get('/create', [UsersController::class, 'create'])->name('admin.users.create');
		Route::post('/create', [UsersController::class, 'store'])->name('admin.users.store');
		Route::get('/{user}', [UsersController::class, 'edit'])->name('admin.users.edit');
		Route::put('/{user}', [UsersController::class, 'update'])->name('admin.users.update');
		Route::delete('/{user}', [UsersController::class, 'destroy'])->name('admin.users.destroy');
	});

	// Route::get('/users', [UsersController::class, 'show'])->name('admin.users.show');
});
