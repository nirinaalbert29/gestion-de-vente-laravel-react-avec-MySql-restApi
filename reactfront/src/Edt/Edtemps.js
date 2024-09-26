import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Edtemps extends Component{
    state = {
        edtemps:[],
        loading:true,
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:8000/api/edtemps');
        if(res.data.status === 200){
            this.setState({
                edtemps:res.data.edts,
                loading :false,
            });
        }
    }

    deleteEdt = async (e, id) => {
        const selectligne = e.currentTarget;
        selectligne.innerText = "Deleting";
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cet cours ?',
            text: 'Cette action est irréversible !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:8000/api/delete-edt/${id}`);
                    if (res.data.status === 200) {
                        // Mettre à jour l'état de la liste des edts si nécessaire
                        // removeStudentFromList(id);

                        selectligne.closest("tr").remove();
    
                        Swal.fire(
                            'Supprimé !',
                            res.data.message,
                            'success'
                        );
                    }
                } catch (error) {
                    console.error('Erreur lors de la suppression de l\'edt :', error);
                    Swal.fire(
                        'Erreur !',
                        `Une erreur s'est produite lors de la suppression de l'emploi du temps: ${error.message}`,
                        'error'
                    );
                }
            }
        });
    };

    render(){

        var edt_HTML_TABLE="";
        if(this.state.loading){
            edt_HTML_TABLE=<tr><td colSpan={8}><h2>Loading...</h2></td></tr>
        }
        else{
            edt_HTML_TABLE=
            this.state.edtemps.map( (item) =>{
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.matiere}</td>
                        <td>{item.date}</td>
                        <td>{item.heure_debut}</td>
                        <td>{item.heure_fin}</td>
                        <td>{item.enseignant}</td>
                        <td>{item.parcours}</td>
                        <td>{item.salle}</td>
                        <td>
                            <Link to={`/edit-edt/${item.id}`} className='btn btn-success btn-sm'>Edit</Link>
                        </td>
                        <td>
                            <button type='button' onClick={(e) => this.deleteEdt(e,item.id)} className='btn btn-danger btn-sm'>Delete</button>
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
                                <h4 className="m-0">Emploi du temps</h4>
                                <Link to={'/'} className='btn btn-primary btn-sm'>Etudiant</Link>
                                <Link to={'/add-edt'} className='btn btn-primary btn-sm'>Add Emploi du temps</Link>
                                
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Matière</th>
                                            <th>Date</th>
                                            <th>Heure début</th>
                                            <th>Heure Fin</th>
                                            <th>Enseignant</th>
                                            <th>Parcours</th>
                                            <th>Salle</th>
                                            <th>Modifier</th>
                                            <th>Supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {edt_HTML_TABLE}
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
export default Edtemps;