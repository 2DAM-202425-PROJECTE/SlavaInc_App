<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->json('features')->nullable();

            // Límits de funcionalitat
            $table->unsignedInteger('max_workers')->nullable();
            $table->unsignedInteger('max_services')->nullable();

            // Accessos extra
            $table->boolean('api_access')->default(false);
            $table->boolean('can_view_stats')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
