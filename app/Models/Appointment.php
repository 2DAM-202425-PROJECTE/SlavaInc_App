<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'service_id',
        'company_service_id',
        'worker_id',
        'date',
        'time',
        'price',
        'notes',
        'status'
    ];

    protected $casts = [
        'date' => 'date',
        'price' => 'decimal:2'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function workers(): BelongsToMany
    {
        return $this->belongsToMany(Worker::class);
    }

    public function companyService(): BelongsTo
    {
        return $this->belongsTo(CompanyService::class, 'company_service_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'appointment_id');
    }
}
