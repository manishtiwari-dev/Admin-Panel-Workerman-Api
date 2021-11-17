<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [UserController::class,'login']);

Route::group(['middleware' => ['ApiTokenCheck']], function() {

    Route::post('users', [UserController::class,'index']);
    Route::post('user/store', [UserController::class,'store']);

    Route::post('roles', [RolesController::class,'index']);
    Route::post('role/store', [RolesController::class,'store']);






});

