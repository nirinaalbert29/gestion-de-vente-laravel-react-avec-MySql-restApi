import axios from 'axios';
import React,{Component} from 'react';

import {Link} from 'react-router-dom';

import Swal from 'sweetalert2';

class Student extends Component 
{

    state = {
        etudiants:[],
        loading:true,
    }
    async componentDidMount(){
        const res = await axios.get('http://localhost:8000/api/students');
        if(res.data.status === 200){
            this.setState({
                etudiants:res.data.etudiants,
                loading :false,
            });
        }
    }

    deleteStudent = async (e, id) => {
        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Deleting";
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cet étudiant ?',
            text: 'Cette action est irréversible !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:8000/api/delete-student/${id}`);
                    if (res.data.status === 200) {
                        // Mettre à jour l'état de la liste des étudiants si nécessaire
                        // removeStudentFromList(id);

                        thidClickedFunda.closest("tr").remove();
    
                        Swal.fire(
                            'Supprimé !',
                            res.data.message,
                            'success'
                        );
                    }
                } catch (error) {
                    console.error('Erreur lors de la suppression de l\'étudiant :', error);
                    Swal.fire(
                        'Erreur !',
                        `Une erreur s'est produite lors de la suppression de l'étudiant : ${error.message}`,
                        'error'
                    );
                }
            }
        });
    };
    

    render(){

        var student_HTML_TABLE="";
        if(this.state.loading){
            student_HTML_TABLE=<tr><td colSpan={8}><h2>Loading...</h2></td></tr>
        }
        else{
            student_HTML_TABLE=
            this.state.etudiants.map( (item) =>{
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nom}</td>
                        <td>{item.prenom}</td>
                        <td>{item.classe}</td>
                        <td>{item.email}</td>
                        <td>{item.tel}</td>
                        <td>
                            <Link to={`edit-etudiant/${item.id}`} className='btn btn-success btn-sm'>Edit</Link>
                        </td>
                        <td>
                            <button type='button' onClick={(e) => this.deleteStudent(e,item.id)} className='btn btn-danger btn-sm'>Delete</button>
                        </td>
                    </tr>
                )
            })
        }

        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header d-flex justify-content-between align-items-center'>
                                <h4 className="m-0">Liste des étudiants</h4>
                                <Link to={'/Edtemps'} className='btn btn-primary btn-sm'>Emploi du Temps</Link>
                                <Link to={'add-student'} className='btn btn-primary btn-sm'>Add student</Link>
                                
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nom</th>
                                            <th>Prenom</th>
                                            <th>Classe</th>
                                            <th>Email</th>
                                            <th>Télephone</th>
                                            <th>Modifier</th>
                                            <th>Supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTML_TABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Student;