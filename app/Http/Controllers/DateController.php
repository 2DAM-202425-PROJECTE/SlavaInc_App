<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Date;

class DateController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id; // Obtenim l'usuari autenticat
        $dates = Date::with('service')->where('user_id', $userId)->get();

        return response()->json($dates);
    }
}
