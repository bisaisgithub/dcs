import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App2.css';
// import Login from './pages/Login';
import Patient from './pages/Patient.js';
import Dashboard from './pages/Dashboard.js';
import User from './pages/User.js';
import Admin from './pages/Admin.js';
import Appointment from './pages/Appointment.js'


import Nav from './components/nav/Nav.js';
// import NavTest from './components2/NavTest';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="top-center"/>
      <div>
        <Nav />
        <Routes>
          <Route exact path='/patient' element={<Patient/>} /> 
          <Route exact path='/dashboard' element={<Dashboard/>} />
          <Route exact path='/user' element={<User/>} />
          <Route exact path='/admin' element={<Admin/>} />
          <Route exact path='/appointment' element={<Appointment/>} />
          {/* <Route exact path='/' element={<Home/>} />
          <Route exact path='/add' element={<AddEdit/>} />
          <Route exact path='/update/:id' element={<AddEdit/>} />
          <Route exact path='/view/:id' element={<View/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/login' element={<Login/>} /> */}
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
