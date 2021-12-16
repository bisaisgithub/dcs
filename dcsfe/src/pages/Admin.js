import React from 'react';
import TreatmentTable from '../components/TreatmentTable.js';
import './Page.css';

const Admin = () => {
    return (
        <div className='page-container'>
            <TreatmentTable />
        </div>
    )
}

export default Admin;