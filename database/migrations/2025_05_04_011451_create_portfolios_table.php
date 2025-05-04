<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('portfolios', function (Blueprint $table) {
			$table->id();
			$table->string('name')->nullable();
			$table->string('slug')->unique();
			$table->string('description')->nullable();
			$table->longText('content')->nullable();
			$table->timestamps();
		});

		Schema::create('portfolio_galleries', function (Blueprint $table) {
			$table->id();
			$table->foreignId('portfolio_id')->constrained()->onDelete('cascade');

			$table->string('image_path')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('portfolio_galleries');
		Schema::dropIfExists('portfolios');
	}
};
