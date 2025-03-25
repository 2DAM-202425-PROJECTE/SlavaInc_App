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
        Schema::create('companies_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('login_company_id')->constrained('login_companies')->onDelete('cascade');
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade');
            $table->decimal('price_per_unit', 8, 2)->nullable(); // Price per square meter or other unit
            $table->string('unit')->nullable(); // Permet unitats personalitzades
            $table->decimal('min_price', 8, 2)->nullable(); // Minimum price for the service
            $table->decimal('max_price', 8, 2)->nullable(); // Maximum price for the service
            $table->string('logo')->nullable(); // Company logo URL
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies_services');
    }
};
