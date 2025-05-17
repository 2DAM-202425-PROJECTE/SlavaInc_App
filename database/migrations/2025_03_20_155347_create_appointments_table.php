<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->foreignId('worker_id')->nullable()->constrained('workers')->onDelete('cascade');
            $table->date('date');
            $table->time('time');
            $table->decimal('price', 8, 2);
            $table->text('notes')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();

            // ✅ Aquí afegim la restricció única
            $table->unique(['worker_id', 'date', 'time'], 'unique_worker_schedule');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
