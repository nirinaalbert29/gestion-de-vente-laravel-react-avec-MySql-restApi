<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Edtemp;
use Illuminate\Http\Request;

class EdtController extends Controller
{
    function getEdt(){
        $edt = Edtemp::all();
        return response()->json([
            'status'=>200,
            'edts'=>$edt,
        ]);
    }
    function store(Request $request){
        $edt = new Edtemp();
        $edt->matiere = $request->input('matiere');
        $edt->date = $request->input('date');
        $edt->heure_debut = $request->input('heure_debut');
        $edt->heure_fin = $request->input('heure_fin');
        $edt->enseignant = $request->input('enseignant');
        $edt->parcours = $request->input('parcours');
        $edt->salle = $request->input('salle');
        $edt->save();
        return response()->json([
            'status' => 200,
            'message' => 'Emploi du temps ajouté avec succé',
        ]);
    }

    function edit($id,Request $request){
        $edt =  Edtemp::find($id);
        if($edt){
            return response()->json([
                'status' => 200,
                'edtemp'=> $edt,
            ]);
        }
         else{
            return response()->json([
                'status' => 404,
                'message'=> 'L\'Ed temps qui a cette Id n\'existe pas ',
            ]);
         }
    }
    public function update(Request $request,$id){
        $edt = Edtemp::find($id);
        $edt->matiere = $request->input('matiere');
        $edt->date = $request->input('date');
        $edt->heure_debut = $request->input('heure_debut');
        $edt->heure_fin = $request->input('heure_fin');
        $edt->enseignant = $request->input('enseignant');
        $edt->parcours = $request->input('parcours');
        $edt->salle = $request->input('salle');
        $edt->update();
        return response()->json([
            'status' => 200,
            'message' => 'Emploi du temps modifié avec succé',
        ]);
    }
    public function destroy($id){
        $edt = Edtemp::find($id);
        $edt->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Emploi du temps supprimé avec succé',
        ]);
    }
}
