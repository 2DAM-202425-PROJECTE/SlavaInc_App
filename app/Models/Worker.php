<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_id',
        'name',
        'schedule',
        'address',
        'city',
        'state',
        'zip_code',
        'phone'
    ];


    public function company()
    {
        return $this->belongsTo(LoginCompany::class, 'company_id');
    }
}
