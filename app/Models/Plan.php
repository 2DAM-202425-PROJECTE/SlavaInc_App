<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string, string $string1)
 */
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
