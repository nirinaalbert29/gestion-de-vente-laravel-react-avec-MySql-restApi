import React,{ useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const Addstudent = () => { 
    const navigate = useNavigate();

    const [student,setStudent] = useState({
        nom:'',
        prenom :'',
        classe :'',
        email : '',
        tel : '',
        erro_list : [],
    });
    const handleInput = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    const saveEtudiant = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post('http://localhost:8000/api/add-student', student); 
            if(res.data.status === 200){
                // console.log(res.data.message);
                Swal.fire({
                    title: "Successfuly!",
                    text: res.data.message,
                    icon: "success"
                  });
                  
                setStudent({
                    ...student,
                    nom:'',
                    prenom :'',
                    classe :'',
                    email : '',
                    tel : '',
                });
                navigate('/');
            }
            else{
                setStudent({
                    ...student,
                    erro_list : res.data.validate_err,
                })
            }
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
                            <h4 className="m-0">Ajout Nouveau Etudiant</h4>
                            <Link to={'/'} className='btn btn-primary btn-sm'>Retour</Link>
                        </div>

                            <div className='card-body'>
                                <form onSubmit={saveEtudiant}>
                                    <div className='form-group mb-3'>
                                        <label>Nom Etudiant</label>
                                        <input type='text' name='nom' onChange={handleInput} value={student.nom} className='form-control'/>
                                        <span className='text-danger'>{student.erro_list.nom}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Prenom Etudiant</label>
                                        <input type='text' name='prenom' onChange={handleInput} value={student.prenom} className='form-control'/>
                                        <span className='text-danger'>{student.erro_list.prenom}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Classe</label>
                                        <input type='text' name='classe' onChange={handleInput} value={student.classe} className='form-control'/>
                                        <span className='text-danger'>{student.erro_list.classe}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email Etudiant</label>
                                        <input type='text' name='email' onChange={handleInput} value={student.email} className='form-control'/>
                                        <span className='text-danger'>{student.erro_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Tel Etudiant</label>
                                        <input type='number' name='tel' onChange={handleInput}  value={student.tel} className='form-control'/>
                                        <span className='text-danger'>{student.erro_list.tel}</span>
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
export default Addstudent;