<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
    use HasFactory;

    protected $fillable = [
        'worker_id',
        'service_id',
        'transaction_id',
        'review_id',
        'client_id',
        'date',
    ];

    // Relació amb el servei (una data pertany a un servei)
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    // Relació amb el client (una data pertany a un client)
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
