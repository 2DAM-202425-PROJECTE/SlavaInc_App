<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @method static where(string $string, mixed $company_id)
 */
class CompanyService extends Pivot
{
    use HasFactory;
    // Permet que el pivot tingui id autoincremental
    public $incrementing = true;
    protected $primaryKey = 'id';

    // Especificar el nombre de la tabla
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
        'custom_name',
        'description',
    ];

    protected $casts = [
        'price_per_unit' => 'float',
        'min_price'      => 'float',
        'max_price'      => 'float',
    ];

    /**
     * Relació amb empresa
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    /**
     * Relació amb servei
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    /**
     * Relació many-to-many inversa (si cal)
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'companies_services')
            ->using(CompanyService::class)
            ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo')
            ->withTimestamps();
    }

    /** Ressenyes associades */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'company_service_id');
    }
}
