<?php

namespace App\Enum;

enum Permissions: string
{
	case UserCreate = 'user.create';
	case UserEdit = 'user.edit';
	case UserDelete = 'user.delete';
	case UserView = 'user.view';

	case RoleCreate = 'role.create';
	case RoleEdit = 'role.edit';
	case RoleDelete = 'role.delete';
	case RoleView = 'role.view';
}
