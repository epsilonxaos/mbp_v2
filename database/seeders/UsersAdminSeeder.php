<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersAdminSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		User::truncate();

		User::create([
			'name' => 'Jesus Gonzalez',
			'email' => 'jesusgleztr94@gmail.com',
			'password' => Hash::make('password'),
			'email_verified_at' => now(),
		]);

		User::create([
			'name' => 'Cesar Octavio Sosa',
			'email' => 'cesar@madeby.partners',
			'password' => Hash::make('password'),
			'email_verified_at' => now(),
		]);
	}
}
