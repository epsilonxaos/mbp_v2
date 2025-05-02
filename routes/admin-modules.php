<?php

use App\Http\Controllers\RolePermissionsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware('auth')->group(function () {


	Route::prefix('/users')->group(function () {
		Route::get('/', [UsersController::class, 'show'])->name('admin.users.index');
		Route::get('/create', [UsersController::class, 'create'])->name('admin.users.create');
		Route::post('/create', [UsersController::class, 'store'])->name('admin.users.store');
		Route::get('/{user}', [UsersController::class, 'edit'])->name('admin.users.edit');
		Route::put('/{user}', [UsersController::class, 'update'])->name('admin.users.update');
		Route::delete('/{user}', [UsersController::class, 'destroy'])->name('admin.users.destroy');
	});


	Route::prefix('/roles')->group(function () {
		Route::get('/', [RolePermissionsController::class, 'show'])->name('admin.roles.index');
		Route::get('/create', [RolePermissionsController::class, 'create'])->name('admin.roles.create');
		Route::post('/create', [RolePermissionsController::class, 'store'])->name('admin.roles.store');
		Route::get('/{role}', [RolePermissionsController::class, 'edit'])->name('admin.roles.edit');
		Route::put('/{role}', [RolePermissionsController::class, 'update'])->name('admin.roles.update');
		Route::delete('/{role}', [RolePermissionsController::class, 'destroy'])->name('admin.roles.destroy');
	});
});
