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
        Schema::create('edtemps', function (Blueprint $table) {
            $table->id();
            $table->string("matiere");
            $table->string("date");
            $table->string("heure_debut");
            $table->string("heure_fin");
            $table->string("enseignant");
            $table->string("parcours");
            $table->string("salle");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edtemps');
    }
};
