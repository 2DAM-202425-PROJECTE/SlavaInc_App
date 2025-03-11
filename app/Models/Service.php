<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @method static create(string[] $serviceData)
 * @method static pluck(string $string)
 * @method static withCount(string $string)
 */
class Service extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'type'];

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(LoginCompany::class, 'companies_services')
            ->withTimestamps();
    }

    // Relació amb les dates (una servei pot tenir moltes dates)
    public function dates()
    {
        return $this->hasMany(Date::class);
    }
}
