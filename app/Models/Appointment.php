<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'service_id',
        'date',
        'time',
        'price',
        'notes',
        'status'
    ];

    // Afegeix aquestes relacions:
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(LoginCompany::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

}
