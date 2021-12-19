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
    procedureFields, setProcedureFields,endtTime,setEndTime,statusInput,setStatusInput,
    totalDurationMinutes,setTotalDurationMinutes

    }) => {
    if (!isOpen) {
        return null;
    }

    const addProcedureFieldFunction = ()=>{
        setProcedureFields([...procedureFields, {procedure: '', durationMinutes: ''}])
    }
    const removeProcedureFieldFunction = (index, duration) =>{
        const values = [...procedureFields];
        values.splice(index, 1);
        setProcedureFields(values);
        // console.log('duration: ', duration);
        setEndTime(
            new Date(
                // new Date()
                new Date(new Date(endtTime).setMinutes(new Date(endtTime).getMinutes()-duration))
                    ));
      
    }

    const handleChangeInput =(index, event)=>{
        const values = [...procedureFields];
        values[index][event.target.name] = event.target.value;
        setProcedureFields(values);

        let totalMinutes = 0;
        procedureFields.map((procedureField)=>{
            
            totalMinutes = totalMinutes + parseInt(procedureField.durationMinutes);
            // setTotalDurationMinutes(totalDurationMinutes + parseInt(procedureField.durationMinutes));
            
            
            return null;
        })

        setEndTime(
            new Date(
                // new Date(endtTime).setMinutes(endtTime.getMinutes()+totalDurationMinutes)
                new Date(new Date(startTime).setMinutes(new Date(startTime).getMinutes()+totalMinutes))
                    ));
        // console.log('totalDurationMinutes: ',totalDurationMinutes)
        
        // setEndTime(new Date().setMinutes+totalDurationMinutes));
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
                <div className='details-details-modal-container'>
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
                                onChange={(dateStartTime) => {setStartTime(dateStartTime);}}
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
                                        <button className='add-remove-button' onClick={()=>{removeProcedureFieldFunction(index, procedureField.durationMinutes)}}>-</button>
                                    </div>
                                         
                                </div>
                            </div>
                            );
                        })
                    }
                    
                    <div className='details-details-modal-body-button-procedure'>                                               
                        <button className='add-remove-button' onClick={()=>{addProcedureFieldFunction()}}>+</button>
                    </div>

                    <p>{'endtTime: '+endtTime}</p>
                    <p>{'totalDurationMinutes: '+totalDurationMinutes}</p>

                    <div className='display-flex'>
                    <div className="details-details-modal-body-input-box">
                        <span>Status</span>
                        <select name="status" value={statusInput} onChange={(e)=>{setStatusInput(e.target.value)}}>
                            <option value="-Select Status-">-Select Status-</option>
                            <option value="On Schedule">On Schedule</option>
                        </select>       
                    </div>
                    <div className="details-details-modal-body-input-box">
                        <span>End Time</span>
                        <div className='duration-minutes-container'>
                            <input value={endtTime} disabled/>
                        </div> 
                        {/* <DatePicker
                                selected={endtTime}
                                // onChange={(date) => setStartTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                // timeIntervals={30}
                                // minTime={setHours(setMinutes(new Date(), 0), 8)}
                                // maxTime={setHours(setMinutes(new Date(), 30), 18)}
                                placeholderText="Select Start Time"
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            /> */}
                    </div>
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
