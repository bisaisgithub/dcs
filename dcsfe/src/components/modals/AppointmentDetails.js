import React from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

const AppointmentDetails = ({

    app_details_is_open, set_app_details_is_open, 
    addAppointmentFunction, 
    app_patient_name, set_app_patient_name,
    app_date, set_app_date,
    patientsData, 
    set_app_patient_id, app_patient_id,
    usersData, 
    set_app_user_doctor_id,
    app_user_doctor_name,set_app_user_doctor_name,
    app_start_time,set_app_start_time,
    app_proc_duration_minutes,set_app_proc_duration_minutes,
    app_proc_fields, set_app_proc_fields,
    app_end_time, set_app_end_time, 
    app_status, set_app_status,
    app_total_proc_duration_minutes, set_app_total_proc_duration_minutes,
    set_app_type,app_type,
    set_app_total_proc_cost, app_total_proc_cost,
    set_app_pay_fields, app_pay_fields,
    set_app_pay_balance, app_pay_balance,
    app_pay_change, set_app_pay_change

    }) => {
    if (!app_details_is_open) {
        return null;
    }

    const addProcedureFieldFunction = ()=>{
        set_app_proc_fields((prev)=>
        {
            return [...prev, {procedure: '', durationMinutes: '', cost: ''}]
        }
            )
    }

    const addPaymentFieldFunction = ()=>{
        set_app_pay_fields([...app_pay_fields, {payment: '', date: new Date(), change: '', balance: ''}])
    }

    const removePaymentFieldFunction= (index, cost)=>{
        const values = [...app_pay_fields];
        values.splice(index, 1);
        set_app_pay_fields(values);
        if (parseFloat(cost)>0) {
            set_app_pay_balance(parseFloat(app_pay_balance + parseFloat(cost))); 
        }
        
    }
    
    const removeProcedureFieldFunction = (index, duration, cost) =>{
        
        set_app_proc_fields((prev)=>{
            const values = [...prev];
            values.splice(index, 1);
            return values;
        })
        set_app_total_proc_cost(parseFloat(app_total_proc_cost - cost));        
        set_app_pay_balance(parseFloat(app_pay_balance - cost));

        set_app_end_time(
            new Date(
                new Date(new Date(app_end_time).setMinutes(new Date(app_end_time).getMinutes()-duration))
                    ));  
    }

    const handleChangeInputPayment = async (index, event)=>{
        const values = [...app_pay_fields];
        values[index][event.target.name] = event.target.value;

        await set_app_pay_fields(values);

        let totalPayment = 0;
        app_pay_fields.map((paymentField)=>{
            if (parseInt(paymentField.payment)>0) {
                
                totalPayment = totalPayment + parseFloat(paymentField.payment);
            }
            return null;
        });
        if (app_total_proc_cost-totalPayment>-1) {
           await set_app_pay_balance(parseFloat(app_total_proc_cost-totalPayment));
           await set_app_pay_change(0);
            const values2 = [...app_pay_fields];
            values[index]['change'] = 0;
            values[index]['balance'] = parseFloat(app_total_proc_cost-totalPayment);
            await set_app_pay_fields(values2);
        } else {
            await set_app_pay_balance(0);
            await set_app_pay_change(parseFloat(totalPayment-app_total_proc_cost));
            const values2 = [...app_pay_fields];
            values[index]['change'] = parseFloat(totalPayment-app_total_proc_cost);
            values[index]['balance'] = 0;
            await set_app_pay_fields(values2);
        }
        
        
    }

    const handleChangeInput =(index, event)=>{
        if (app_start_time) {
            const values = [...app_proc_fields];
            values[index][event.target.name] = event.target.value;
            set_app_proc_fields(values);

            let totalMinutes = 0;
            let totalCostTemporary = 0;
            set_app_total_proc_cost(0);
            let totalPayment = 0;
            app_proc_fields.map((procedureField)=>{
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

                    totalCostTemporary = totalCostTemporary + parseFloat(procedureField.cost);
                }
                
                
                   
                
                return null;
            })

            
            set_app_end_time(
                new Date(
                    // new Date(app_end_time).setMinutes(app_end_time.getMinutes()+app_total_proc_duration_minutes)
                    new Date(new Date(app_start_time).setMinutes(new Date(app_start_time).getMinutes()+totalMinutes))
                        ))
                        // console.log('totalMinutes: ', totalMinutes)
                        // console.log('app_end_time', app_end_time)

            app_pay_fields.map((paymentField)=>{
                if (parseFloat(paymentField.payment)>0) {
                    totalPayment = totalPayment + parseFloat(paymentField.payment);
                }else{
                    totalPayment = totalPayment + 0;
                }
                return null;
            });
            set_app_total_proc_cost(parseFloat(totalCostTemporary));
            // console.log('app_total_proc_cost', app_total_proc_cost);
            // console.log('totalPayment' , totalPayment)
            set_app_pay_balance(parseFloat(totalCostTemporary-totalPayment));
        } else {
            alert('please select start time first')
        }
    }
    
    const setAppointmentPatientIdFunction = (name)=>{
         patientsData.map((patient)=>{
            if (patient.name === name) {
                set_app_patient_id(patient.id);
            }
            return null;

        });
        set_app_patient_name(name);
    }

    const setAppointmentDoctorIdFunction = (name)=>{
            usersData.map((user)=>{
            if (user.name === name) {
               set_app_user_doctor_id(user.id);
            }
            return null;
        });
        set_app_user_doctor_name(name)
    }
    return ReactDOM.createPortal(
        <>
            <div className='details-details-container'>
                <div className='details-details-modal-container'>
                    <div className='details-details-modal-body-container'>
                        <div className='details-details-modal-body'>
                            <div className="details-details-modal-body-input-box">
                                <span>Patient</span>
                                <select value={app_patient_name} onChange={(e)=>{setAppointmentPatientIdFunction(e.target.value)}}>
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
                                <select value={app_user_doctor_name} onChange={(e)=>{setAppointmentDoctorIdFunction(e.target.value)}}>
                                    {usersData && usersData.map((user, index)=>{
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
                                selected={app_date} 
                                onChange={date=>set_app_date(date)} />
                            </div>
                            <div className='details-details-modal-body-input-box'>
                                <span>Start Time</span>
                                <DatePicker
                                    selected={app_start_time}
                                    onChange={(dateStartTime) => {set_app_start_time(dateStartTime);}}
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
                            app_proc_fields.map((procedureField, index)=>{
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
                                                <button className='add-remove-button' onClick={()=>{removeProcedureFieldFunction(index, procedureField.durationMinutes, procedureField.cost)}}>-</button>
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
                                <input type='number' value={app_total_proc_cost} disabled />
                                
                            </div>
                            <div className="details-details-modal-body-input-box">
                                <span>End Time</span>
                                <div className='duration-minutes-container'>
                                    {/* <input value={app_end_time} disabled/> */}
                                    <DatePicker
                                        selected={app_end_time}
                                        // onChange={(date) => set_app_start_time(date)}
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
                                <select name="status" value={app_status} onChange={(e)=>{set_app_status(e.target.value)}}>
                                    <option value="">-Select Status-</option>
                                    <option value="On Schedule">On Schedule</option>
                                </select>       
                            </div>
                            <div className="details-details-modal-body-input-box">
                                <span>Type</span>
                                <select name="status" value={app_type} onChange={(e)=>{set_app_type(e.target.value)}}>
                                    <option value="">-Select Type-</option>
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="Walk-in">Walk-in</option>
                                </select>       
                            </div>
                        </div>
                        <div className='display-flex' style={{marginTop:'5px'}} >
                            <div className="details-details-modal-body-input-box">
                                <span>Balance</span>
                                <input style={app_pay_balance>0? {color: 'red', fontWeight: '600', fontSize:'14px'} : {}} disabled value={app_pay_balance} />
                            </div>
                            
                        </div>

                            {
                                app_pay_fields.map((paymentField, index)=>{
                                    return (
                                        
                                        <div className='display-flex' style={{marginTop:'0px',flexWrap: 'wrap'}}  key={index}>
                                            <div className='display-flex' style={{marginTop:'0px'}}  key={index}>
                                                <div className='details-details-modal-body-input-box'>
                                                    <span style={false? {display: 'none'}:{}} >Payment</span>
                                                    <div className='display-flex'>
                                                        
                                                        <input type='number' name='payment' value={paymentField.payment} onChange={(event)=>{handleChangeInputPayment(index, event)}}/>
                                                        <button className='add-remove-button height-80p' onClick={()=>{removePaymentFieldFunction(index, paymentField.payment)}}>-</button>
                                                    </div>
                                                </div>
                                                    
                                                    
                                                <div className='details-details-modal-body-input-box'>
                                                    <span style={false? {display: 'none'}:{}}>Date of Payment</span>
                                                        
                                                    <DatePicker 
                                                    // minDate={new Date()} 
                                                    yearDropdownItemNumber={90} 
                                                    showYearDropdown 
                                                    scrollableYearDropdown={true} 
                                                    dateFormat='MMMM d, yyyy h:mm' 
                                                    className='date-picker' 
                                                    placeholderText="Select Date" 
                                                    selected={paymentField.date} 
                                                    // onChange={date=>set_app_date(date)} 
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className='display-flex' style={{marginTop:'0px'}}  key={index}>
                                                <div className="details-details-modal-body-input-box">
                                                    <span>Change</span>
                                                    <input style={paymentField.change>0? {color: 'green', fontWeight: '600', fontSize:'14px'} : {}} disabled value={paymentField.change} />
                                                </div>
                                                <div className="details-details-modal-body-input-box">
                                                    <span>Balance After Payment</span>
                                                    <input style={paymentField.balancee>0? {color: 'red', fontWeight: '600', fontSize:'14px'} : {}} disabled value={paymentField.balance} />
                                                </div>
                                            </div>
                                            
                                                
                                        </div>
                                                                                      
                                        // </div>
                                    );
                                })
                            }
                        
                        <button className='add-remove-button height-80p' onClick={()=>{addPaymentFieldFunction()}}>+</button>
                        {/* <p>app_proc_fields: {app_proc_fields}</p> */}
                    </div>                    
                    <div className='details-details-modal-body-button'>                    
                        {/* {userId? (<input type="submit" onClick={updateUser} value='Update' className='percent-40'/>):
                        (<input type="submit" onClick={addUser} value='Add' className='percent-40'/>)}   */}
                        <button className='button-w70' onClick={()=>{addAppointmentFunction()}}>Add Appointment</button>                               
                        <button className='button-w20' onClick={()=>{set_app_details_is_open(false); set_app_date(new Date())}}>Close</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('appointment-details')
        
    );
};

export default AppointmentDetails;
