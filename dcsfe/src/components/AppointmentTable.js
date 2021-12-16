import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AppointmentDetails from './modals/AppointmentDetails.js';
import './Table.css';


const AppointmentTable = () => {
    const [selectedDateInput, setSelectedDateInput] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [mobileInput, setMobileInput] = useState('');
    const [genderInput, setGenderInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [userId, setUserId] = useState("");
    const [typeInput, setTypeInput] =useState('-Select Status-');
    const [searchNameInput, setSearchNameInput] = useState('');
    const [userAge, setUserAge] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [searchTypeInput, setSearchTypeInput] = useState('');
    useEffect(()=>{
        
        getUsers(); 
    
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
        // console.log('add user response.data', response.data)
        if (response.data.userInsertOk) {
            alert('User Added');
            // setSelectedDatenput(new Date());
            // setNameInput('');
            // setMobileInput('');
            // setEmailInput('');
            // setGenderInput('');
            // console.log('clearing input name', nameInput);
            getUsers();
            setIsOpen(false);
        }else{
            alert('Failed Adding User');
        }
        }
        
    }
    
    const getUsers = async (data)=>{
        
        if (data) {
            const response = await axios.post(`http://172.16.0.101:3001/users`, data);
            if (response.data) {
                // console.log('response data',response.data)
                setUsersData(response.data);
            }
        } else {
            const response = await axios.get(`http://172.16.0.101:3001/users`);
            if (response.data) {
                // console.log('response data',response.data)
                setUsersData(response.data);
            }
        }
        
  
        
    };
    const updateUser = async ()=>{
        
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
            const response = await axios.put(`http://172.16.0.101:3001/user/${userId}`, {
            name: nameInput,
            mobile: mobileInput,
            gender: genderInput,
            dob: date,
            allergen: emailInput,
            status_: 'Active',
             });

            if (response.data.userUpdateOk) {
            alert('User Upated');
            // setSelectedDatenput(new Date());
            // setNameInput('');
            // setMobileInput('');
            // setEmailInput('');
            // setGenderInput('');
            // console.log('clearing input name', nameInput);
            setIsOpen(false);
            getUsers();
            }else{
                alert('Failed Updating User');
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
        // console.log('edit user ccalled')
        // console.log('patienId before fetch', userId)
        const responsePatient = await axios.get(`http://172.16.0.101:3001/user/${patientIdparam}`);
        
        if (responsePatient.data[0].id) {
            setSelectedDateInput(new Date(responsePatient.data[0].dob));
            setNameInput(responsePatient.data[0].name);
            setMobileInput(responsePatient.data[0].mobile);
            setEmailInput(responsePatient.data[0].email);
            // setPasswordInput(responsePatient.data[0].input);
            setGenderInput(responsePatient.data[0].gender);
            setTypeInput(responsePatient.data[0].type);
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
        <div className='table-table2-container'>
            <AppointmentDetails
            isOpen={isOpen} setIsOpen={setIsOpen} addUser={addUser}
            updateUser={updateUser} userId={userId} typeInput={typeInput}
            setTypeInput={setTypeInput} genderInput={genderInput} setGenderInput={setGenderInput}
            nameInput={nameInput} setNameInput={setNameInput} mobileInput={mobileInput}
            setMobileInput={setMobileInput} emailInput={emailInput} setEmailInput={setEmailInput}
            selectedDateInput={selectedDateInput} setSelectedDateInput={setSelectedDateInput}
            userAge={userAge} passwordInput={passwordInput} setPasswordInput={setPasswordInput}
            ></AppointmentDetails>
            <div className='table-table2-head-container'>
                <div className='table-table2-head-input'>
                    <div className='table-table2-head-search-container'>
                        {/* <button className='table-table2-head-search-button' onClick={getUsers} >Search</button> */}
                        {/* <input className='table-table2-head-search-input' placeholder='Search' value={searchNameInput} onChange={(e)=>{setSearchNameInput(e.target.value)}} /> */}
                        {/* <button className='table-table2-head-search-clear' onClick={()=>{setSearchNameInput('')}}>X</button> */}
                    </div>
                    <div className='table-table2-head-add-container'>
                    {/* <button className='table-table-head-add-button' onClick={()=>newPatient()}>New User</button> */}
                </div>
                </div>
            </div>
            <div className='table-table2-table'>
                <thead className='table-table2-table-thead-search2'>
                    <tr className='table-table2-table-thead-tr-search2'>
                        {/* <th>
                            <div><button>Find</button></div>
                        </th> */}
                        <th><p onClick={()=>{getUsers({name: searchNameInput, type: searchTypeInput})}}>Find</p></th>
                        {/* <th><input value='Find' onClick={()=>{getUsers()}} /></th> */}
                        <th><input placeholder='Name' value={searchNameInput} onChange={(e)=>{setSearchNameInput(e.target.value)}}/><button onClick={()=>{setSearchNameInput('');setSearchTypeInput('')}}>X</button></th>
                        <th><input placeholder='Type' value={searchTypeInput} onChange={(e)=>{setSearchTypeInput(e.target.value)}}/></th>
                        <th><p onClick={()=>newPatient()}>New</p></th>
                        {/* <th><input value='New' onClick={()=>newPatient()}/></th> */}
                    </tr>
                </thead>
                <thead className='table-table2-table-thead'>
                    <tr className='table-table2-table-thead-tr'>
                        <th>No</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody className='table-table2-table-tbody'>
                    
                    {usersData && usersData.map((user, index)=>{
                        
                        return (
                            <tr key={index} className='table-table2-table-tbody-tr'>
                               <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>
                                    <button  id={user.status_=== 'Scheduled'? 'bg-green':'bg-black'}>{user.type}</button>
                                </td>
                                <td className='table-table2-table-body-tr-td'>
                                    <button onClick={()=>{detailsFunction(user.id)}}>Details</button>
                                    {/* <button>Treatments</button> */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </div>

        </div>
    )
}

export default AppointmentTable;
