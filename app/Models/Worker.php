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
        'password',
        'email',
        'phone',
        'address',
        'is_admin',
        'is_company',
    ];

    // Relació amb la Company
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
