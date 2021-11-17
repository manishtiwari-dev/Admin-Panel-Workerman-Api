<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RolesController;
use App\Http\Controllers\Admin\PermissionController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



// UserController::class

Route::get('/', function () { return redirect('admin/dashboard');  });

Route::group(['prefix' => 'admin','middleware' => ['auth','CheckPermision'] ], function () {
	Route::get('/dashboard', function () { return view('admin.dashboard'); })->name('dashboard');
	Route::resource('user', UserController::class);
	Route::resource('role', RolesController::class);
	Route::resource('permission', PermissionController::class);

});

require __DIR__.'/auth.php';
