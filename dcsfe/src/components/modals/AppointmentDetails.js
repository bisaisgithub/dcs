import React from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import Select from 'react-select';
import Exam from '../Exam/Exam';
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
    updateAppointmentFunction,
    set_app_proc_fields_delete, app_proc_fields_delete,
    app_pay_fields_delete, set_app_pay_fields_delete,
    is_exam_open, set_is_exam_open,
    tooth_check_box, set_tooth_check_box,
    tooth_select, set_tooth_select,
    tooth_remark, set_tooth_remark,
    is_baby_teeth, set_is_baby_teeth,
    saveExam,exam_id

    }) => {
    if (!app_details_is_open) {
        return null;
    }
    
    const handleChangeInputPayment = async (index, event, date, ename)=>{
        if (event) {
            const values = [...app_pay_fields];
            values[index][event.target.name] = event.target.value;

            await set_app_pay_fields(values);
            values.map(async (field, index)=>{
                let totalPayment = 0;
                for(let i = 0; i<= index; i++){
                    let pay_amount = 0;
                    if (app_pay_fields[i].pay_amount>0) {
                        pay_amount = app_pay_fields[i].pay_amount
                    }
                    totalPayment = totalPayment + parseFloat(pay_amount);
                }
                if (app_total_proc_cost-totalPayment>-1) {
                //    await set_app_pay_balance(parseFloat(app_total_proc_cost-totalPayment));
                //    await set_app_pay_change(0);
                    const values2 = [...app_pay_fields];
                    values[index]['pay_change'] = 0;
                    values[index]['pay_balance'] = parseFloat(app_total_proc_cost-totalPayment);
                    await set_app_pay_fields(values2);
                } else {
                    // await set_app_pay_balance(0);
                    // await set_app_pay_change(parseFloat(totalPayment-app_total_proc_cost));
                    const values2 = [...app_pay_fields];
                    values[index]['pay_change'] = parseFloat(totalPayment-app_total_proc_cost);
                    values[index]['pay_balance'] = 0;
                    await set_app_pay_fields(values2);
                }
            })

            
        }else{
            // var currentDateObj = date;
            // var numberOfMlSeconds = currentDateObj.getTime();
            // // var addMlSeconds = 60 * 60 * 1000;
            // var addMlSeconds = 480 * 60 * 1000
            // var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
            const values = [...app_pay_fields];
            values[index][ename] = date;
            // values[index][ename] = newDateObj;
            console.log('values: ', values);
            await set_app_pay_fields(values);
        }
    }

    const handleChangeInput =(index, event)=>{
        console.log('app_proc_fields: ',app_proc_fields)
        if (app_date) {
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

    let options2 = [{value: '', label: 'Select Patient'}];

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
                                <Select options={options2} defaultValue={app_patient_name_id.value? app_patient_name_id : ({value: '', label: 'Select Patient'}) } 
                                onChange={(value)=>{
                                    set_app_patient_id(value.value);
                                    }}/>
                            </div>
                            <div className="details-details-modal-body-input-box">
                                <span>Doctor</span>
                                <select value={app_user_doctor_id} onChange={(e)=>{
                                    set_app_user_doctor_id(e.target.value)
                                    }}>
                                    {app_user_doctor_list && app_user_doctor_list.map((user, index)=>{
                                        return (
                                            <option key={index} value={user.user_id}>{user.user_name}</option>
                                        );
                                    })}
                                    <option value="">-Select Doctor-</option>
                                </select>
                            </div>
                                <div style={{display: 'flex', width: '100%'}}>
                                    <div className='details-details-modal-body-input-box'>
                                    <span>Date</span>
                                    <DatePicker 
                                    showTimeSelect
                                    minDate={new Date()} 
                                    // minTime={setHours(setMinutes(new Date(), 0), 0)}
                                    yearDropdownItemNumber={90} 
                                    showYearDropdown 
                                    scrollableYearDropdown={true} 
                                    dateFormat='MMMM d, yyyy' 
                                    className='date-picker' 
                                    placeholderText="Select Date" 
                                    selected={app_date} 
                                    onChange={(date)=>{
                                        set_app_date(()=>{
                                            let totalMinutes = 0;
                                                app_proc_fields.map((app_proc_field)=>{
                                                    totalMinutes = totalMinutes + parseInt(app_proc_field.proc_duration_minutes);
                                                    return null;
                                                });
                                                set_app_start_time(
                                                    new Date(
                                                        new Date(new Date(date).setMinutes(new Date(date).getMinutes()))
                                                            ));
                                                set_app_end_time(
                                                    new Date(
                                                        new Date(new Date(date).setMinutes(new Date(date).getMinutes()+totalMinutes))
                                                            ));
                                                return date;
                                        });
                                        }} />
                                    
                                </div>
                                <div className='details-details-modal-body-input-box'>
                                    <span>Start Time</span>
                                    <DatePicker
                                        disabled
                                        selected={app_start_time}
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
                                {app_id && 
                                    <button className='add-remove-button-exam' onClick={()=>{set_is_exam_open(!is_exam_open)}}>{is_exam_open? 'Hide Exam':'Show Exam'}</button>
                                }
                            </div>
                            
                        </div>

                        <Exam 
                            is_exam_open={is_exam_open} set_is_exam_open={set_is_exam_open}
                            tooth_check_box={tooth_check_box} set_tooth_check_box={set_tooth_check_box}
                            tooth_select={tooth_select} set_tooth_select={set_tooth_select}
                            tooth_remark={tooth_remark} set_tooth_remark={set_tooth_remark}
                            is_baby_teeth={is_baby_teeth} set_is_baby_teeth={set_is_baby_teeth}
                            saveExam={saveExam} exam_id={exam_id}
                            // style={is_exam_open?  {} :{display: 'none'} } 
                                />

                        <div 
                            style={is_exam_open? {display: 'none'} : {}}
                            >
                            {
                                app_proc_fields.map((app_proc_field, index)=>{
                                    return (
                                        
                                        <div style={{marginTop:'0'}} className='details-details-modal-body' key={index}>
                                            <div className="details-details-modal-body-input-box3">
                                                <span style={index? {display: 'none'}:{}}>Procedure</span>
                                                <select name="proc_name" value={app_proc_field.proc_name} onChange={(event)=>{handleChangeInput(index, event)}}>
                                                    <option value="">-Select Procedure-</option>
                                                    <option value="Consultation">Consultation</option>
                                                    <option value="Extraction">Extraction</option>
                                                    <option value="Cleaning">Cleaning</option>
                                                </select>       
                                            </div>
                                            <div className="details-details-modal-body-input-box3">
                                                <span style={index? {display: 'none'}:{}}>Duration Minutes</span>
                                                    <select name="proc_duration_minutes" value={app_proc_field.proc_duration_minutes} onChange={(event)=>{handleChangeInput(index, event)}}>
                                                        <option value={0}>-Select Minutes-</option>
                                                        <option value={15}>15</option>
                                                        <option value={30}>30</option>
                                                        <option value={60}>60</option>
                                                    </select>
                                            </div>
                                            <div className="details-details-modal-body-input-box3">
                                                <span style={index? {display: 'none'}:{}}>Cost</span>
                                                <div className='duration-minutes-container'>
                                                    <input type='number' name="proc_cost" value={app_proc_field.proc_cost} onChange={(event)=>{handleChangeInput(index, event)}}/>
                                                    <button className='add-remove-button' 
                                                    // onClick={()=>{removeProcedureFieldFunction(index, app_proc_field.proc_duration_minutes, app_proc_field.proc_cost)}}
                                                    onClick={async ()=>{
                                                        
                                                        if (app_proc_field.proc_id) {   
                                                            if (window.confirm('Delete this procedure in the database?')) {
                                                                await set_app_proc_fields_delete((prev)=>{
                                                                    const newValue = [...prev, app_proc_field.proc_id]
                                                                    return newValue;
                                                                });
                                                            }else return false;
                                                            
                                                        }
                                                        console.log('app_proc_field: ', app_proc_field)
                                                        
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
                                    <button className='add-remove-button height-80p' onClick={()=>{
                                        set_app_proc_fields((prev)=>{return [...prev, {proc_name: '', proc_duration_minutes: 0, proc_cost: 0, proc_id: null, is_deleted: 0}]})
                                        }}>+</button>
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

                            {
                                app_pay_fields.map((payfield, index)=>{
                                    return (
                                        <div key={index}>
                                            <div className='display-flex' style={{marginTop:'0px'}} >
                                                <div className='details-details-modal-body-input-box'>
                                                    <span style={false? {display: 'none'}:{}} >Payment</span>
                                                    <div className='display-flex'>
                                                        
                                                        <input type='number' name='pay_amount' value={payfield.pay_amount}
                                                        onChange={(e)=>{
                                                            handleChangeInputPayment(index, e)
                                                        }} />
                                                        <button className='add-remove-button height-80p' onClick={()=>{
                                                            if (payfield.pay_id) {
                                                                if (window.confirm('Delete this payment in the database?')) {
                                                                    set_app_pay_fields_delete((prev)=>{
                                                                        const newValue = [...prev, payfield.pay_id];
                                                                        return newValue;
                                                                    })
                                                                }else return false;
                                                            }
                                                            const values = [...app_pay_fields];
                                                            values.splice(index, 1);
                                                            set_app_pay_fields(values);
                                                            if (parseFloat(payfield.pay_amount)>0) {
                                                                set_app_pay_balance(parseFloat(app_pay_balance + parseFloat(payfield.pay_amount))); 
                                                            }else{
                                                                console.log(' else proc_cost:', payfield.pay_amount)
                                                            }
                                                            }}>-</button>
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
                                                    style={payfield.pay_change>0? {color: 'green', fontWeight: '600', fontSize:'14px'} : {}} 
                                                    disabled value={payfield.pay_change} 
                                                    />
                                                </div>
                                                <div className="details-details-modal-body-input-box">
                                                    <span>Balance</span>
                                                    <input 
                                                    style={payfield.pay_balance>0? {color: 'red', fontWeight: '600', fontSize:'14px'} : {}} 
                                                    disabled value={payfield.pay_balance} 
                                                    />
                                                </div>
                                            </div>
                                                
                                        </div>
                                    );
                                })
                            }
                                            
                            

                            <button className='add-payment-button height-80p' onClick={()=>{
                                // addPaymentFieldFunction()
                                set_app_pay_fields([...app_pay_fields, {pay_amount: '', pay_date: new Date(), pay_change: '', pay_balance: '', pay_id: null, is_deleted: 0}])
                                }}>Add Payment
                                {/* {showAddPayment? 'Hide Add Payment' : 'Add Payment'} */}
                            </button>
                            {/* <p>app_proc_fields: {app_proc_fields}</p> */}
                        </div>

                    </div>
                        

                    <div className='details-details-modal-body-button'>                    
                        {/* {userId? (<input type="submit" onClick={updateUser} value='Update' className='percent-40'/>):
                        (<input type="submit" onClick={addUser} value='Add' className='percent-40'/>)}   */}
                        
                        <button className='button-w70' 
                            // disabled={is_exam_open} 
                            onClick={()=>{
                                if (!is_exam_open) {
                                    app_id? 
                                    updateAppointmentFunction()
                                    : 
                                    addAppointmentFunction() 
                                } else {
                                    alert('Hide exam first');
                                }
                            
                            }}>{app_id? 'Upd Appointment': 'Add Appointment'}</button>     

                        <button className='button-w20' 
                            // disabled={is_exam_open} 
                            onClick={()=>{
                                if (!is_exam_open) {
                                    set_app_details_is_open(false); set_app_date(new Date());
                                } else {
                                    alert('Hide exam first');
                                }
                            }}
                        >Close</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('appointment-details')
        
    );
};

export default AppointmentDetails;
