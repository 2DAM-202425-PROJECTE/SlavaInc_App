<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CompanyService extends Pivot
{
    use HasFactory;

    // Indicar que la tabla tiene un ID autoincremental
    public $incrementing = true;

    // Especificar el nombre de la tabla
    protected $table = 'companies_services';

    protected $fillable = [
        'company_id',
        'service_id',
        'price_per_unit',
        'unit',
        'min_price',
        'max_price',
        'logo',
        'custom_name',
        'description',
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

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
