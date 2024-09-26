<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtudiantController extends Controller
{
    public function index(){
        $etudiants= Etudiant::all();
        return response()->json([
            'status'=> 200,
            'etudiants'=> $etudiants
        ]);
    }

    public function store(Request $request){
        $validator= Validator::make($request->all(),[
            'nom' => 'required|max:191',
            'prenom' => 'required|max:191',
            'classe' => 'required|max:191',
            'email' => 'required|email|max:191',
            'tel' => 'required|min:10',
        ]);

        if($validator -> fails()){
            return response()->json([
                'validate_err'=> $validator->messages(),
            ]);
        }
        else{
            $etudiant = new Etudiant();
            $etudiant->nom = $request->input('nom');
            $etudiant->prenom = $request->input('prenom');
            $etudiant->classe = $request->input('classe');
            $etudiant->email = $request->input('email');
            $etudiant->tel = $request->input('tel');
            $etudiant->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Etudiant ajouté avec succé',
            ]);
        }
        
    }

    public function edit($id){
        $etudiant = Etudiant::find($id);
        if($etudiant){
            return response()->json([
                'status' => 200,
                'etudiant'=> $etudiant,
            ]);
        }
         else{
            return response()->json([
                'status' => 404,
                'message'=> 'L\'étudiant qui a cette Id n\'existe pas ',
            ]);
         }
    }

    public function update(Request $request,$id){
        $validator= Validator::make($request->all(),[
            'nom' => 'required|max:191',
            'prenom' => 'required|max:191',
            'classe' => 'required|max:191',
            'email' => 'required|email|max:191',
            'tel' => 'required|min:10',
        ]);

        if($validator -> fails()){
            return response()->json([
                'validate_err'=> $validator->messages(),
            ]);
        }
        else{
            
            $etudiant = Etudiant::find($id);

            if($etudiant){
                $etudiant->nom = $request->input('nom');
                $etudiant->prenom = $request->input('prenom');
                $etudiant->classe = $request->input('classe');
                $etudiant->email = $request->input('email');
                $etudiant->tel = $request->input('tel');
                $etudiant->update();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Etudiant modifié avec succé',
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Cet Etudiant n\'existe pas',
                ]);
            }
            
        }
        
    }
    public function destroy($id){
        $etudiant = Etudiant::find($id);
        $etudiant->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Etudiant supprimé avec succé',
        ]);
    }
}
