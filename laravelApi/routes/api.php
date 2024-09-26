<?php

use App\Http\Controllers\API\EdtController;
use App\Http\Controllers\API\EtudiantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/add-student',[EtudiantController::class,'store']);
Route::get('/students',[EtudiantController::class,'index']);
Route::get('/edit-student/{id}',[EtudiantController::class,'edit']);
Route::put('/update-student/{id}',[EtudiantController::class,'update']);
Route::delete('/delete-student/{id}',[EtudiantController::class,'destroy']);

Route::post('/add-edt',[EdtController::class,'store']);
Route::get('/edtemps',[EdtController::class,'getEdt']);
Route::get('/edit-edt/{id}',[EdtController::class,'edit']);
Route::put('/update-edt/{id}',[EdtController::class,'update']);
Route::delete('/delete-edt/{id}',[EdtController::class,'destroy']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
