<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            // Identificació bàsica
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();

            // Dades de contacte
            $table->string('phone')->nullable();
            $table->string('website')->nullable();

            // Adreça
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip_code')->nullable();

            // Visuals
            $table->string('logo')->nullable();
            $table->text('description')->nullable();

            // Informació comercial
            $table->year('founded_year')->nullable();
            $table->string('vat_number')->nullable(); // NIF / CIF / VAT
            $table->string('company_type')->nullable(); // SL, SA, Autònom, etc.
            $table->boolean('is_verified')->default(false); // Validació per part d'admins
            $table->boolean('is_active')->default(true); // Activa/inactiva

            // Localització precisa (opcional)
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            // Altres
            $table->text('notes')->nullable(); // Notes internes, observacions...

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
