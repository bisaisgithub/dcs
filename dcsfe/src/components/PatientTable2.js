import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PatientDetails from './modals/PatientDetails.js';
import './PatientTable2.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

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
    useEffect(()=>{
        
        getPatients(); 
    
    }, []);
    const addPatient = async ()=>{
        setIsOpen(true);
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            return [year, month, day].join('-');
        }        
        let date = formatDate(selectedDateInput);
        // console.log('date: ', date);
        // console.log('addPatient called');
        if (!nameInput || !mobileInput || !genderInput || !selectedDateInput || !allergenInput || status_Input === '-Select Status-') {
            alert('Empty field/s')
        }else{
            const response = await axios.post("http://172.16.0.101:3001/patient", {
            name: nameInput,
            mobile: mobileInput,
            gender: genderInput,
            dob: date,
            allergen: allergenInput,
            status_: status_Input,
        });
        // console.log('add patient response.data', response.data)
        if (response.data.insertOk) {
            alert('Patient Added');
            // setSelectedDatenput(new Date());
            // setNameInput('');
            // setMobileInput('');
            // setAllergenInput('');
            // setGenderInput('');
            // console.log('clearing input name', nameInput);
            getPatients();
            setIsOpen(false);
        }else{
            alert('Failed Adding Patient');
        }
        }
        
    }
    const getPatients = async ()=>{
        const response = await axios.get(`http://172.16.0.101:3001/patients/${searchInput}`);
  
        if (response.data) {
            // console.log('response data',response.data)
            setPatientsData(response.data);
        }
    };
    const updatePatient = async ()=>{
        
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }        
        let date = formatDate(selectedDateInput);
        // console.log('date: ', date);
        // console.log('addPatient called');
        if (!nameInput || !mobileInput || !genderInput || !selectedDateInput || !allergenInput) {
            alert('Empty field/s')
        }else{
            const response = await axios.put(`http://172.16.0.101:3001/patient/${patientId}`, {
            name: nameInput,
            mobile: mobileInput,
            gender: genderInput,
            dob: date,
            allergen: allergenInput,
            status_: 'Active',
             });

            if (response.data.updateOk) {
            alert('Patient Upated');
            // setSelectedDatenput(new Date());
            // setNameInput('');
            // setMobileInput('');
            // setAllergenInput('');
            // setGenderInput('');
            // console.log('clearing input name', nameInput);
            setIsOpen(false);
            getPatients();
            }else{
                alert('Failed Updating Patient');
            }
        }
        
    };
    const newPatient = ()=>{
        setPatientId(null);
        setSelectedDateInput(new Date());
        setNameInput('');
        setMobileInput('');
        setAllergenInput('');
        setGenderInput('');
        setStatus_Input('-Select Status-');
        // console.log('clearing input name', nameInput);
        setIsOpen(true);
    };
    return (
        <div className='patient-table2-container'>
            <PatientDetails
            isOpen={isOpen} setIsOpen={setIsOpen} addPatient={addPatient}
            updatePatient={updatePatient} patientId={patientId} status_Input={status_Input}
            setStatus_Input={setStatus_Input} genderInput={genderInput} setGenderInput={setGenderInput}
            nameInput={nameInput} setNameInput={setNameInput} mobileInput={mobileInput}
            setMobileInput={setMobileInput} allergenInput={allergenInput} setAllergenInput={setAllergenInput}
            selectedDateInput={selectedDateInput} setSelectedDateInput={setSelectedDateInput}
            ></PatientDetails>
            <div className='patient-table2-head-container'>
                <div className='patient-table2-head-input'>
                    <div className='patient-table2-head-search-container'>
                        <button className='patient-table2-head-search-button' >Search</button>
                        <input className='patient-table2-head-search-input' placeholder='Search' />
                        <button className='patient-table2-head-search-clear'>X</button>
                    </div>
                    <div className='patient-table2-head-add-container'>
                    <button className='patient-table-head-add-button' onClick={()=>newPatient()}>New Patient</button>
                </div>
                </div>
            </div>
            <div className='patient-table2-table'>
                <thead className='patient-table2-table-thead'>
                    <tr className='patient-table2-table-thead-tr'>
                        <th>No</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody className='patient-table2-table-tbody'>
                    {patientsData && patientsData.map((patient, index)=>{
                        let age = 0;
                        const ageDiffs = new Date().getFullYear() - new Date(patient.dob).getFullYear();
                        if (new Date().getMonth() < new Date(patient.dob).getMonth()) {
                            age = ageDiffs -1;
                        } else {
                            age = ageDiffs;
                        }
                        return (
                            <tr key={index} className='patient-table2-table-tbody-tr'>
                               <td>{index+1}</td>
                                <td>{patient.name}</td>
                                <td>
                                    <span>{patient.status_}</span>
                                </td>
                                <td className='patient-table2-table-body-tr-td'>
                                    <button>Options</button>
                                    <button>Treatment</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </div>

        </div>
    )
}

export default PatientTable2


