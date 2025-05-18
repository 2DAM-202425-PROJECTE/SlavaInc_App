<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CompanyService extends Pivot
{
    use HasFactory;

    public $incrementing = true;
    protected $primaryKey = 'id';
    protected $table = 'companies_services';

    protected $fillable = [
        'company_id',
        'service_id',
        'custom_name',
        'description',
        'price_per_unit',
        'unit',
        'min_price',
        'max_price',
        'logo',
    ];

    protected $casts = [
        'price_per_unit' => 'float',
        'min_price' => 'float',
        'max_price' => 'float',
    ];

    /**
     * Empresa associada a aquest servei
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    /**
     * Servei associat a aquesta empresa
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    /**
     * Ressenyes del servei ofert per l'empresa
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'company_service_id');
    }
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'companies_services')
            ->using(CompanyService::class)
            ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo')
            ->withTimestamps();
    }
}
