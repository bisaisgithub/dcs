import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PatientDetails from './modals/PatientDetails.js';
import './PatientTable2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientTable2 = () => {
    const [selectedDateInput, setSelectedDateInput] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [patientsData, setPatientsData] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [mobileInput, setMobileInput] = useState('');
    const [genderInput, setGenderInput] = useState('');
    const [allergenInput, setAllergenInput] = useState('');
    const [patientId, setPatientId] = useState("");
    const [status_Input, setStatus_Input] =useState('-Select Status-');
    const [searchInput, setSearchInput] = useState('');
    return (
        <div className='patient-table2-container'>
            <PatientDetails
            isOpen={isOpen} setIsOpen={setIsOpen} addPatient={addPatient}
            ></PatientDetails>
            <div className='patient-table2-head-container'>
                {/* <div className='patient-table2-head-title'>Patient Table</div> */}
                <div className='patient-table2-head-input'>
                    <div className='patient-table2-head-search-container'>
                        <button className='patient-table2-head-search-button' >Search</button>
                        <input className='patient-table2-head-search-input' placeholder='Search' />
                        <button className='patient-table2-head-search-clear'>X</button>
                    </div>
                    <div className='patient-table2-head-add-container'>
                    <button className='patient-table-head-add-button'>New Patient</button>
                </div>
                </div>
            </div>
            <div className='patient-table2-table'>
                <thead className='patient-table2-table-thead'>
                    <tr className='patient-table2-table-thead-tr'>
                        <th>No</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Treatment</th>
                    </tr>
                </thead>
                <tbody className='patient-table2-table-tbody'>
                    <tr className='patient-table2-table-tbody-tr'>
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


