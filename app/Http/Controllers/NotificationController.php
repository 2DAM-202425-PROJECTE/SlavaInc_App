<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function markAsRead($id)
    {
        $company = Auth::guard('company')->user();

        $notification = $company->notifications()->where('id', $id)->firstOrFail();
        $notification->update(['read' => true]);

        return response()->json(['success' => true]);
    }

    public function markAllAsRead()
    {
        $company = Auth::guard('company')->user();

        $company->notifications()->where('read', false)->update(['read' => true]);

        return response()->json(['success' => true]);
    }


}
