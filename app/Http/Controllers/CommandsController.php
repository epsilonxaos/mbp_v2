<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class CommandsController extends Controller
{
	/**
	 * Run the database seeds.
	 */
	public function run()
	{
		Artisan::call('key:generate');
		Artisan::call('optimize:clear');
		Artisan::call('migrate');
		Artisan::call('db:seed', [
			'--class' => 'RolesAndPermissionsSeeder'
		]);
		Artisan::call('db:seed', [
			'--class' => 'UsersAdminSeeder'
		]);
		Artisan::call('storage:link');

		return 'Comandos ejecutados con exito';
	}
}
