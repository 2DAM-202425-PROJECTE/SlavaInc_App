<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function workers()
    {
        return $this->hasMany(Worker::class, 'company_id');
    }
}
