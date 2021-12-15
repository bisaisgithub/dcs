import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserDetails from './modals/UserDetails.js';
import './UserTable.css';


const UserTable = () => {
    const [selectedDateInput, setSelectedDateInput] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [patientsData, setPatientsData] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [mobileInput, setMobileInput] = useState('');
    const [genderInput, setGenderInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [userId, setUserId] = useState("");
    const [typeInput, setTypeInput] =useState('-Select Status-');
    const [searchInput, setSearchInput] = useState('');
    const [userAge, setUserAge] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    useEffect(()=>{
        
        getPatients(); 
    
    }, []);
    const addUser = async ()=>{
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
        // console.log('addUser called');
        if (!nameInput || !mobileInput || !genderInput || !selectedDateInput || !emailInput || !passwordInput || typeInput === '-Select Status-') {
            alert('Empty field/s')
        }else{
            const response = await axios.post("http://172.16.0.101:3001/user", {
            name: nameInput,
            mobile: mobileInput,
            gender: genderInput,
            dob: date,
            email: emailInput,
            type: typeInput,
            password: passwordInput,
        });
        // console.log('add patient response.data', response.data)
        if (response.data.userInsertOk) {
            alert('User Added');
            // setSelectedDatenput(new Date());
            // setNameInput('');
            // setMobileInput('');
            // setEmailInput('');
            // setGenderInput('');
            // console.log('clearing input name', nameInput);
            getPatients();
            setIsOpen(false);
        }else{
            alert('Failed Adding User');
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
        // console.log('addUser called');
        if (!nameInput || !mobileInput || !genderInput || !selectedDateInput || !emailInput) {
            alert('Empty field/s')
        }else{
            const response = await axios.put(`http://172.16.0.101:3001/patient/${userId}`, {
            name: nameInput,
            mobile: mobileInput,
            gender: genderInput,
            dob: date,
            allergen: emailInput,
            status_: 'Active',
             });

            if (response.data.updateOk) {
            alert('Patient Upated');
            // setSelectedDatenput(new Date());
            // setNameInput('');
            // setMobileInput('');
            // setEmailInput('');
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
        setUserId(null);
        setSelectedDateInput(new Date());
        setNameInput('');
        setMobileInput('');
        setEmailInput('');
        setGenderInput('');
        setTypeInput('-Select Status-');
        // console.log('clearing input name', nameInput);
        setIsOpen(true);
    };
    const setUserAgeFunction = (patientDOB)=>{
        // let age = 0;
        const ageDiffs = new Date().getFullYear() - new Date(patientDOB).getFullYear();
        if (new Date().getMonth() < new Date(patientDOB).getMonth()) {
            // age = ageDiffs -1;
            setUserAge(ageDiffs -1);
        } else {
            // age = ageDiffs;
            setUserAge(ageDiffs);
        }
    }
    const detailsFunction = async (patientIdparam)=>{
        // console.log('edit patient ccalled')
        // console.log('patienId before fetch', userId)
        const responsePatient = await axios.get(`http://172.16.0.101:3001/patient/${patientIdparam}`);
        
        if (responsePatient.data[0].id) {
            setSelectedDateInput(new Date(responsePatient.data[0].dob));
            setNameInput(responsePatient.data[0].name);
            setMobileInput(responsePatient.data[0].mobile);
            setEmailInput(responsePatient.data[0].allergen);
            setGenderInput(responsePatient.data[0].gender);
            setTypeInput(responsePatient.data[0].status_);
            setUserId(responsePatient.data[0].id);
            setUserAgeFunction(responsePatient.data[0].dob);
            // console.log('patienId after setUserId', userId);
            // console.log('name after setPatientname', nameInput);
            // if (userId) {
            //     console.log('userId true', userId)
            // } else {
            //     console.log('userId false', userId)
            // }
            setIsOpen(true);
            
        } else {
            console.log('responsePatientId is empty: ', responsePatient.data[0].id)
        }
    }
    return (
        <div className='patient-table2-container'>
            <UserDetails
            isOpen={isOpen} setIsOpen={setIsOpen} addUser={addUser}
            updatePatient={updatePatient} userId={userId} typeInput={typeInput}
            setTypeInput={setTypeInput} genderInput={genderInput} setGenderInput={setGenderInput}
            nameInput={nameInput} setNameInput={setNameInput} mobileInput={mobileInput}
            setMobileInput={setMobileInput} emailInput={emailInput} setEmailInput={setEmailInput}
            selectedDateInput={selectedDateInput} setSelectedDateInput={setSelectedDateInput}
            userAge={userAge} passwordInput={passwordInput} setPasswordInput={setPasswordInput}
            ></UserDetails>
            <div className='patient-table2-head-container'>
                <div className='patient-table2-head-input'>
                    <div className='patient-table2-head-search-container'>
                        <button className='patient-table2-head-search-button' onClick={getPatients} >Search</button>
                        <input className='patient-table2-head-search-input' placeholder='Search' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} />
                        <button className='patient-table2-head-search-clear' onClick={()=>{setSearchInput('')}}>X</button>
                    </div>
                    <div className='patient-table2-head-add-container'>
                    <button className='patient-table-head-add-button' onClick={()=>newPatient()}>New User</button>
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
                        
                        return (
                            <tr key={index} className='patient-table2-table-tbody-tr'>
                               <td>{index+1}</td>
                                <td>{patient.name}</td>
                                <td>
                                    <button  id={patient.status_=== 'Scheduled'? 'bg-green':'bg-black'}>{patient.status_}</button>
                                </td>
                                <td className='patient-table2-table-body-tr-td'>
                                    <button onClick={()=>{detailsFunction(patient.id)}}>Details</button>
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

export default UserTable;
