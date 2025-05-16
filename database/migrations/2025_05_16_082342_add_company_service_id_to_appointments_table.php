<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->foreignId('company_service_id')
                ->nullable()
                ->constrained('companies_services')
                ->onDelete('cascade')
                ->after('service_id');
        });
    }

    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropForeign(['company_service_id']);
            $table->dropColumn('company_service_id');
        });
    }
};
