<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthHasRoles
{
    /**
     * Handle an incoming request.
     * Authorize all roles, separated by ","
     *
     * USAGE: middleware([auth.allrole:role1,role2])
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if($request->user() === null){
            return abort(401);
        }

        if($request->user()->hasRoles($roles)){
            return $next($request);
        }else{
            return abort(403);
        }
    }
}
