<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CompanyService extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'login_company_id',
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
        return $this->belongsTo(LoginCompany::class, 'login_company_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
