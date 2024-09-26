import axios from "axios";
import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Addedt = () => {
    const navigate = useNavigate();

    const [edtemp, setEdt] = useState({
        matiere: '',
        date: '',
        heure_debut: '',
        heure_fin: '',
        enseignant: '',
        parcours:'',
        salle:'',
    });

    const handleInput = (e) => {
        setEdt({
            ...edtemp,
            [e.target.name]: e.target.value
        });
    }
    // useEffect(() => {

    // }, [id, navigate]);

    const saveEdt = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post('http://localhost:8000/api/add-edt', edtemp); 
            if(res.data.status === 200){
                // console.log(res.data.message);
                Swal.fire({
                    title: "Successfuly!",
                    text: res.data.message,
                    icon: "success"
                  });
                  
                setEdt({
                    matiere:'',
                    date :'',
                    heure_debut :'',
                    heure_fin : '',
                    enseignant : '',
                    parcours :'',
                    salle :'',
                });
                navigate('/Edtemps');
            }
            // else{
            //     this.setState({
            //         erro_list : res.data.validate_err,
            //     })
            // }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    }


        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                        <div className='card-header d-flex justify-content-between align-items-center'>
                            <h4 className="m-0">Ajout Nouveau Emploi du temps</h4>
                            <Link to={'/Edtemps'} className='btn btn-primary btn-sm'>Retour</Link>
                        </div>

                            <div className='card-body'>
                                <form onSubmit={saveEdt}>
                                    <div className='form-group mb-3'>
                                        <label>Matiere</label>
                                        <input type='text' name='matiere' onChange={handleInput} value={edtemp.matiere} className='form-control'/>
                                        {/* <span className='text-danger'>{this.state.erro_list.matiere}</span> */}
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Date</label>
                                        <input type='date' name='date' onChange={handleInput} value={edtemp.date} className='form-control'/>
                                        {/* <span className='text-danger'>{this.state.erro_list.prenom}</span> */}
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Heure debut</label>
                                        <input type='time' name='heure_debut' onChange={handleInput} value={edtemp.heure_debut} className='form-control'/>
                                        {/* <span className='text-danger'>{this.state.erro_list.classe}</span> */}
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Heure fin</label>
                                        <input type='time' name='heure_fin' onChange={handleInput} value={edtemp.heure_fin} className='form-control'/>
                                        {/* <span className='text-danger'>{this.state.erro_list.email}</span> */}
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Enseignant</label>
                                        <input type='text' name='enseignant' onChange={handleInput}  value={edtemp.enseignant} className='form-control'/>
                                        {/* <span className='text-danger'>{this.state.erro_list.tel}</span> */}
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Parcours</label>
                                        <input type='text' name='parcours' onChange={handleInput}  value={edtemp.parcours} className='form-control'/>
                                        {/* <span className='text-danger'>{this.state.erro_list.tel}</span> */}
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Salle</label>
                                        <input type='text' name='salle' onChange={handleInput}  value={edtemp.salle} className='form-control'/>
                                        {/* <span className='text-danger'>{this.state.erro_list.tel}</span> */}
                                    </div>

                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Enregistrer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default Addedt;