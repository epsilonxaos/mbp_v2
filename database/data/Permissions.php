<?php

use App\Enum\Permissions;

return [
	[
		'group' => 'Usuarios',
		'name' => Permissions::UserView->value,
		'title' => 'Ver usuarios'
	],
	[
		'group' => 'Usuarios',
		'name' => Permissions::UserCreate->value,
		'title' => 'Crear usuarios'
	],
	[
		'group' => 'Usuarios',
		'name' => Permissions::UserEdit->value,
		'title' => 'Editar usuarios'
	],
	[
		'group' => 'Usuarios',
		'name' => Permissions::UserDelete->value,
		'title' => 'Eliminar usuarios'
	],

	[
		'group' => 'Roles',
		'name' => Permissions::RoleView->value,
		'title' => 'Ver roles'
	],

	[
		'group' => 'Roles',
		'name' => Permissions::RoleCreate->value,
		'title' => 'Crear roles'
	],
	[
		'group' => 'Roles',
		'name' => Permissions::RoleEdit->value,
		'title' => 'Editar roles'
	],
	[
		'group' => 'Roles',
		'name' => Permissions::RoleDelete->value,
		'title' => 'Eliminar roles'
	],
];
