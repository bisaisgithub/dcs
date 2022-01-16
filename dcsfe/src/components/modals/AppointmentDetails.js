import React from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import Select from 'react-select';
// import DatePicker, { registerLocale } from "react-datepicker";
// import el from "date-fns/locale/"; // the locale you want
// registerLocale("el", el); // register it with the name you want

const AppointmentDetails = ({

    app_details_is_open, set_app_details_is_open, 
    addAppointmentFunction, 
    app_patient_name, set_app_patient_name,
    app_date, set_app_date,
    app_patient_list, 
    set_app_patient_id, app_patient_id,
    app_user_doctor_list, 
    app_user_doctor_id,set_app_user_doctor_id,
    app_user_doctor_name,set_app_user_doctor_name,
    app_start_time,set_app_start_time,
    app_proc_duration_minutes,set_app_proc_duration_minutes,
    app_proc_fields, set_app_proc_fields,
    app_end_time, set_app_end_time, 
    app_status, set_app_status,
    app_total_proc_duration_minutes, set_app_total_proc_duration_minutes,
    set_app_type,app_type,
    set_app_total_proc_cost, app_total_proc_cost,
    set_app_pay_amount, app_pay_amount,
    set_app_pay_balance, app_pay_balance,
    app_pay_change, set_app_pay_change,
    app_pay_date, set_app_pay_date,
    showAddPayment, set_showAddPayment,
    app_patient_name_id,
    app_id,
    app_pay_fields, set_app_pay_fields,

    }) => {
    if (!app_details_is_open) {
        return null;
    }

    const addProcedureFieldFunction = ()=>{
        set_app_proc_fields((prev)=>
        {
            return [...prev, {proc_name: '', proc_duration_minutes: 0, proc_cost: 0}]
        }
            )
    }

    const addPaymentFieldFunction = ()=>{
        set_app_pay_fields([...app_pay_fields, {pay_amount: '', pay_date: new Date(), pay_change: '', pay_balance: ''}])
    }

    const removePaymentFieldFunction= (index, proc_cost)=>{
        const values = [...app_pay_fields];
        values.splice(index, 1);
        set_app_pay_fields(values);
        if (parseFloat(proc_cost)>0) {
            console.log('proc_cost : ', proc_cost);
            set_app_pay_balance(parseFloat(app_pay_balance + parseFloat(proc_cost))); 
        }else{
            console.log(' else proc_cost:', proc_cost)
        }
    }
    
    // const removeProcedureFieldFunction = (index, duration, proc_cost) =>{
        
    //     set_app_proc_fields((prev)=>{
    //         const values = [...prev];
    //         values.splice(index, 1);
    //         return values;
    //     });
    //     set_app_total_proc_cost(parseFloat(app_total_proc_cost - proc_cost));        
    //     set_app_pay_balance(parseFloat(app_pay_balance - proc_cost));

    //     set_app_end_time(
    //         new Date(
    //             new Date(new Date(app_end_time).setMinutes(new Date(app_end_time).getMinutes()-duration))
    //                 ));  
    // }

    const handleChangeInputPayment = async (index, event, date, ename)=>{
        if (event) {
            // console.log('event.target.value has value');
            const values = [...app_pay_fields];
            values[index][event.target.name] = event.target.value;
            // console.log('values: ', values)
            // console.log('index: ', index);
            // console.log('event: ', event);
            // console.log('event.target.name: ', event.target.name);
            // console.log('event.target.value: ', event.target.value);

            await set_app_pay_fields(values);
            // console.log('values: ', values);

            let totalPayment = 0;
            app_pay_fields.map((app_pay_field)=>{
                if (parseInt(app_pay_field.pay_amount)>0) {
                    
                    totalPayment = totalPayment + parseFloat(app_pay_field.pay_amount);
                }
                return null;
            });
            if (app_total_proc_cost-totalPayment>-1) {
               await set_app_pay_balance(parseFloat(app_total_proc_cost-totalPayment));
               await set_app_pay_change(0);
                const values2 = [...app_pay_fields];
                values[index]['pay_change'] = 0;
                values[index]['pay_balance'] = parseFloat(app_total_proc_cost-totalPayment);
                await set_app_pay_fields(values2);
            } else {
                await set_app_pay_balance(0);
                await set_app_pay_change(parseFloat(totalPayment-app_total_proc_cost));
                const values2 = [...app_pay_fields];
                values[index]['pay_change'] = parseFloat(totalPayment-app_total_proc_cost);
                values[index]['pay_balance'] = 0;
                await set_app_pay_fields(values2);
            }
        }else{
            // console.log('event.target.value is empty');
            // console.log('date', date.toLocaleTimeString('PST'));
            // console.log('date: ', date);
            // console.log('date js: ', new Date());
            const values = [...app_pay_fields];
            values[index][ename] = date;
            console.log('values: ', values);
            await set_app_pay_fields(values);
        }
    }

    const recalculateEndTime = (start_time)=>{
        // console.log('recalculateEndTime param', start_time);
        if (!app_end_time) {
            set_app_end_time(start_time)
        }else{
            let totalMinutes = 0;
            // let totalCostTemporary = 0;
            // set_app_total_proc_cost(0);
            // let totalPayment = 0;
            // console.log('app_proc_fields: ',app_proc_fields)
            app_proc_fields.map((app_proc_field)=>{
                totalMinutes = totalMinutes + parseInt(app_proc_field.proc_duration_minutes);
                // totalCostTemporary = totalCostTemporary + parseInt(app_proc_field.proc_cost)
                return null;
            })
            
            // set_app_total_proc_cost(totalCostTemporary)
            set_app_end_time(
                new Date(
                    new Date(new Date(start_time).setMinutes(new Date(start_time).getMinutes()+totalMinutes))
                        ));
        }
    }

    const handleChangeInput =(index, event)=>{
        console.log('app_proc_fields: ',app_proc_fields)
        if (app_start_time) {
            const values = [...app_proc_fields];
            values[index][event.target.name] = event.target.value;
            let totalMinutes = 0;
            let totalCost = 0;
            values.map((value)=>{
                if (!value.proc_name == '') {                    
                    if (parseInt(value.proc_duration_minutes)>0) {
                        totalMinutes = totalMinutes + parseInt(value.proc_duration_minutes);
                    }else{
                        if (value.proc_name === 'Extraction') {
                            value.proc_duration_minutes = 30;
                            value.proc_cost = 500;
                        }else if(value.proc_name === 'Cleaning'){
                            value.proc_duration_minutes = 60;
                            value.proc_cost = 800;
                        }else if(value.proc_name === 'Consultation'){
                            value.proc_duration_minutes = 15;
                            value.proc_cost = 300;
                        }
    
                        totalMinutes = totalMinutes + parseInt(value.proc_duration_minutes);
                    }
                }else{
                    alert('Please Select Procedure First')
                    value.proc_duration_minutes = 0;
                    value.proc_cost = 0;
                }
                

                if (parseFloat(value.proc_cost)>0) {
                    totalCost = parseFloat(totalCost + parseFloat(value.proc_cost));
                    value.proc_cost = parseFloat(value.proc_cost);
                }else{
                    // value.proc_cost = 0;
                } 
                return null;
            })
            set_app_total_proc_cost(parseFloat(totalCost).toFixed(2));
            
            if (parseFloat(totalCost-app_pay_amount)>-1) {
                set_app_pay_change(0);
                set_app_pay_balance(parseFloat(totalCost-app_pay_amount));
            }else{
                set_app_pay_balance(0);
                set_app_pay_change(parseFloat(app_pay_amount - totalCost));
            }
            set_app_proc_fields(values);

            set_app_end_time(
                new Date(
                    new Date(new Date(app_start_time).setMinutes(new Date(app_start_time).getMinutes()+totalMinutes))
                        ));
            
        } else {
            alert('please select start time first')
        }
    }

    let options2 = [{value: '', label: 'test'}];

    app_patient_list.map((patient)=>{
        options2 = [...options2, {value: patient.patient_id, label: patient.patient_name}]
        return null;
    });

    return ReactDOM.createPortal(
        <>
            <div className='details-details-container'>
                <div className='details-details-modal-container'>
                    <div className='details-details-modal-body-container'>
                        <div className='details-details-modal-body'>
                            <div className="details-details-modal-body-input-box">
                                <span>Patient</span>
                                {/* <select value={app_patient_id} onChange={(e)=>{set_app_patient_id(e.target.value)}}>
                                    {app_patient_list && app_patient_list.map((patient, index)=>{
                                        return (
                                            <option key={index} value={patient.patient_id}>{patient.patient_name}</option>
                                        );
                                    })}
                                    <option value="">-Select Patient-</option>
                                </select>        */}
                                <Select options={options2} defaultValue={app_patient_name_id} onChange={(value)=>{set_app_patient_id(value.value)}}/>
                            </div>
                            <div className="details-details-modal-body-input-box">
                                <span>Doctor</span>
                                <select value={app_user_doctor_id} onChange={(e)=>{set_app_user_doctor_id(e.target.value)}}>
                                    {app_user_doctor_list && app_user_doctor_list.map((user, index)=>{
                                        return (
                                            <option key={index} value={user.user_id}>{user.user_name}</option>
                                        );
                                    })}
                                    <option value="">-Select Doctor-</option>
                                </select>       
                                {/* <Select options={options} /> */}
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
                                    onChange={(dateStartTime) => {set_app_start_time((prev)=>{
                                        recalculateEndTime(dateStartTime);
                                        return dateStartTime;
                                    });}}
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
                            app_proc_fields.map((app_proc_field, index)=>{
                                return (
                                    
                                    <div style={{marginTop:'0'}} className='details-details-modal-body' key={index}>
                                        <div className="details-details-modal-body-input-box3">
                                            <span style={index? {display: 'none'}:{}}>Procedure</span>
                                            <select name="proc_name" value={app_proc_field.proc_name} disabled={app_id} onChange={(event)=>{handleChangeInput(index, event)}}>
                                                <option value="">-Select Procedure-</option>
                                                <option value="Consultation">Consultation</option>
                                                <option value="Extraction">Extraction</option>
                                                <option value="Cleaning">Cleaning</option>
                                            </select>       
                                        </div>
                                        <div className="details-details-modal-body-input-box3">
                                            <span style={index? {display: 'none'}:{}}>Duration Minutes</span>
                                                <select name="proc_duration_minutes" disabled={app_id} value={app_proc_field.proc_duration_minutes} onChange={(event)=>{handleChangeInput(index, event)}}>
                                                    <option value={0}>-Select Minutes-</option>
                                                    <option value={15}>15</option>
                                                    <option value={30}>30</option>
                                                    <option value={60}>60</option>
                                                </select>
                                        </div>
                                        <div className="details-details-modal-body-input-box3">
                                            <span style={index? {display: 'none'}:{}}>Cost</span>
                                            <div className='duration-minutes-container'>
                                                <input type='number' name="proc_cost" disabled={app_id} value={app_proc_field.proc_cost} onChange={(event)=>{handleChangeInput(index, event)}}/>
                                                <button className='add-remove-button' 
                                                // onClick={()=>{removeProcedureFieldFunction(index, app_proc_field.proc_duration_minutes, app_proc_field.proc_cost)}}
                                                onClick={async ()=>{
                                                    
                                                    await set_app_proc_fields( (prev)=>{  
                                                        let totalCost = 0;
                                                        let totalMinutes = 0;
                                                        const values = [...prev];
                                                        values.splice(index, 1);
                                                        values.map((value)=>{
                                                            if (value.proc_cost > -1) {
                                                               totalCost = totalCost+parseFloat(value.proc_cost); 
                                                            }
                                                            if (value.proc_duration_minutes> -1) {
                                                                totalMinutes = totalMinutes+parseInt(value.proc_duration_minutes);
                                                            }
                                                            return null;
                                                        });
                                                        set_app_end_time(
                                                            new Date(
                                                                new Date(new Date(app_start_time).setMinutes(new Date(app_start_time).getMinutes()+totalMinutes))
                                                                    )); 
                                                        set_app_total_proc_cost(totalCost);
                                                        if (app_pay_amount) {
                                                            if (parseFloat(totalCost-app_pay_amount)>0) {
                                                               set_app_pay_change(0);
                                                               set_app_pay_balance(parseFloat(totalCost-app_pay_amount))
                                                            }else{
                                                                set_app_pay_change(parseFloat(app_pay_amount-totalCost));
                                                                set_app_pay_balance(0)
                                                            }
                                                        }else{
                                                            set_app_pay_balance(totalCost);
                                                        }
                                                         
                                                        return values;
                                                    });
                                                }}
                                                >-</button>
                                            </div>                                    
                                        </div>
                                    </div>
                                );
                            })
                        }
                        
                        <div className='display-flex'>
                            <div className='details-details-modal-body-button-proc_name'>                                               
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
                                        onChange={(date) => set_app_end_time(date)}
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
                        {/* <div className='display-flex' style={{marginTop:'5px'}} >
                            <div className="details-details-modal-body-input-box">
                                <span>Balance</span>
                                <input style={app_pay_balance>0? {color: 'red', fontWeight: '600', fontSize:'14px'} : {}} disabled value={app_pay_balance} />
                            </div>
                            
                        </div> */}

                        {
                            app_pay_fields.map((payfield, index)=>{
                                return (
                                    <div key={index}
                                    // className='display-flex' 
                                    style={
                                        {}
                                        // true? {marginTop:'0px',flexWrap: 'wrap'} : {display: 'none'}
                                        }>
                                        <div className='display-flex' style={{marginTop:'0px'}} >
                                            <div className='details-details-modal-body-input-box'>
                                                <span style={false? {display: 'none'}:{}} >Payment</span>
                                                <div className='display-flex'>
                                                    
                                                    <input type='number' name='pay_amount' value={payfield.pay_amount}
                                                    onChange={(e)=>{
                                                        handleChangeInputPayment(index, e)
                                                        // let totalCost = 0;
                                                        // app_proc_fields.map((proc_field)=>{
                                                        //     if (parseFloat(proc_field.proc_cost)>0) {
                                                        //         totalCost = totalCost + proc_field.proc_cost
                                                        //     }
                                                        //     return null;
                                                        // })
                                                        // if (totalCost-e.target.value>-1 ) {
                                                        //     set_app_pay_change(0)
                                                        //     set_app_pay_balance(parseFloat(totalCost-e.target.value).toFixed(2));
                                                        // }else{
                                                        //     set_app_pay_balance(0);
                                                        //     set_app_pay_change(parseFloat(e.target.value-totalCost).toFixed(2));
                                                        // }
                                                        // set_app_pay_fields(parseFloat(e.target.value));
                                                    }} />
                                                    <button className='add-remove-button height-80p' onClick={()=>{removePaymentFieldFunction(index, payfield.pay_amount)}}>-</button>
                                                </div>
                                            </div>
                                                
                                                
                                            <div className='details-details-modal-body-input-box'>
                                                <span style={false? {display: 'none'}:{}}>Date of Payment</span>
                                                    
                                                <DatePicker 
                                                name='pay_date'
                                                maxDate={new Date()} 
                                                yearDropdownItemNumber={90}
                                                showTimeSelect
                                                showYearDropdown 
                                                scrollableYearDropdown={true} 
                                                dateFormat='MMMM d, yyyy h:mm aa' 
                                                className='date-picker' 
                                                placeholderText="Select Date" 
                                                selected={payfield.pay_date} 
                                                onChange={(date)=>{
                                                    handleChangeInputPayment(index, false, date, 'pay_date')
                                                    // set_app_pay_date(date)
                                                }} 
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className='display-flex' style={{marginTop:'0px'}} >
                                            <div className="details-details-modal-body-input-box">
                                                <span>Change</span>
                                                <input
                                                style={app_pay_change>0? {color: 'green', fontWeight: '600', fontSize:'14px'} : {}} 
                                                disabled value={payfield.pay_change} 
                                                />
                                            </div>
                                            <div className="details-details-modal-body-input-box">
                                                <span>Balance</span>
                                                <input 
                                                style={app_pay_balance>0? {color: 'red', fontWeight: '600', fontSize:'14px'} : {}} 
                                                disabled value={payfield.pay_balance} 
                                                />
                                            </div>
                                        </div>
                                            
                                    </div>
                                );
                            })
                        }
                                        
                        

                        <button className='add-payment-button height-80p' onClick={()=>{
                            addPaymentFieldFunction()
                            // set_showAddPayment(!showAddPayment)
                            }}>Add Payment
                                {/* {showAddPayment? 'Hide Add Payment' : 'Add Payment'} */}
                                </button>
                        {/* <p>app_proc_fields: {app_proc_fields}</p> */}
                    </div>                    
                    <div className='details-details-modal-body-button'>                    
                        {/* {userId? (<input type="submit" onClick={updateUser} value='Update' className='percent-40'/>):
                        (<input type="submit" onClick={addUser} value='Add' className='percent-40'/>)}   */}
                        <button className='button-w70' onClick={()=>{addAppointmentFunction()}}>{app_id? 'Update Appointment': 'Add Appointment'}</button>                               
                        <button className='button-w20' onClick={()=>{set_app_details_is_open(false); set_app_date(new Date())}}>Close</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('appointment-details')
        
    );
};

export default AppointmentDetails;
