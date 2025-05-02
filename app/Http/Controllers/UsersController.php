<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UsersController extends Controller
{
	public function show(Request $request)
	{
		return inertia('admin/users/usersModule', [
			'users' => $request->user()->all(),
		]);
	}

	public function create()
	{
		return inertia('admin/users/usersModuleCreateOrUpdate');
	}

	public function store(Request $request): RedirectResponse
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
			'password' => ['required', 'confirmed', Password::defaults()],
		]);

		$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password),
		]);

		event(new Registered($user));


		return to_route('admin.users.index')->with('success', 'Usuario creado con éxito');
	}

	public function edit(User $user)
	{
		return inertia('admin/users/usersModuleCreateOrUpdate', [
			'user' => $user,
		]);
	}

	public function update(Request $request, User $user): RedirectResponse
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|lowercase|email|max:255|unique:' . User::class . ',email,' . $user->id,
			'password' => ['nullable', 'confirmed', Password::defaults()],
		]);

		$user->update([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password),
		]);

		return to_route('admin.users.index')->with('success', 'Usuario actualizado con éxito');
	}

	public function destroy(User $user): RedirectResponse
	{
		$user->delete();

		return to_route('admin.users.index')->with('success', 'Usuario eliminado con éxito');
	}
}
