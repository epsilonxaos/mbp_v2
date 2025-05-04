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
	[
		'group' => 'Portafolio',
		'name' => Permissions::PortfolioView->value,
		'title' => 'Ver portafolio'
	],
	[
		'group' => 'Portafolio',
		'name' => Permissions::PortfolioCreate->value,
		'title' => 'Crear portafolio'
	],
	[
		'group' => 'Portafolio',
		'name' => Permissions::PortfolioEdit->value,
		'title' => 'Editar portafolio'
	],
	[
		'group' => 'Portafolio',
		'name' => Permissions::PortfolioDelete->value,
		'title' => 'Eliminar portafolio'
	],
];
