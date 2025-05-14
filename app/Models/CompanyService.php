<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CompanyService extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'service_id',
        'price_per_unit',
        'unit',
        'min_price',
        'max_price',
        'logo',
    ];

    protected $casts = [
        'price_per_unit' => 'float',
        'min_price' => 'float',
        'max_price' => 'float'
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'companies_services')
            ->using(CompanyService::class) // Añadir esta línea
            ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo')
            ->withTimestamps();
    }
}
