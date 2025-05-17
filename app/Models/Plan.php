<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'price',
        'features',
        'max_workers',
        'max_services',
        'api_access',
        'can_view_stats',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    public function companies()
    {
        return $this->hasMany(Company::class);
    }
}
