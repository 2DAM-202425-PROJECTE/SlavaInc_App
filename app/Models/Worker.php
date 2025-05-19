<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // Heretar de Authenticatable
use Illuminate\Notifications\Notifiable; // Afegir Notifiable
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @method static create(array $array)
 * @method static where(string $string, mixed $company_id)
 */
class Worker extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Atributs que es poden assignar massivament.
     *
     * @var list<string>
     */
    protected $fillable = [
        'company_id',
        'name',
        'email',
        'password',
        'phone',
        'schedule',
        'address',
        'city',
        'state',
        'zip_code',
        'is_admin',
        'status',
    ];

    /**
     * Atributs que s'han de mantenir ocults per a la serialització.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Els atributs que s'han de convertir.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relació amb el model Company.
     */
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function appointments()
    {
        return $this->belongsToMany(Appointment::class);
    }
}
