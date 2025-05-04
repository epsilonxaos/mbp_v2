<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
	protected $fillable = [
		'name',
		'slug',
		'description',
		'content',
	];

	public function galleries()
	{
		return $this->hasMany(PortfolioGallery::class);
	}
}
