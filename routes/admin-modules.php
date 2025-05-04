<?php

use App\Enum\Permissions;
use App\Http\Controllers\RolePermissionsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware('auth')->group(function () {


	Route::prefix('/users')->group(function () {
		Route::get('/', [UsersController::class, 'show'])->middleware('permissions:' . Permissions::UserView->value)->name('admin.users.index');
		Route::get('/create', [UsersController::class, 'create'])->middleware('permissions:' . Permissions::UserCreate->value)->name('admin.users.create');
		Route::post('/create', [UsersController::class, 'store'])->middleware('permissions:' . Permissions::UserCreate->value)->name('admin.users.store');
		Route::get('/{user}', [UsersController::class, 'edit'])->middleware('permissions:' . Permissions::UserEdit->value)->name('admin.users.edit');
		Route::put('/{user}', [UsersController::class, 'update'])->middleware('permissions:' . Permissions::UserEdit->value)->name('admin.users.update');
		Route::delete('/{user}', [UsersController::class, 'destroy'])->middleware('permissions:' . Permissions::UserDelete->value)->name('admin.users.destroy');
	});


	Route::prefix('/roles')->group(function () {
		Route::get('/', [RolePermissionsController::class, 'show'])->middleware('permissions:' . Permissions::RoleView->value)->name('admin.roles.index');
		Route::get('/create', [RolePermissionsController::class, 'create'])->middleware('permissions:' . Permissions::RoleCreate->value)->name('admin.roles.create');
		Route::post('/create', [RolePermissionsController::class, 'store'])->middleware('permissions:' . Permissions::RoleCreate->value)->name('admin.roles.store');
		Route::get('/{role}', [RolePermissionsController::class, 'edit'])->middleware('permissions:' . Permissions::RoleEdit->value)->name('admin.roles.edit');
		Route::put('/{role}', [RolePermissionsController::class, 'update'])->middleware('permissions:' . Permissions::RoleEdit->value)->name('admin.roles.update');
		Route::delete('/{role}', [RolePermissionsController::class, 'destroy'])->middleware('permissions:' . Permissions::RoleDelete->value)->name('admin.roles.destroy');
	});
});
