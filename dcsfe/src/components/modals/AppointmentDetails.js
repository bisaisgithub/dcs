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
    }) => {
    if (!isOpen) {
        return null;
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
                            <span>Date of Birth</span>
                            <DatePicker 
                            maxDate={new Date()} 
                            yearDropdownItemNumber={90} 
                            showYearDropdown 
                            scrollableYearDropdown={true} 
                            dateFormat='yyyy/MM/dd' 
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
                                timeIntervals={15}
                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                maxTime={setHours(setMinutes(new Date(), 0), 17)}
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
                    <div className='details-details-modal-body-button'>                    
                        {/* {userId? (<input type="submit" onClick={updateUser} value='Update' className='percent-40'/>):
                        (<input type="submit" onClick={addUser} value='Add' className='percent-40'/>)}   */}
                        <button onClick={userId? updateUser : addUser}>{userId? 'Update' : 'Add'}</button>                               
                        <button onClick={()=>{setIsOpen(false); setSelectedDateInput(new Date())}}>Close</button>
                    </div>
               

                    
                </div>
            </div>
        </>,
        document.getElementById('appointment-details')
        
    );
};

export default AppointmentDetails;
