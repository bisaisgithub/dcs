import React from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

const AppointmentDetails = ({
    isOpen, setIsOpen, addUser, updateUser,userId,
    appointmentPatientInput,setAppointmentPatientInput,genderInput,setGenderInput,
    nameInput,setNameInput,mobileInput,setMobileInput,emailInput,
    setEmailInput,selectedDateInput,setSelectedDateInput,userAge,
    passwordInput,setPasswordInput,patientsData, setAppointmentPatientId, appointmentPatientId,
    usersData, appointmentDoctorId, setAppointmentDoctorId,appointmentDoctorInput,setAppointmentDoctorInput,
    startTime,setStartTime,
    appointmentProcedureInput,setAppointmentProcedureInput,
    appointmentDurationMinutesInput,setAppointmentDurationMinutesInput,
    procedureFields, setProcedureFields
    }) => {
    if (!isOpen) {
        return null;
    }

    const addProcedureFieldFunction = ()=>{
        setProcedureFields([...procedureFields, {procedure: '', durationMinutes: ''}])
    }
    const removeProcedureFieldFunction = (index) =>{
        const values = [...procedureFields];
        values.splice(index, 1);
        setProcedureFields(values);
    }

    const handleChangeInput =(index, event)=>{
        const values = [...procedureFields];
        values[index][event.target.name] = event.target.value;
        setProcedureFields(values);
    }

    const addAppointmentFunction = ()=>{
        // insert appointment

        //insert procedures
        // console.log('procedureFields: ', procedureFields);
    }
    
    const setAppointmentPatientIdFunction = (name)=>{
         patientsData.map((patient)=>{
            if (patient.name === name) {
                setAppointmentPatientId(patient.id);
            }
            return null;

        });
        setAppointmentPatientInput(name);
    }

    const setAppointmentDoctorIdFunction = (name)=>{
            usersData.map((user)=>{
            if (user.name === name) {
               setAppointmentDoctorId(user.id);
            }
            return null;

        });
        setAppointmentDoctorInput(name)
    }
    return ReactDOM.createPortal(
        <>
            <div className='details-details-container'>
                {/* {console.log('patientsName from jsx', patientsData[0].name)} */}
                <div className='details-details-modal-container'>
                    {/* <div className='details-details-modal-title'>{userId? `${nameInput} Details --  Age: ${userAge}`: 'User Details'}</div> */}
                    <div className='details-details-modal-body'>
                        <div className="details-details-modal-body-input-box">
                            <span>Patient</span>
                            <select value={appointmentPatientInput} onChange={(e)=>{setAppointmentPatientIdFunction(e.target.value)}}>
                                {patientsData && patientsData.map((patient, index)=>{
                                    return (
                                        <option key={index} value={patient.name}>{patient.name}</option>
                                    );
                                })}
                                <option value="-Select Patient-">-Select Patient-</option>
                            </select>       
                        </div>
                        <div className="details-details-modal-body-input-box">
                            <span>Doctor</span>
                            <select value={appointmentDoctorInput} onChange={(e)=>{setAppointmentDoctorIdFunction(e.target.value)}}>
                                {patientsData && usersData.map((user, index)=>{
                                    return (
                                        <option key={index} value={user.name}>{user.name}</option>
                                    );
                                })}
                                <option value="-Select Doctor-">-Select Doctor-</option>
                            </select>       
                        </div>
                        <div className='details-details-modal-body-input-box'>
                            <span>Date</span>
                            <DatePicker 
                            maxDate={new Date()} 
                            yearDropdownItemNumber={90} 
                            showYearDropdown 
                            scrollableYearDropdown={true} 
                            dateFormat='MMMM d, yyyy' 
                            className='date-picker' 
                            placeholder="Enter Date of Birth" 
                            selected={selectedDateInput} 
                            onChange={date=>setSelectedDateInput(date)} />
                        </div>
                        <div className='details-details-modal-body-input-box'>
                            <span>Start Time</span>
                            <DatePicker
                                selected={startTime}
                                onChange={(date) => setStartTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                maxTime={setHours(setMinutes(new Date(), 30), 18)}
                                placeholderText="Select Start Time"
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                        
                        
                        
                        {/* <p>appointmentPatientInput: {appointmentPatientInput}</p>
                        <p>appointmentPatientId: {appointmentPatientId}</p>
                        <p>appointmentDoctorInput: {appointmentDoctorInput}</p>
                        <p>appointmentDoctorId: {appointmentDoctorId}</p> */}

   
                        {/* <div className='details-details-modal-body-input-box'>
                            <span>Date of Birth</span>
                            <DatePicker maxDate={new Date()} yearDropdownItemNumber={90} showYearDropdown scrollableYearDropdown={true} dateFormat='yyyy/MM/dd' className='date-picker' placeholder="Enter Date of Birth" selected={selectedDateInput} onChange={date=>setSelectedDateInput(date)} />
                        </div>
                        <div className='details-details-modal-body-input-box'>
                            <span>Full Name</span>
                            <input type="text" placeholder="Enter name" value={nameInput} required onChange={e=>setNameInput(e.target.value)} />
                        </div>
                        <div className="details-details-modal-body-input-box">
                            <span>Mobile</span>
                            <input type="text" placeholder="Enter mobile" value={mobileInput} required onChange={e=>setMobileInput(e.target.value)}/>
                        </div>                       
                        <div className="details-details-modal-body-input-box">
                            <span>Email</span>
                            <input type="text" placeholder="Enter email" value={emailInput} required onChange={e=>setEmailInput(e.target.value)}/>
                        </div>
                        <div className="details-details-modal-body-input-box">
                            <span>Password</span>
                            <input type="password" placeholder="Enter password" value={passwordInput} required onChange={e=>setPasswordInput(e.target.value)}/>
                        </div>
                        <div className="details-details-modal-body-status-gender">
                            <div className="details-details-modal-body-input-box">
                                <span>Type</span>
                                <select value={appointmentPatientInput} onChange={(e)=>{setAppointmentPatientIdFunction(e.target.value)}}>
                                    {patientsData && patientsData.map((patient, index)=>{
                                        return (
                                            <option key={index} value={patient.name}>{patient.name}</option>
                                        );
                                    })}
                                    <option value="-Select Status-">-Select Type-</option>
                                </select>       
                            </div>
                            <div className='details-details-modal-body-gender'>
                                <span>Gender</span>
                                <div className='details-details-modal-body-input-box-gender'>
                                    <div>
                                        <input type="radio" name="gender" checked={genderInput==="Male"? true: false} id="dot-1" value="Male" onChange={e=>setGenderInput(e.target.value)}/>
                                        <span className='details-details-modal-body-input-box-gender-span-male'>Male</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" checked={genderInput==="Female"? true: false} id="dot-2" value="Female" onChange={e=>setGenderInput(e.target.value)}/>
                                        <span>Female</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        

                    </div>
                    {
                        
                        
                        procedureFields.map((procedureField, index)=>{
                            return (
                                
                                <div style={{marginTop:'0'}} className='details-details-modal-body' key={index}>
                                <div className="details-details-modal-body-input-box">
                                    <span style={index? {display: 'none'}:{}}>Procedure</span>
                                    <select name="procedure" value={procedureField.procedure} onChange={(event)=>{handleChangeInput(index, event)}}>
                                        <option value="-Select Procedure-">-Select Procedure-</option>
                                        <option value="Extraction">Extraction</option>
                                    </select>       
                                </div>
                                <div className="details-details-modal-body-input-box">
                                    <span style={index? {display: 'none'}:{}}>Duration Minutes</span>
                                    <div className='duration-minutes-container'>
                                        <select name="durationMinutes" value={procedureField.durationMinutes} onChange={(event)=>{handleChangeInput(index, event)}}>
                                            <option value="-Select Minutes-">-Select Minutes-</option>
                                            <option value="60">60</option>
                                        </select>
                                        <button className='add-remove-button' onClick={(index)=>{removeProcedureFieldFunction()}}>-</button>
                                    </div>
                                         
                                </div>
                            </div>
                            );
                        })
                    }
                    <div className='details-details-modal-body-button-procedure'>                                               
                        <button className='add-remove-button' onClick={()=>{addProcedureFieldFunction()}}>+</button>
                    </div>
                    <div className='details-details-modal-body-button'>                    
                        {/* {userId? (<input type="submit" onClick={updateUser} value='Update' className='percent-40'/>):
                        (<input type="submit" onClick={addUser} value='Add' className='percent-40'/>)}   */}
                        <button className='button-w70' onClick={()=>{addAppointmentFunction()}}>Add Appointment</button>                               
                        <button className='button-w20' onClick={()=>{setIsOpen(false); setSelectedDateInput(new Date())}}>Close</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('appointment-details')
        
    );
};

export default AppointmentDetails;
