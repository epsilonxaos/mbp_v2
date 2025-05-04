<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;

class AppController extends Controller
{
	public function index()
	{
		$portfolios = Portfolio::with('galleries')->get();

		return inertia('public/index', [
			'portfolios' => $portfolios,
		]);
	}

	public function about()
	{
		return inertia('public/about');
	}
}
