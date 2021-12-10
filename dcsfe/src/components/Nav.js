import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom'
import prescription from './prescription-monkik.png';
import treatment from './treatment-Eucalyp.png';
import patient from './patient-Freepik.png';
import appointment from './appointment-Freepik.png';
import dashboard from './dashboard-Eucalyp.png';
// import {ReactComponent as Patient} from './patient.svg'
import {ReactComponent as Dashboard} from './dashboard.svg'
import {ReactComponent as Appointment} from './appointment.svg'

const Nav = () => {
    return (
        <div className='nav'>
           <Link to='/' className='nav__link'>
                <img src={appointment} className='nav__icon'/>
                <span>Appointment</span>
           </Link> 
           <Link to='/patient' className='nav__link'>
               <img src={patient} className='nav__icon'/>
                <span>Patient</span>
           </Link>
           <Link to='/treatment' className='nav__link'>
                <img src={treatment} className='nav__icon'/>
                <span>Treatment</span>
           </Link> 
           <Link to='/prescription' className='nav__link'>
                <img src={prescription} className='nav__icon'/>
                <span>Prescription</span>
           </Link> 
           <Link to='/' className='nav__link'>
                <img  src={dashboard} className='nav__icon' />
                <span>Dashboard</span>
           </Link>
           
        </div>
    )
}

export default Nav
