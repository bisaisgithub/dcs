import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PatientDetails from './modals/PatientDetails.js';
import './PatientTable2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientTable2 = () => {
    return (
        <div className='patient-table-container'>

            <div className='patient-table-head-container'>
                <div className='patient-table-head-title'>Patient Table</div>
                <div className='patient-table-head-input'>
                    <div className='patient-table-head-search-container'>
                        <button className='patient-table-head-search-button'>Search</button>
                        <input className='patient-table-head-search-input' />
                        <button className='patient-table-head-search-clear'>X</button>
                    </div>
                </div>
                <div className='patient-table-head-add-container'>
                    <button className='patient-table-head-add-button'></button>
                </div>
            </div>

            <div className='patient-table-table'>
                <thead className='patient-table-table-thead'>
                    <tr className='patient-table-table-thead-tr'>
                        <th>No</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Treatment</th>
                    </tr>
                </thead>
                <tbody className='patient-table-table-tbody'>
                    <tr className='patient-table-table-tbody-tr'>
                        <td>1</td>
                        <td>Benar F Isais</td>
                        <td>
                            <span>Active</span>
                        </td>
                        <td>
                            <button>Details</button>
                        </td>
                        <td>
                            <button>Treatment</button>
                        </td>
                    </tr>
                </tbody>
            </div>

        </div>
    )
}

export default PatientTable2


