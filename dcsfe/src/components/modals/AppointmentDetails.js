import React from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

const AppointmentDetails = ({
    isOpen, setIsOpen, addAppointmentFunction, updateUser,userId,
    appointmentPatientInput,setAppointmentPatientInput,genderInput,setGenderInput,
    nameInput,setNameInput,mobileInput,setMobileInput,emailInput,
    setEmailInput,selectedDateInput,setSelectedDateInput,userAge,
    passwordInput,setPasswordInput,patientsData, setAppointmentPatientId, appointmentPatientId,
    usersData, appointmentDoctorId, setAppointmentDoctorId,appointmentDoctorInput,setAppointmentDoctorInput,
    startTime,setStartTime,
    appointmentProcedureInput,setAppointmentProcedureInput,
    appointmentDurationMinutesInput,setAppointmentDurationMinutesInput,
    procedureFields, setProcedureFields,endtTime,setEndTime,statusInput,setStatusInput,
    totalDurationMinutes,setTotalDurationMinutes,setTypeInput,typeInput,
    setTotalCost,totalCost,
    setPaymentFields,paymentFields

    }) => {
    if (!isOpen) {
        return null;
    }

    const addProcedureFieldFunction = ()=>{
        setProcedureFields([...procedureFields, {procedure: '', durationMinutes: '', cost: ''}])
    }
    const removeProcedureFieldFunction = (index, duration) =>{
        const values = [...procedureFields];
        values.splice(index, 1);
        setProcedureFields(values);
        setEndTime(
            new Date(
                new Date(new Date(endtTime).setMinutes(new Date(endtTime).getMinutes()-duration))
                    ));
    }

    const handleChangeInput =(index, event)=>{
        if (startTime) {
            const values = [...procedureFields];
            values[index][event.target.name] = event.target.value;
            setProcedureFields(values);

            let totalMinutes = 0;
            let totalCost = 0;
            // procedureFields.map((procedureField)=>{
            //     if (condition) {
                    
            //     } else {
                    
            //     }
            // });
            procedureFields.map((procedureField)=>{
                if (!parseInt(procedureField.durationMinutes)<1) {
                    totalMinutes = totalMinutes + parseInt(procedureField.durationMinutes);
                } else {
                    if (procedureField.procedure === 'Extraction') {
                        procedureField.durationMinutes = 30;
                        procedureField.cost = 500;
                    }else if(procedureField.procedure === 'Cleaning'){
                        procedureField.durationMinutes = 60;
                        procedureField.cost = 800;
                    }else if(procedureField.procedure === 'Consultation'){
                        procedureField.durationMinutes = 15;
                        procedureField.cost = 300;
                    }
                    else {
                        procedureField.durationMinutes = 0;
                    }
                   
                    totalMinutes = totalMinutes + parseInt(procedureField.durationMinutes);
                }

                if (procedureField.cost>0) {

                    totalCost = totalCost + parseInt(procedureField.cost);
                }
                
                return null;
            })
            
            setTotalCost(totalCost);
            setEndTime(
                new Date(
                    // new Date(endtTime).setMinutes(endtTime.getMinutes()+totalDurationMinutes)
                    new Date(new Date(startTime).setMinutes(new Date(startTime).getMinutes()+totalMinutes))
                        ))
                        // console.log('totalMinutes: ', totalMinutes)
                        // console.log('endtTime', endtTime)
        } else {
            alert('please select start time first')
        }
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
                    <div className='details-details-modal-body-container'>
                        <div className='details-details-modal-body'>
                            <div className="details-details-modal-body-input-box">
                                <span>Patient</span>
                                <select value={appointmentPatientInput} onChange={(e)=>{setAppointmentPatientIdFunction(e.target.value)}}>
                                    {patientsData && patientsData.map((patient, index)=>{
                                        return (
                                            <option key={index} value={patient.name}>{patient.name}</option>
                                        );
                                    })}
                                    <option value="">-Select Patient-</option>
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
                                    <option value="">-Select Doctor-</option>
                                </select>       
                            </div>
                            <div className='details-details-modal-body-input-box'>
                                <span>Date</span>
                                <DatePicker 
                                minDate={new Date()} 
                                yearDropdownItemNumber={90} 
                                showYearDropdown 
                                scrollableYearDropdown={true} 
                                dateFormat='MMMM d, yyyy' 
                                className='date-picker' 
                                placeholderText="Select Date" 
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
                                    timeIntervals={15}
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
                                        <div className="details-details-modal-body-input-box3">
                                            <span style={index? {display: 'none'}:{}}>Procedure</span>
                                            <select name="procedure" value={procedureField.procedure} onChange={(event)=>{handleChangeInput(index, event)}}>
                                                <option value="">-Select Procedure-</option>
                                                <option value="Consultation">Consultation</option>
                                                <option value="Extraction">Extraction</option>
                                                <option value="Cleaning">Cleaning</option>
                                            </select>       
                                        </div>
                                        <div className="details-details-modal-body-input-box3">
                                            <span style={index? {display: 'none'}:{}}>Duration Minutes</span>
                                                <select name="durationMinutes" value={procedureField.durationMinutes} onChange={(event)=>{handleChangeInput(index, event)}}>
                                                    <option value=''>-Select Minutes-</option>
                                                    <option value={15}>15</option>
                                                    <option value={30}>30</option>
                                                    <option value={60}>60</option>
                                                </select>
                                        </div>
                                        <div className="details-details-modal-body-input-box3">
                                            <span style={index? {display: 'none'}:{}}>Cost</span>
                                            <div className='duration-minutes-container'>
                                                <input type='number' name="cost" value={procedureField.cost} onChange={(event)=>{handleChangeInput(index, event)}}/>
                                                <button className='add-remove-button' onClick={()=>{removeProcedureFieldFunction(index, procedureField.durationMinutes)}}>-</button>
                                            </div>                                    
                                        </div>
                                    </div>
                                );
                            })
                        }
                        
                        <div className='display-flex'>
                            <div className='details-details-modal-body-button-procedure'>                                               
                                <button className='add-remove-button height-80p' onClick={()=>{addProcedureFieldFunction()}}>+</button>
                            </div>
                            <div className="details-details-modal-body-input-box">
                                <span>Total Cost</span>
                                <input type='number' value={totalCost} disabled />
                                
                            </div>
                            <div className="details-details-modal-body-input-box">
                                <span>End Time</span>
                                <div className='duration-minutes-container'>
                                    {/* <input value={endtTime} disabled/> */}
                                    <DatePicker
                                        selected={endtTime}
                                        // onChange={(date) => setStartTime(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        // timeIntervals={30}
                                        // minTime={setHours(setMinutes(new Date(), 0), 8)}
                                        // maxTime={setHours(setMinutes(new Date(), 30), 18)}
                                        // placeholderText="Select Start Time"
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        disabled
                                    />
                                </div> 
                                
                            </div>
                        </div>
                        

                        <div className='display-flex'>
                            <div className="details-details-modal-body-input-box">
                                <span>Status</span>
                                <select name="status" value={statusInput} onChange={(e)=>{setStatusInput(e.target.value)}}>
                                    <option value="">-Select Status-</option>
                                    <option value="On Schedule">On Schedule</option>
                                </select>       
                            </div>
                            <div className="details-details-modal-body-input-box">
                                <span>Type</span>
                                <select name="status" value={typeInput} onChange={(e)=>{setTypeInput(e.target.value)}}>
                                    <option value="">-Select Type-</option>
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="Walk-in">Walk-in</option>
                                </select>       
                            </div>
                        </div>
                        <div className='details-details-modal-body-input-box'>
                            {
                                paymentFields.map((paymentField, index)=>{
                                    return (
                                        
                                        <div style={{marginTop:'0'}} className='details-details-modal-body' key={index}>
                                            <div className="details-details-modal-body-input-box3">
                                                <span style={index? {display: 'none'}:{}}>Payment</span>
                                                <input />      
                                            </div>
                                            <div className="details-details-modal-body-input-box3">
                                                <span style={index? {display: 'none'}:{}}>Balance</span>
                                                    <input />
                                            </div>
                                        </div>
                                    );
                                })
                            }
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
