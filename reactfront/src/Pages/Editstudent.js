import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Editstudent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [student, setStudent] = useState({
        nom: '',
        prenom: '',
        classe: '',
        email: '',
        tel: '',
    });
    const [errorList, setErrorList] = useState([]);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/edit-student/${id}`);
                if (res.data.status === 200) {
                    const { etudiant } = res.data;
                    setStudent({
                        nom: etudiant.nom,
                        prenom: etudiant.prenom,
                        classe: etudiant.classe,
                        email: etudiant.email,
                        tel: etudiant.tel
                    });
                }
                else if (res.data.status === 404) {
                    Swal.fire({
                        title: "Attention!",
                        text: res.data.message,
                        icon: "warning"
                      });
                      navigate('/');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudent();
    }, [id, navigate]);

    const handleInput = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const updateEtudiant = async (e) => {
        e.preventDefault();
        try {
            // document.getElementById('btnmodif').disabled = true;
            // document.getElementById('btnmodif').innerText = "modification En cours";

            const res = await axios.put(`http://localhost:8000/api/update-student/${id}`, student); 
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
                  navigate('/');
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
                            <h4>Modifier Etudiant</h4>
                            <Link to={'/'} className='btn btn-primary btn-sm'>Retour</Link>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={updateEtudiant}>
                                <div className='form-group mb-3'>
                                    <label>Nom Etudiant</label>
                                    <input type='text' name='nom' onChange={handleInput} value={student.nom} className='form-control'/>
                                    <span className='text-danger'>{errorList.nom}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Prenom Etudiant</label>
                                    <input type='text' name='prenom' onChange={handleInput} value={student.prenom} className='form-control'/>
                                    <span className='text-danger'>{errorList.prenom}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Classe</label>
                                    <input type='text' name='classe' onChange={handleInput} value={student.classe} className='form-control'/>
                                    <span className='text-danger'>{errorList.classe}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Email Etudiant</label>
                                    <input type='text' name='email' onChange={handleInput} value={student.email} className='form-control'/>
                                    <span className='text-danger'>{errorList.email}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Tel Etudiant</label>
                                    <input type='number' name='tel' onChange={handleInput}  value={student.tel} className='form-control'/>
                                    <span className='text-danger'>{errorList.tel}</span>
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
};

export default Editstudent;