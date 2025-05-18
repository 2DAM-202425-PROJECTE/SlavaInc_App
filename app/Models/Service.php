<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @method static findOrFail(array|string|null $query)
 * @method static find(int|string $serviceTypeOrId)
 * @method static where(string $string, int|string $serviceTypeOrId)
 * @property mixed $id
 */
class Service extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'type'];

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'companies_services')
            ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo', 'custom_name', 'description');
    }


    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // Relació amb les dates (una servei pot tenir moltes dates)
    public function dates()
    {
        return $this->hasMany(Date::class);
    }
}
