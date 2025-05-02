<?php

namespace Database\Seeders;

use App\Enum\Permissions;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::statement('SET FOREIGN_KEY_CHECKS=0;');
		Role::truncate();
		Permission::truncate();
		DB::statement('SET FOREIGN_KEY_CHECKS=1;');

		$admin = Role::create(['name' => 'Administrador']);
		$op = Role::create(['name' => 'Operativo']);

		$permissions = include __DIR__ . '/../data/Permissions.php';

		foreach ($permissions as $permission) {
			$perm = Permission::create($permission);
			$admin->givePermissionTo($perm);
		}

		$op->givePermissionTo([
			Permissions::UserView->value,
			Permissions::UserCreate->value,
			Permissions::UserEdit->value,
			Permissions::UserDelete->value,
		]);

		$users = [
			'jesusgleztr94@gmail.com' => 'Administrador',
			'cesar@madeby.partners' => 'Operativo',
		];

		foreach ($users as $username => $role) {
			$user = User::where('email', $username)->first();
			if ($user) {
				$user->assignRole($role);
			}
		}
	}
}
