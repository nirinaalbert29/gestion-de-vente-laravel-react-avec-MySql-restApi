import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Editedt = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [edtemp, setStudent] = useState({
        matiere: '',
        date: '',
        heure_debut: '',
        heure_fin: '',
        enseignant: '',
        parcours:'',
        salle:'',
    });
    const [errorList, setErrorList] = useState([]);

    useEffect(() => {
        const fetchEdt = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/edit-edt/${id}`);
                if (res.data.status === 200) {
                    const { edtemp } = res.data;
                    setStudent({
                        matiere: edtemp.matiere,
                        date: edtemp.date,
                        heure_debut: edtemp.heure_debut,
                        heure_fin: edtemp.heure_fin,
                        enseignant: edtemp.enseignant,
                        parcours:edtemp.parcours,
                        salle:edtemp.salle,
                    });
                }
                else if (res.data.status === 404) {
                    Swal.fire({
                        title: "Attention!",
                        text: res.data.message,
                        icon: "warning"
                      });
                      navigate('/Edtemps');
                }
            } catch (error) {
                console.error('Error fetching emploi du temps data:', error);
            }
        };

        fetchEdt();
    }, [id, navigate]);

    const handleInput = (e) => {
        setStudent({
            ...edtemp,
            [e.target.name]: e.target.value
        });
    };

    const updateEdt = async (e) => {
        e.preventDefault();
        try {
            // document.getElementById('btnmodif').disabled = true;
            // document.getElementById('btnmodif').innerText = "modification En cours";

            const res = await axios.put(`http://localhost:8000/api/update-edt/${id}`, edtemp); 
            if (res.data.status === 200) {
                // console.log(res.data.message);
                Swal.fire({
                    title: "Successfuly!",
                    text: res.data.message,
                    icon: "success"
                  });
                navigate('/');
            }
            else if(res.data.status === 404){
                Swal.fire({
                    title: "Attention!",
                    text: res.data.message,
                    icon: "warning"
                  });
                  navigate('/Edtemps');
            }
            else{
                setErrorList(res.data.validate_err ? res.data.validate_err : []);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header d-flex justify-content-between align-items-center'>
                            <h4>Modifier Emploi du temps</h4>
                            <Link to={'/Edtemps'} className='btn btn-primary btn-sm'>Retour</Link>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={updateEdt}>
                                <div className='form-group mb-3'>
                                    <label>Matière</label>
                                    <input type='text' name='matiere' onChange={handleInput} value={edtemp.matiere} className='form-control'/>
                                    {/* <span className='text-danger'>{errorList.nom}</span> */}
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Date</label>
                                    <input type='date' name='date' onChange={handleInput} value={edtemp.date} className='form-control'/>
                                    {/* <span className='text-danger'>{errorList.prenom}</span> */}
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Heure début</label>
                                    <input type='time' name='heure_debut' onChange={handleInput} value={edtemp.heure_debut} className='form-control'/>
                                    {/* <span className='text-danger'>{errorList.classe}</span> */}
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Heure Fin</label>
                                    <input type='time' name='heure_fin' onChange={handleInput} value={edtemp.heure_fin} className='form-control'/>
                                    {/* <span className='text-danger'>{errorList.email}</span> */}
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Enseignant</label>
                                    <input type='text' name='enseignant' onChange={handleInput}  value={edtemp.enseignant} className='form-control'/>
                                    {/* <span className='text-danger'>{errorList.tel}</span> */}
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Parcours</label>
                                    <input type='text' name='parcours' onChange={handleInput}  value={edtemp.parcours} className='form-control'/>
                                    {/* <span className='text-danger'>{errorList.tel}</span> */}
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Salle</label>
                                    <input type='text' name='salle' onChange={handleInput}  value={edtemp.salle} className='form-control'/>
                                    {/* <span className='text-danger'>{errorList.tel}</span> */}
                                </div>

                                <div className='form-group mb-3'>
                                    <button type='submit' id='btnmodif' className='btn btn-primary'>Modifier</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Editedt;