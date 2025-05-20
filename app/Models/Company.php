<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property mixed $services
 * @method static create(array $array)
 * @method static findOrFail(int $companyId)
 * @property bool $is_admin
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
        'website',
        'description',
        'founded_year',
        'vat_number',
        'company_type',
        'plan_id',
        'notifications_system',
        'notifications_appointments',
        'notifications_reviews',
        'logo',
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

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'companies_services')
            ->withPivot(['id', 'price_per_unit', 'unit', 'min_price', 'max_price', 'logo', 'custom_name', 'description']);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function companyServices(): HasMany
    {
        return $this->hasMany(CompanyService::class);
    }
    public function reviews()
    {
        return $this->hasManyThrough(
            \App\Models\Review::class,
            \App\Models\CompanyService::class,
            'company_id',
            'company_service_id',
            'id',
            'id'
        );
    }
}
