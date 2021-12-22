import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AppointmentDetails from './modals/AppointmentDetails.js';
import './Table.css';


const AppointmentTable = () => {
    const [selectedDateInput, setSelectedDateInput] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [patientsData, setPatientsData] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [mobileInput, setMobileInput] = useState('');
    const [genderInput, setGenderInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [userId, setUserId] = useState("");
    const [appointmentPatientInput, setAppointmentPatientInput] =useState('');
    const [appointmentPatientId, setAppointmentPatientId] =useState('');
    const [appointmentDoctorInput, setAppointmentDoctorInput] =useState('');
    const [appointmentDoctorId, setAppointmentDoctorId] =useState('');
    const [searchNameInput, setSearchNameInput] = useState('');
    const [userAge, setUserAge] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [searchTypeInput, setSearchTypeInput] = useState('');
    const [appointmentProcedureInput, setAppointmentProcedureInput] = useState('');
    const [appointmentDurationMinutesInput, setAppointmentDurationMinutesInput] = useState('');
    const [procedureFields, setProcedureFields] = useState(()=>
    
    {
        return [
            {procedure: '', durationMinutes: '', cost: ''},
        ]
    }
        
    );
    const [startTime, setStartTime] = useState(null);
    const [endtTime, setEndTime] = useState(null);
    const [statusInput, setStatusInput] = useState('');
    const [totalDurationMinutes, setTotalDurationMinutes] = useState(0);
    const [typeInput, setTypeInput] = useState('Scheduled');
    const [totalCost, setTotalCost] = useState(0);
    const [paymentFields, setPaymentFields] = useState([
        ]);
    const [paymentBalance, setPaymentBalance] = useState('');
    const [paymentChange, setPaymentChange] = useState('');
    // const [template, template] = useState('');
    useEffect(()=>{
        
        getUsers();

    }, []);


    // const formatDate2 = ()=>{
    //     let d = new Date(2010, 7, 5);
    //     let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    //     let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    //     let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    //     // console.log(`${da}-${mo}-${ye}`);
    // }

    const addAppointmentFunction = async ()=>{

        function validateEmptyObjectField(array){
            for (var i=0; i < array.length; i++) {
                if (array[i].procedure === "") {
                    return false;
                }
            }
            return true;
        }
        // setIsOpen(true);
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

        if (!appointmentPatientInput || !appointmentDoctorInput || !selectedDateInput ||
            !startTime || !statusInput || !typeInput) {
                
            alert('Empty field/s')
        }else{
            if (!validateEmptyObjectField(procedureFields)) {
                alert("Empty Procedure/s")
            } else {
                console.log('procedureFields: ',procedureFields);
                const response = await axios.post("http://172.16.0.101:3001/appointment", {
                    patient_id: appointmentPatientId,
                    doctor_id: appointmentDoctorId,
                    date: date,
                    start_time: startTime,
                    end_time: endtTime,
                    status_: statusInput,
                    type: typeInput,
                    procedures: procedureFields,
                    payments: paymentFields,
                 });   

                if (response.data.appointmentInsertOk) { 
                    alert('Appointment Added');
                }else{
                    alert('Failed Adding Appointment');
                }
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
            setIsOpen(false);
            getUsers();
            }else{
                alert('Failed Updating User');
            }
        }
        
    };
    const newAppointment = ()=>{
        getUsers();
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

        const responsePatient = await axios.get(`http://172.16.0.101:3001/user/${patientIdparam}`);
        
        if (responsePatient.data[0].id) {
            setSelectedDateInput(new Date(responsePatient.data[0].dob));
            setNameInput(responsePatient.data[0].name);
            setMobileInput(responsePatient.data[0].mobile);
            setEmailInput(responsePatient.data[0].email);
            // setPasswordInput(responsePatient.data[0].input);
            setGenderInput(responsePatient.data[0].gender);
            setAppointmentPatientInput(responsePatient.data[0].type);
            setUserId(responsePatient.data[0].id);
            setUserAgeFunction(responsePatient.data[0].dob);
            setIsOpen(true);
            
        } else {
            console.log('responsePatientId is empty: ', responsePatient.data[0].id)
        }
    }
    return (
        <div className='table-table2-container'>
            <AppointmentDetails
            isOpen={isOpen} setIsOpen={setIsOpen} addAppointmentFunction={addAppointmentFunction}
            updateUser={updateUser} userId={userId} appointmentPatientInput={appointmentPatientInput}
            setAppointmentPatientInput={setAppointmentPatientInput} genderInput={genderInput} setGenderInput={setGenderInput}
            nameInput={nameInput} setNameInput={setNameInput} mobileInput={mobileInput}
            setMobileInput={setMobileInput} emailInput={emailInput} setEmailInput={setEmailInput}
            selectedDateInput={selectedDateInput} setSelectedDateInput={setSelectedDateInput}
            userAge={userAge} passwordInput={passwordInput} setPasswordInput={setPasswordInput}
            patientsData={patientsData} appointmentPatientId={appointmentPatientId} setAppointmentPatientId={setAppointmentPatientId}
            usersData={usersData} appointmentDoctorInput={appointmentDoctorInput} appointmentDoctorId={appointmentDoctorId}
            setAppointmentDoctorInput={setAppointmentDoctorInput} setAppointmentDoctorId={setAppointmentDoctorId}
            startTime={startTime} setStartTime={setStartTime} 
            appointmentProcedureInput={appointmentProcedureInput} setAppointmentProcedureInput={setAppointmentProcedureInput}
            appointmentDurationMinutesInput={appointmentDurationMinutesInput} setAppointmentDurationMinutesInput={setAppointmentDurationMinutesInput}
            procedureFields={procedureFields} setProcedureFields={setProcedureFields}
            endtTime={endtTime} setEndTime={setEndTime} statusInput={statusInput} setStatusInput={setStatusInput}
            totalDurationMinutes={totalDurationMinutes} setTotalDurationMinutes={setTotalDurationMinutes}
            typeInput={typeInput} setTypeInput={setTypeInput}
            totalCost={totalCost} setTotalCost={setTotalCost}
            paymentFields={paymentFields} setPaymentFields={setPaymentFields}
            paymentBalance={paymentBalance} setPaymentBalance={setPaymentBalance}
            paymentChange={paymentChange} setPaymentChange={setPaymentChange}

            // setHours={setHours} setMinutes={setMinutes}
            ></AppointmentDetails>
            
            <div className='table-table2-table'>
                <thead className='table-table2-table-thead-search2'>
                    <tr className='table-table2-table-thead-tr-search2'>
                      
                        <th><input placeholder='Name' value={searchTypeInput} onChange={(e)=>{setSearchTypeInput(e.target.value)}}/></th>
                        <th><input placeholder='Doctor' value={searchNameInput} onChange={(e)=>{setSearchNameInput(e.target.value)}}/><button onClick={()=>{setSearchNameInput('');setSearchTypeInput('')}}>X</button></th>
                        
                        <th><input placeholder='Date' value={searchTypeInput} onChange={(e)=>{setSearchTypeInput(e.target.value)}}/></th>
                        <th><p onClick={()=>{getUsers({name: searchNameInput, type: searchTypeInput})}}>Find</p></th>
                        <th><p onClick={()=>newAppointment()}>New</p></th>
                        
                    </tr>
                </thead>
                <thead className='table-table2-table-thead'>
                    <tr className='table-table2-table-thead-tr'>
                        
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>No</th>
                    </tr>
                </thead>
                <tbody className='table-table2-table-tbody'>
                    
                    {usersData && usersData.map((user, index)=>{
                        
                        return (
                            <tr key={index} className='table-table2-table-tbody-tr'>
                               
                                <td>{user.name}</td>
                                <td>
                                    <button  id={user.status_=== 'Scheduled'? 'bg-green':'bg-black'}>{user.type}</button>
                                </td>
                                <td className='maxW50px'>22-Dec-21</td>
                                <td className='table-table2-table-body-tr-td'>
                                    <button style={{background:'green'}} onClick={()=>{detailsFunction(user.id)}}>10:33</button>
                                </td>
                                <td className='table-table2-table-body-tr-td'>
                                    <button onClick={()=>{detailsFunction(user.id)}}>33:33</button>
                         
                                </td>
                                <td><button onClick={()=>{detailsFunction(user.id)}}>{index+1}</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </div>

        </div>
    )
}

export default AppointmentTable;
