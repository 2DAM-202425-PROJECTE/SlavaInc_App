<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static whereHas(string $string, \Closure $param)
 * @method static where(array[] $array)
 * @property mixed $client_id
 */
class Review extends Model
{
    protected $fillable = [
        'client_id',
        'company_service_id',
        'appointment_id',
        'rate',
        'comment',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function companyService(): BelongsTo
    {
        return $this->belongsTo(CompanyService::class, 'company_service_id', 'id');
    }
    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
