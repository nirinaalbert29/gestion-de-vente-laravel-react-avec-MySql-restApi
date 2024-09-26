import React from 'react';
import Student from './Pages/student';
import Addstudent from './Pages/Addstudent';
import Editstudent from './Pages/Editstudent';
import Addedt from './Edt/Addedt';
import Editedt from './Edt/Editedt';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edtemps from './Edt/Edtemps';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Student />} />
        <Route path='/add-student' element={<Addstudent />} />
        <Route path='/edit-etudiant/:id' element={<Editstudent />} />

        <Route path='/add-edt' element={<Addedt />} />
        <Route path='/edtemps' element={<Edtemps />} />
        <Route path='/edit-edt/:id' element={<Editedt />} />
      </Routes>
    </Router>
  );
}

export default App;
