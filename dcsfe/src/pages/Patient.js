import React from 'react'
import PatientTable from '../components/PatientTable';
import './Patient.css';
const Patient = () => {
    return (
        <div className='patient-container'>
            <p>Patient</p>
            <PatientTable />
        </div>
    )
}

export default Patient;
