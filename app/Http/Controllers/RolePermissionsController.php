<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionsController extends Controller
{
	public function show()
	{
		$roles = Role::all();
		return inertia('admin/permissions/rolesAndPermissions', [
			'roles' => $roles,
		]);
	}

	public function create()
	{
		$permissions = Permission::select('id', 'name', 'group', 'title')->get();
		return inertia('admin/permissions/rolesCreateOrUpdate', [
			'permissions' => $permissions,
		]);
	}

	public function store(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:255|unique:roles,name',
			'permissions' => 'required|array',
		]);

		$role = Role::create(['name' => $request->name, 'guard_name' => 'web']);
		if ($request->has('permissions')) {
			$role->syncPermissions($request->permissions);
		}


		return to_route('admin.roles.index')->with('success', 'Rol creado con éxito');
	}

	public function edit(Role $role)
	{
		$permissions = Permission::select('id', 'name', 'group', 'title')->get();
		$role->load('permissions');
		$role->permissions = $role->permissions->pluck('id')->toArray();
		return inertia('admin/permissions/rolesCreateOrUpdate', [
			'rol' => $role,
			'permissions' => $permissions,
		]);
	}

	public function update(Request $request, Role $role)
	{
		$request->validate([
			'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
			'permissions' => 'required|array',
		]);

		$role->update(['name' => $request->name]);
		$role->syncPermissions([]);
		if ($request->has('permissions')) {
			$role->syncPermissions($request->permissions);
		}

		return to_route('admin.roles.index')->with('success', 'Rol actualizado con éxito');
	}
}
