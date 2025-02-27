<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'worker_id',
        'name',
        'email',
        'phone',
        'address',
        'is_admin',
        'is_company',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function worker()
    {
        return $this->belongsTo(Company::class, 'worker_id');
    }
}
