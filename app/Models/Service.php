<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @method static create(string[] $serviceData)
 * @method static findOrFail(mixed $service_id)
 */
class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
    ];

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(LoginCompany::class, 'companies_services', 'service_id', 'login_company_id')
            ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo');
    }
}
