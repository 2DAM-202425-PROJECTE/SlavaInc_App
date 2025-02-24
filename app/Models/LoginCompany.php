<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $array)
 */
class LoginCompany extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'address',
        'city',
        'state',
        'zip_code',
        'phone',
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
        return $this->belongsToMany(Service::class, 'companies_services')
            ->withTimestamps();
    }
}
