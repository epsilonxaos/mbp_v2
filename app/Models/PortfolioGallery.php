<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioGallery extends Model
{
	protected $fillable = [
		'portfolio_id',
		'image_path',
	];

	public function portfolio()
	{
		return $this->belongsTo(Portfolio::class);
	}

	public function getImageUrlAttribute()
	{
		return asset('storage/' . $this->image_path);
	}
}
