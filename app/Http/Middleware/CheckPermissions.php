<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckPermissions
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
	 */
	public function handle(Request $request, Closure $next, string $permission): Response
	{
		$user = Auth::user();

		if (!$user || !$user->hasPermissionTo($permission)) {
			return redirect()->route('admin.dashboard')->withErrors(['message' => 'No tienes permiso para acceder a esta página.']);
		}

		return $next($request);
	}
}
