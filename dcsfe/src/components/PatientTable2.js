import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PatientDetails from './modals/PatientDetails.js';
import './Table.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const PatientTable2 = () => {
    const [patient_dob, set_patient_dob] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [patientsData, setPatientsData] = useState([]);
    const [patient_name, set_patient_name] = useState('');
    const [patient_mobile, set_patient_mobile] = useState('');
    const [patient_gender, set_patient_gender] = useState('');
    const [patient_allergen, set_patient_allergen] = useState('');
    const [patient_id, set_patient_id] = useState("");
    const [patient_status, set_patient_status] =useState('-Select Status-');
    const [searchNameInput, setSearchNameInput] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [searchStatusInput, setSearchStatusInput] = useState('');
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
        let date = formatDate(patient_dob);
        // console.log('date: ', date);
        // console.log('addPatient called');
        if (!patient_name || !patient_mobile || !patient_gender || !patient_dob || !patient_allergen || patient_status === '-Select Status-') {
            alert('Empty field/s')
        }else{
            const response = await axios.post("http://172.16.0.101:3001/patient", {
                patient_name: patient_name,
                patient_mobile: patient_mobile,
                patient_gender: patient_gender,
                patient_dob: date,
                patient_allergen: patient_allergen,
                patient_status: patient_status,
        });
        // console.log('add patient response.data', response.data)
        if (response.data.insertOk) {
            alert('Patient Added');
            // setSelectedDatenput(new Date());
            // set_patient_name('');
            // set_patient_mobile('');
            // set_patient_allergen('');
            // set_patient_gender('');
            // console.log('clearing input name', patient_name);
            getPatients();
            setIsOpen(false);
        }else{
            alert('Failed Adding Patient');
        }
        }
        
    }
    const getPatients = async (data)=>{

        if (data) {
            const response = await axios.post(`http://172.16.0.101:3001/patients`, data);
  
        if (response.data) {
            // console.log('response data',response.data)
            setPatientsData(response.data);
        }
        } else {
            const response = await axios.get(`http://172.16.0.101:3001/patients`);
  
        if (response.data) {
            // console.log('response data',response.data)
            setPatientsData(response.data);
        }
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
        let date = formatDate(patient_dob);
        // console.log('date: ', date);
        // console.log('addPatient called');
        if (!patient_name || !patient_mobile || !patient_gender || !patient_dob || !patient_allergen) {
            alert('Empty field/s')
        }else{
            const response = await axios.put(`http://172.16.0.101:3001/patient/${patient_id}`, {
                patient_name: patient_name,
                patient_mobile: patient_mobile,
                patient_gender: patient_gender,
                patient_dob: date,
                patient_allergen: patient_allergen,
                patient_status: patient_status,
             });

            if (response.data.updateOk) {
            alert('Patient Upated');
            // setSelectedDatenput(new Date());
            // set_patient_name('');
            // set_patient_mobile('');
            // set_patient_allergen('');
            // set_patient_gender('');
            // console.log('clearing input name', patient_name);
            setIsOpen(false);
            getPatients();
            }else{
                alert('Failed Updating Patient');
            }
        }
        
    };
    const newPatient = ()=>{
        set_patient_id(null);
        set_patient_dob(new Date());
        set_patient_name('');
        set_patient_mobile('');
        set_patient_allergen('');
        set_patient_gender('');
        set_patient_status('-Select Status-');
        // console.log('clearing input name', patient_name);
        setIsOpen(true);
    };
    const setPatientAgeFunction = (patientDOB)=>{
        // let age = 0;
        const ageDiffs = new Date().getFullYear() - new Date(patientDOB).getFullYear();
        if (new Date().getMonth() < new Date(patientDOB).getMonth()) {
            // age = ageDiffs -1;
            setPatientAge(ageDiffs -1);
        } else {
            // age = ageDiffs;
            setPatientAge(ageDiffs);
        }
    }
    const detailsFunction = async (patientIdparam)=>{
        // console.log('edit patient ccalled')
        // console.log('patienId before fetch', patient_id)
        const responsePatient = await axios.get(`http://172.16.0.101:3001/patient/${patientIdparam}`);
        
        if (responsePatient.data[0].patient_id) {
            set_patient_dob(new Date(responsePatient.data[0].patient_dob));
            set_patient_name(responsePatient.data[0].patient_name);
            set_patient_mobile(responsePatient.data[0].patient_mobile);
            set_patient_allergen(responsePatient.data[0].patient_allergen);
            set_patient_gender(responsePatient.data[0].patient_gender);
            set_patient_status(responsePatient.data[0].patient_status);
            set_patient_id(responsePatient.data[0].patient_id);
            setPatientAgeFunction(responsePatient.data[0].patient_dob);
            // console.log('patienId after set_patient_id', patient_id);
            // console.log('name after setPatientname', patient_name);
            // if (patient_id) {
            //     console.log('patient_id true', patient_id)
            // } else {
            //     console.log('patient_id false', patient_id)
            // }
            setIsOpen(true);
            
        } else {
            console.log('responsePatientId is empty: ', responsePatient.data[0].patient_id)
        }
    }
    return (
        <div className='table-table2-container'>
            <PatientDetails
            isOpen={isOpen} setIsOpen={setIsOpen} addPatient={addPatient}
            updatePatient={updatePatient} patient_id={patient_id} patient_status={patient_status}
            set_patient_status={set_patient_status} patient_gender={patient_gender} set_patient_gender={set_patient_gender}
            patient_name={patient_name} set_patient_name={set_patient_name} patient_mobile={patient_mobile}
            set_patient_mobile={set_patient_mobile} patient_allergen={patient_allergen} set_patient_allergen={set_patient_allergen}
            patient_dob={patient_dob} set_patient_dob={set_patient_dob}
            patientAge={patientAge}
            ></PatientDetails>
            <div className='table-table2-head-container'>
                
            </div>
            <div className='table-table2-table'>
                <thead className='table-table2-table-thead-search2'>
                    <tr className='table-table2-table-thead-tr-search2'>
                        <th><p onClick={()=>{getPatients({name: searchNameInput, status_: searchStatusInput})}}>Find</p></th>
                        <th><input placeholder='Name' value={searchNameInput} onChange={(e)=>{setSearchNameInput(e.target.value)}}/><button onClick={()=>{setSearchNameInput('');setSearchStatusInput('')}}>X</button></th>
                        <th><input placeholder='Status' value={searchStatusInput} onChange={(e)=>{setSearchStatusInput(e.target.value)}}/></th>
                        <th><p onClick={()=>newPatient()}>New</p></th>
                    </tr>
                </thead>
                <thead className='table-table2-table-thead'>
                    <tr className='table-table2-table-thead-tr'>
                        <th>No</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody className='table-table2-table-tbody'>
                    {patientsData && patientsData.map((patient, index)=>{
                        
                        return (
                            <tr key={index} className='table-table2-table-tbody-tr'>
                               <td>{index+1}</td>
                                <td>{patient.patient_name}</td>
                                <td>
                                    <button  id={patient.patient_status=== 'Scheduled'? 'bg-green':'bg-black'}>{patient.patient_status}</button>
                                </td>
                                <td className='table-table2-table-body-tr-td'>
                                    <button onClick={()=>{detailsFunction(patient.patient_id)}}>Details</button>
                                    <button>Treatments</button>
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


