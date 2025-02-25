<?php

use App\Http\Controllers\DateController;

Route::get('/dates', [DateController::class, 'index']);

