<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property bool $is_admin // 👈 Documenta la propietat
 */
class Company extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'city',
        'state',
        'zip_code',
        'phone',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relació amb els treballadors
    public function workers(): HasMany
    {
        return $this->hasMany(Worker::class, 'company_id');
    }
    public function services()
    {
        return $this->belongsToMany(Service::class, 'companies_services')
            ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo');
    }


}
