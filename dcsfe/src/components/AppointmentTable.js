import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AppointmentDetails from './modals/AppointmentDetails.js';
import './Table.css';


const AppointmentTable = () => {
    const [app_date, set_app_date] = useState(null);
    const [app_details_is_open, set_app_details_is_open] = useState(false);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [app_patient_list, set_app_patient_list] = useState([]);
    const [app_user_doctor_list, set_app_user_doctor_list] = useState([]);
    const [app_patient_name, set_app_patient_name] =useState('');
    const [app_patient_id, set_app_patient_id] =useState('');
    const [app_user_doctor_name, set_app_user_doctor_name] =useState('');
    const [app_user_doctor_id, set_app_user_doctor_id] =useState('');
    const [app_search_patient_name, set_app_search_patient_name] = useState('');
    const [app_search_type, set_app_search_type] = useState('');
    const [app_proc_name, set_app_proc_name] = useState('');
    const [app_proc_duration_minutes, set_app_proc_duration_minutes] = useState('');
    const [app_proc_fields, set_app_proc_fields] = useState(()=>{return [{
        proc_name: '', proc_duration_minutes: '', proc_cost: ''},
        ]});
    const [app_start_time, set_app_start_time] = useState(null);
    const [app_end_time, set_app_end_time] = useState(null);
    const [app_status, set_app_status] = useState('');
    const [app_total_proc_duration_minutes, set_app_total_proc_duration_minutes] = useState(0);
    const [app_type, set_app_type] = useState('Scheduled');
    const [app_total_proc_cost, set_app_total_proc_cost] = useState(0);
    const [app_pay_fields, set_app_pay_fields] = useState([]);
    const [app_pay_balance, set_app_pay_balance] = useState('');
    const [app_pay_change, set_app_pay_change] = useState('');
    const [app_pay_date, set_app_pay_date] = useState('');
    useEffect(()=>{
        
        getAppointments();

    }, []);

    const addAppointmentFunction = async ()=>{

        function validateEmptyObjectField(array){
            for (var i=0; i < array.length; i++) {
                if (array[i].procedure === "") {
                    return false;
                }
            }
            return true;
        }

        if (!app_patient_id || !app_user_doctor_id || !app_date ||
            !app_start_time || !app_status || !app_type) {
                
            alert('Empty field/s')
        }else{

            if (!validateEmptyObjectField(app_proc_fields) || !app_proc_fields.length) {
                alert("Empty Procedure/s")
            } else {
                const response = await axios.post("http://172.16.0.101:3001/appointment", {
                    app_patient_id: app_patient_id,
                    app_user_doctor_id: app_user_doctor_id,
                    app_date: app_date,
                    app_start_time: app_start_time,
                    app_end_time: app_end_time,
                    app_status: app_status,
                    app_type: app_type,
                    app_proc_fields: app_proc_fields,
                    app_pay_fields: app_pay_fields,
                 });   

                if (response.data.appointmentInsertOk) { 
                    alert('Appointment Added');
                }else{
                    alert('Failed Adding Appointment');
                }
            }
        }  
    }
    
    const getAppointments = async (data)=>{
        console.log('getappointment called');
        if (data) {
            const response = await axios.post(`http://172.16.0.101:3001/users`, data);
            if (response.data) {
                console.log('response data',response.data)
            }
        } else {
            const response = await axios.get(`http://172.16.0.101:3001/appointments`);
            if (response.data) {
                console.log('response data',response.data);
                setAppointmentsData(response.data)
            }
        }    
    };

    const getPatientList = async ()=>{
        const resPatientList = await axios.get(`http://172.16.0.101:3001/patient-list`);
        if (!resPatientList.data) {
            alert('Failed getting patient list')
        } 
        set_app_patient_list(resPatientList.data);
    }

    const getUserDoctorList = async ()=>{
        const resUserDoctorList = await axios.get(`http://172.16.0.101:3001/user-doctor-list`);
        if (!resUserDoctorList.data) {
            alert('Failed getting patient list')
        } 
        set_app_user_doctor_list(resUserDoctorList.data);
    }

    const newAppointment = ()=>{
        getUserDoctorList();
        getPatientList();
        set_app_details_is_open(true); 
    };
    
    const formatDate = (app_date)=>{
        let d = new Date(app_date);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        // console.log(`${da}-${mo}-${ye}`);
        return `${da}-${mo}-${ye}`
    }

    var timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }

    return (
        <div className='table-table2-container'>
            <AppointmentDetails
            app_details_is_open={app_details_is_open} set_app_details_is_open={set_app_details_is_open} 
            addAppointmentFunction={addAppointmentFunction}
            app_patient_name={app_patient_name} set_app_patient_name={set_app_patient_name}
            app_date={app_date} set_app_date={set_app_date}
            app_patient_list={app_patient_list} 
            app_patient_id={app_patient_id} set_app_patient_id={set_app_patient_id}
            app_user_doctor_name={app_user_doctor_name} set_app_user_doctor_name={set_app_user_doctor_name}
            app_user_doctor_id={app_user_doctor_id} set_app_user_doctor_id={set_app_user_doctor_id}
            app_start_time={app_start_time} set_app_start_time={set_app_start_time} 
            app_proc_name={app_proc_name} set_app_proc_name={set_app_proc_name}
            app_proc_duration_minutes={app_proc_duration_minutes} set_app_proc_duration_minutes={set_app_proc_duration_minutes}
            app_proc_fields={app_proc_fields} set_app_proc_fields={set_app_proc_fields}
            app_end_time={app_end_time} set_app_end_time={set_app_end_time} 
            app_status={app_status} set_app_status={set_app_status}
            app_total_proc_duration_minutes={app_total_proc_duration_minutes} set_app_total_proc_duration_minutes={set_app_total_proc_duration_minutes}
            app_type={app_type} set_app_type={set_app_type}
            app_total_proc_cost={app_total_proc_cost} set_app_total_proc_cost={set_app_total_proc_cost}
            app_pay_fields={app_pay_fields} set_app_pay_fields={set_app_pay_fields}
            app_pay_balance={app_pay_balance} set_app_pay_balance={set_app_pay_balance}
            app_pay_change={app_pay_change} set_app_pay_change={set_app_pay_change}
            app_user_doctor_list={app_user_doctor_list}
            app_pay_date={app_pay_date} set_app_pay_date={set_app_pay_date}

            ></AppointmentDetails>
            
            <div className='table-table2-table'>
                <thead className='table-table2-table-thead-search2'>
                    <tr className='table-table2-table-thead-tr-search2'>
                      
                        <th><input placeholder='Name' value={app_search_type} onChange={(e)=>{set_app_search_type(e.target.value)}}/></th>
                        <th><input placeholder='Doctor' value={app_search_patient_name} onChange={(e)=>{set_app_search_patient_name(e.target.value)}}/><button onClick={()=>{set_app_search_patient_name('');set_app_search_type('')}}>X</button></th>
                        
                        <th><input placeholder='Date' value={app_search_type} onChange={(e)=>{set_app_search_type(e.target.value)}}/></th>
                        <th><p onClick={()=>{
                            }}>Find</p></th>
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
                    
                    {appointmentsData && appointmentsData.map((appointment, index)=>{
                        
                        return (
                            <tr key={index} className='table-table2-table-tbody-tr'>
                               
                                <td>{appointment.patient_name}</td>
                                <td>{appointment.user_name}</td>
                                {/* <td>
                                    <button  id={user.status_=== 'Scheduled'? 'bg-green':'bg-black'}>{user.type}</button>
                                </td> */}
                                <td className='maxW50px'>{formatDate(appointment.app_date)}</td>
                                <td className='table-table2-table-body-tr-td '>
                                    <button className='minW50px' style={{background:'green'}} onClick={()=>{}}>{
                                    // new Date(appointment.app_start_time).toTimeString().split(' ')[0].slice(0, new Date(appointment.app_start_time).toTimeString().split(' ')[0].length - 3)
                                    new Date(appointment.app_start_time).toLocaleString('en-US', timeOptions)
                                    }</button>
                                </td>
                                <td className='table-table2-table-body-tr-td'>
                                    <button className='minW50px' onClick={()=>{}}>{
                                        new Date(appointment.app_end_time).toLocaleString('en-US', timeOptions)
                                    // new Date(appointment.app_end_time).toTimeString().split(' ')[0].slice(0, new Date(appointment.app_end_time).toTimeString().split(' ')[0].length - 3)
                                    }</button>
                         
                                </td>
                                <td><button onClick={()=>{}}>{index+1}</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </div>

        </div>
    )
}

export default AppointmentTable;
