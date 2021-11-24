<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\PermissionController;

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

    Route::post('users', [UserController::class,'index'])   ;
    Route::post('user/edit', [UserController::class,'edit'])   ;
    Route::post('user/store', [UserController::class,'store']);
    Route::post('user/update', [UserController::class,'update']);
    Route::post('user/delete', [UserController::class,'destroy']);

    Route::post('roles', [RolesController::class,'index']);
    Route::post('role/store', [RolesController::class,'store']);
    Route::post('role/edit', [RolesController::class,'edit']);
    Route::post('role/update', [RolesController::class,'update']);
    Route::post('role/delete', [RolesController::class,'destroy']);

    Route::post('permissions', [PermissionController::class,'index']);
    





});

