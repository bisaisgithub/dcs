import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import './App2.css';
// import Home from './pages/Home';
// import AddEdit from './pages/AddEdit';
// import View from './pages/View';
// import About from './pages/About';
// import Header from './components/Header';
// import Login from './pages/Login';
import Patient from './pages/Patient';
import Dashboard from './pages/Dashboard';

import Nav from './components/Nav';
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
