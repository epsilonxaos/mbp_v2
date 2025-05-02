<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
	public function show(Request $request)
	{
		return inertia('admin/users/userList', [
			'users' => $request->user()->all(),
		]);
	}
}
