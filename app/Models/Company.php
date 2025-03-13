<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
        'is_admin',
        'is_company'
    ];

    // Relació amb els treballadors
    public function workers(): HasMany
    {
        return $this->hasMany(Worker::class, 'company_id');
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean', // Converteix el camp a booleà
            'is_company' => 'boolean', // Converteix el camp a booleà
        ];
    }

    /**
     * Verifica si l'usuari és un admin.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->is_admin; // Retorna true si l'usuari és admin
    }
}
