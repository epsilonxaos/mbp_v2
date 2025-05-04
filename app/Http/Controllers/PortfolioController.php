<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\PortfolioGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PortfolioController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$portfolios = Portfolio::orderBy('created_at', 'desc')->get();

		return inertia('admin/portfolio/portfolioModule', [
			'portfolios' => $portfolios,
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		return inertia('admin/portfolio/portfolioModuleCreateOrUpdate');
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'slug' => 'required|string|max:255|unique:portfolios,slug',
			'description' => 'nullable|string|max:255',
			'content' => 'nullable|string',
			'galleries' => 'nullable|array',
		]);

		Log::info('Request data: ', $request->all());

		$portfolio = Portfolio::create($request->all());

		if ($request->hasFile('galleries')) {
			foreach ($request->file('galleries') as $file) {
				$path = $file->store('portfolios', 'public');

				PortfolioGallery::create([
					'portfolio_id' => $portfolio->id,
					'image_path' => $path,
				]);
			}
		}

		return to_route('admin.portfolio.index')->with('success', 'Portafolio creado con éxito');
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Portfolio $portfolio)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Portfolio $portfolio)
	{
		return inertia('admin/portfolio/portfolioModuleCreateOrUpdate', [
			'portfolio' => $portfolio->load('galleries'),
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Portfolio $portfolio)
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'slug' => 'required|string|max:255|unique:portfolios,slug,' . $portfolio->id . ',id',
			'description' => 'nullable|string|max:255',
			'content' => 'nullable|string',
			'galleries' => 'nullable|array',
		], [
			'name.required' => 'El nombre es obligatorio',
			'name.string' => 'El nombre debe ser una cadena de texto',
			'name.max' => 'El nombre no puede tener más de 255 caracteres',
			'slug.required' => 'El slug es obligatorio',
			'slug.string' => 'El slug debe ser una cadena de texto',
			'slug.max' => 'El slug no puede tener más de 255 caracteres',
			'slug.regex' => 'El slug solo puede contener letras, números, guiones y guiones bajos',
			'slug.unique' => 'El slug ya está en uso',
			'galleries.array' => 'Las galerías deben ser un arreglo de imágenes',
		]);

		// Log::info('Request data: ', $request->data);
		Log::info('Request data: ', $request->all());

		$portfolio->update($request->all());

		if ($request->hasFile('galleries')) {
			foreach ($request->file('galleries') as $file) {
				$path = $file->store('portfolios', 'public');

				PortfolioGallery::create([
					'portfolio_id' => $portfolio->id,
					'image_path' => $path,
				]);
			}
		}

		return to_route('admin.portfolio.index')->with('success', 'Portafolio actualizado con éxito');
	}

	/**
	 * Remove the specified image from the portfolio.
	 */

	public function destroyImage(PortfolioGallery $portfolioGallery)
	{
		if ($portfolioGallery->image_path) {
			$path = public_path('storage/' . $portfolioGallery->image_path);
			if (file_exists($path)) {
				unlink($path);
			}
		}

		$portfolioGallery->delete();
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Portfolio $portfolio)
	{
		$portfolio->galleries()->delete();
		$portfolio->delete();

		return to_route('admin.portfolio.index')->with('success', 'Portafolio eliminado con éxito');
	}
}
