<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $array)
 * @property mixed $services
 */
class LoginCompany extends Model
{
    use HasFactory;

    protected $table = 'login_companies';
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'city',
        'state',
        'zip_code',
        'phone',
        'logo',
    ];

    // Relació inversa amb l'usuari
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function workers(): HasMany
    {
        return $this->hasMany(Worker::class, 'company_id');
    }
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'companies_services', 'login_company_id', 'service_id')
            ->using(CompanyService::class)
            ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo');
    }

    public function getLogoFromPivot($serviceId): ?string
    {
        $pivot = $this->services()->where('services.id', $serviceId)->first()->pivot ?? null;
        return $pivot ? $pivot->logo : null;
    }
}
