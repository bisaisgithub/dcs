import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AppointmentDetails from './modals/AppointmentDetails.js';
// import AppointmentDetailsUpdate from './modals/AppointmentDetailsUpdate';
import './Table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import setHours from 'date-fns/setHours';
// import setMinutes from 'date-fns/setMinutes';
// import Select from 'react-select';

const AppointmentTable = () => {
    const [app_date, set_app_date] = useState(null);
    const [app_details_is_open, set_app_details_is_open] = useState(false);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [app_patient_name_id, set_app_patient_name_id] = useState({value: null, label: null});
    const [app_patient_list, set_app_patient_list] = useState([]);
    const [app_user_doctor_list, set_app_user_doctor_list] = useState([]);
    const [app_patient_id, set_app_patient_id] =useState('');
    const [app_user_doctor_id, set_app_user_doctor_id] =useState('');
    const [app_search_patient_name, set_app_search_patient_name] = useState('');
    const [app_search_user_doctor_name, set_app_search_user_doctor_name] = useState('');
    const [app_search_date, set_app_search_date] = useState('');
    const [app_proc_name, set_app_proc_name] = useState('');
    const [app_proc_duration_minutes, set_app_proc_duration_minutes] = useState('');
    const [app_proc_fields, set_app_proc_fields] = useState(()=>{return [{
        proc_name: '', proc_duration_minutes: 0, proc_cost: 0, proc_id: null, is_deleted: 0},
        ]});
    const [app_proc_fields_delete, set_app_proc_fields_delete] = useState([]);
    const [app_start_time, set_app_start_time] = useState(null);
    const [app_end_time, set_app_end_time] = useState(null);
    const [app_status, set_app_status] = useState('');
    const [app_total_proc_duration_minutes, set_app_total_proc_duration_minutes] = useState(0);
    const [app_type, set_app_type] = useState('');
    const [app_total_proc_cost, set_app_total_proc_cost] = useState(0);
    const [app_pay_amount, set_app_pay_amount] = useState('');
    const [app_pay_balance, set_app_pay_balance] = useState('');
    const [app_pay_change, set_app_pay_change] = useState('');
    const [app_pay_date, set_app_pay_date] = useState(new Date());
    const [app_pay_fields, set_app_pay_fields] = useState([]);
    const [app_pay_fields_delete, set_app_pay_fields_delete] = useState([]);
    const [showAddPayment, set_showAddPayment] =useState(false);
    const [app_id, set_app_id] = useState(null);
    const [render, set_render] = useState(0);
    const [is_exam_open, set_is_exam_open] = useState(false);
    const [tooth_check_box, set_tooth_check_box] = useState({
        t18: false, t17: false, t16: false, t15: false, t14: false, t13: false, t12: false, t11: false,
        t28: false, t27: false, t26: false, t25: false, t24: false, t23: false, t22: false, t21: false,
        t38: false, t37: false, t36: false, t35: false, t34: false, t33: false, t32: false, t31: false,
        t48: false, t47: false, t46: false, t45: false, t44: false, t43: false, t42: false, t41: false,
    });
    const [tooth_select, set_tooth_select] = useState(['M','F','MO']);
    const [tooth_remark, set_tooth_remark] = useState({
        t18: '', t17: '', t16: '', t15: '', t14: '', t13: '', t12: '', t11: '',
        t28: '', t27: '', t26: '', t25: '', t24: '', t23: '', t22: '', t21: '',
        t38: '', t37: '', t36: '', t35: '', t34: '', t33: '', t32: '', t31: '',
        t48: '', t47: '', t46: '', t45: '', t44: '', t43: '', t42: '', t41: '',

    });

    useEffect(()=>{
        
        getAppointments();

    }, [render]);

    const addAppointmentFunction = async ()=>{
        function validateEmptyObjectProcField(array){
            for (var i=0; i < array.length; i++) {
                if (array[i].proc_name === "") {
                    return false;
                }
            }
            return true;
        }
        function validateEmptyObjectPayfield(array){
            for (var i=0; i < array.length; i++) {
                if (array[i].pay_amount === "") {
                    return false;
                }
            }
            return true;
        }
        if (!app_patient_id || !app_user_doctor_id || !app_date ||
            // !app_start_time || 
            !app_status || !app_type) {
            alert('Empty field/s')
        }else{

            if (!validateEmptyObjectProcField(app_proc_fields) || !app_proc_fields.length || !validateEmptyObjectPayfield(app_pay_fields)) {

                alert("Empty Procedure/s or Payment/s")
            } else {
                const response = await axios.post(`${process.env.REACT_APP_BE_LINK}appointment`, {
                    app_patient_id: app_patient_id,
                    app_user_doctor_id: app_user_doctor_id,
                    app_date: formatDateYYYYMMDD(app_date),
                    app_start_time: app_start_time,
                    app_end_time: app_end_time,
                    app_status: app_status,
                    app_type: app_type,
                    app_proc_fields: app_proc_fields,
                    app_pay_fields: app_pay_fields
                 });   
                
                console.log('app_date: ', app_date);
                console.log('pay_date: ', app_pay_fields);

                if (response.data.appointmentInsertOk) { 
                    alert('Appointment Added');
                    await set_render(prev=>prev+1);
                    console.log(render);
                    set_app_details_is_open(false);
                }else{
                    alert('Failed Adding Appointment');
                }
            }
        }  
    }

    const updateAppointmentFunction = async ()=>{
        function validateEmptyObjectField(array){
            for (var i=0; i < array.length; i++) {
                if (array[i].proc_name === "") {
                    return false;
                }
            }
            return true;
        }
        function validateEmptyObjectPayfield(array){
            for (var i=0; i < array.length; i++) {
                if (array[i].pay_amount === "") {
                    return false;
                }
            }
            return true;
        }
        if (
            !app_patient_id || !app_user_doctor_id || !app_date ||
            // !app_start_time || 
            !app_status || !app_type
            ) {
            alert('Empty field/s')
        }else{

            if (!validateEmptyObjectField(app_proc_fields) || !app_proc_fields.length || !validateEmptyObjectPayfield(app_pay_fields)) {
                alert("Empty Procedure/s or Payment/s")
            } else {
                let updateAppointmentData = {
                    app_patient_id: app_patient_id,
                    app_user_doctor_id: app_user_doctor_id,
                    app_date: app_date,
                    // app_date: formatDateYYYYMMDD(app_date),
                    app_start_time: app_start_time,
                    app_end_time: app_end_time,
                    app_status: app_status,
                    app_type: app_type,
                    app_proc_fields: app_proc_fields,
                    app_pay_fields: app_pay_fields,
                    app_proc_fields_delete: app_proc_fields_delete,
                    app_pay_fields_delete: app_pay_fields_delete
                }
                console.log('updateAppointmentData:  ', updateAppointmentData);
                const response = await axios.put(`${process.env.REACT_APP_BE_LINK}appointment/${app_id}`, updateAppointmentData);   

                if (response.data.appointmentUpdateOk) { 
                    alert('Succesfully Updating Appoinment');
                    await set_render(prev=>prev+1);
                    console.log(render);
                    set_app_details_is_open(false);
                }else{
                    alert('Failed Updating Appointment');
                }
            }
        }  
    }
    
    const getAppointments = async (data)=>{
        if (data) {
            const response = await axios.post(`${process.env.REACT_APP_BE_LINK}appointments`, data);
            if (response.data) {
                setAppointmentsData(response.data)
            }
        } else {
            const response = await axios.get(`${process.env.REACT_APP_BE_LINK}appointments`);
            if (response.data) {
                setAppointmentsData(response.data)
            }
        }    
    };

    const getPatientList = async (id)=>{
        const resPatientList = await axios.get(`${process.env.REACT_APP_BE_LINK}patient-list`);
        if (!resPatientList.data) {
            alert('Failed getting patient list')
        }else{
            set_app_patient_list(resPatientList.data);
        }
        
    }

    const getUserDoctorList = async ()=>{
        const resUserDoctorList = await axios.get(`${process.env.REACT_APP_BE_LINK}user-doctor-list`);
        if (!resUserDoctorList.data) {
            alert('Failed getting patient list')
        } 
        set_app_user_doctor_list(resUserDoctorList.data);
    }

    const newAppointment = ()=>{
        console.log('app_patient_name_id: ', app_patient_name_id);
        set_app_proc_fields_delete([]);
        set_app_pay_fields_delete([]);
        set_app_id(null);
        getUserDoctorList();
        getPatientList();
        set_app_patient_name_id({value: null, label: null});
        set_app_user_doctor_id('');
        set_app_date(null);
        set_app_start_time(null);
        set_app_end_time(null);
        set_app_proc_fields([{
            proc_name: '', proc_duration_minutes: 0, proc_cost: 0,
            proc_id: null, isDeleted: false
            },
        ]);
        set_app_total_proc_cost(0);
        set_app_status('');
        set_app_type('');
        set_app_pay_fields([]);
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

    const formatDateYYYYMMDD = (dt)=>{
        let year  = dt.getFullYear();
        let month = (dt.getMonth() + 1).toString().padStart(2, "0");
        let day   = dt.getDate().toString().padStart(2, "0");
        // console.log(year + '-' + month + '-' + day);
        return year + '-' + month + '-' + day;
    }

    var timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }

    const AppointmentDetailsFunction = async (app_id, patient_name)=>{
        set_app_pay_fields_delete([]);
        set_app_proc_fields_delete([]);
        set_app_proc_fields([]);
        set_app_pay_fields([]);
        set_app_id(app_id);
        set_app_patient_name_id({value: app_id, label: patient_name});
        const resAppointment = await axios.get(`${process.env.REACT_APP_BE_LINK}appointment/${app_id}`);
        console.log('resAppointment: ', resAppointment);
        console.log('data length: ', resAppointment.data.length);
        if (resAppointment.data.app_patient_id) {
            getPatientList(resAppointment.data.app_patient_id);
            set_app_details_is_open(true);
            set_app_patient_id(resAppointment.data.app_patient_id);
            set_app_user_doctor_id(resAppointment.data.app_user_doctor_id);
            set_app_date(new Date(new Date(resAppointment.data.app_date).toString()+' UTC'));
            set_app_start_time(new Date(new Date(resAppointment.data.app_start_time).toString()+' UTC'));
            set_app_status(resAppointment.data.app_status);
            set_app_type(resAppointment.data.app_type);
            set_app_proc_fields(resAppointment.data.resProceduresById);
            set_app_pay_fields(()=>{
                let field2 = [];
                resAppointment.data.resPaymentsById.map((field)=>{
                   field2 = [...field2, {
                    is_deleted: field.is_deleted,
                    pay_amount: field.pay_amount,
                    pay_appointment_id: field.pay_appointment_id,
                    pay_balance: field.pay_balance,
                    pay_change: field.pay_change,
                    pay_id: field.pay_id,
                    pay_date: new Date(new Date(field.pay_date).toString()+' UTC')
                   }];
                    return null;
                });
                return field2;
            });

            let totalMinutes = 0;
            let totalCost = 0;
            resAppointment.data.resProceduresById.map((app_proc_field)=>{
                
                if (app_proc_field.proc_duration_minutes > 0) {
                    totalMinutes = totalMinutes + app_proc_field.proc_duration_minutes
                }
                if (app_proc_field.proc_cost > 0) {
                    totalCost = totalCost + app_proc_field.proc_cost
                }
                return null;
            });

            set_app_end_time(
                new Date(
                    new Date(new Date(new Date(resAppointment.data.app_start_time).toString()+' UTC').setMinutes(new Date(new Date(resAppointment.data.app_start_time).toString()+' UTC').getMinutes()+totalMinutes))
                        ));
            set_app_total_proc_cost(totalCost);

            getUserDoctorList();
            
        } else {
            alert('patient ID not Found');
        }
    }

    return (
        <div className='table-table2-container'>
            <AppointmentDetails
            app_details_is_open={app_details_is_open} set_app_details_is_open={set_app_details_is_open} 
            addAppointmentFunction={addAppointmentFunction}
            app_date={app_date} set_app_date={set_app_date}
            app_patient_list={app_patient_list} 
            app_patient_id={app_patient_id} set_app_patient_id={set_app_patient_id}
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
            app_pay_amount={app_pay_amount} set_app_pay_amount={set_app_pay_amount}
            app_pay_balance={app_pay_balance} set_app_pay_balance={set_app_pay_balance}
            app_pay_change={app_pay_change} set_app_pay_change={set_app_pay_change}
            app_user_doctor_list={app_user_doctor_list}
            app_pay_date={app_pay_date} set_app_pay_date={set_app_pay_date}
            showAddPayment={showAddPayment} set_showAddPayment={set_showAddPayment}
            app_patient_name_id={app_patient_name_id}
            app_id={app_id}
            app_pay_fields={app_pay_fields} set_app_pay_fields={set_app_pay_fields}
            updateAppointmentFunction={updateAppointmentFunction}
            set_app_proc_fields_delete={set_app_proc_fields_delete} app_proc_fields_delete={app_proc_fields_delete}
            set_app_pay_fields_delete={set_app_pay_fields_delete} app_pay_fields_delete={app_pay_fields_delete}
            is_exam_open={is_exam_open} set_is_exam_open={set_is_exam_open}
            tooth_check_box={tooth_check_box} set_tooth_check_box={set_tooth_check_box}
            tooth_select={tooth_select} set_tooth_select={set_tooth_select}
            tooth_remark={tooth_remark} set_tooth_remark={set_tooth_remark}

            ></AppointmentDetails>
            
            <table className='table-table2-table'>
                <thead className='table-table2-table-thead-search2'>
                    <tr className='table-table2-table-thead-tr-search2'>
                      
                        <th><input placeholder='Name' value={app_search_patient_name} onChange={(e)=>{set_app_search_patient_name(e.target.value)}}/></th>
                        <th><input placeholder='Doctor' value={app_search_user_doctor_name} 
                                onChange={(e)=>{set_app_search_user_doctor_name(e.target.value)}}/>
                            <button onClick={()=>{
                                set_app_search_patient_name('');set_app_search_user_doctor_name('')
                                set_app_search_date('');
                                }}>X</button>
                        </th>
                        
                        <th>
                            {/* <input placeholder='Date' value={app_search_type} onChange={(e)=>{set_app_search_type(e.target.value)}}/> */}
                            <DatePicker 
                                // minDate={new Date()} 
                                yearDropdownItemNumber={90} 
                                showYearDropdown 
                                scrollableYearDropdown={true} 
                                // dateFormat='MMMM d, yyyy' 
                                // dateFormat="dd-MMM-yyyy"
                                dateFormat="dd-MMM-yy"
                                // className='date-picker' 
                                placeholderText="Date" 
                                selected={app_search_date} 
                                onChange={date=>set_app_search_date(date)} />
                        </th>
                        <th><p onClick={()=>{getAppointments({
                            app_search_patient_name, 
                            app_search_user_doctor_name, 
                            app_search_date
                            : app_search_date === ''? '' : formatDateYYYYMMDD(app_search_date)
                            ,
                            })}}>Find</p></th>
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
                                <td className='maxW50px'>{formatDate(appointment.app_date)}</td>
                                <td className='table-table2-table-body-tr-td '>
                                    <button className='minW50px' style={{background:'#3c3f44'}} onClick={()=>{}}>{
                                    new Date(new Date(appointment.app_start_time).toString()+' UTC').toLocaleString('en-PH', timeOptions)
                                    }</button>
                                </td>
                                <td className='table-table2-table-body-tr-td'>
                                    <button className='minW50px' onClick={()=>{}}>{
                                        new Date(new Date(appointment.app_end_time).toString()+ ' UTC').toLocaleString('en-PH', timeOptions)
                                    }</button>
                                </td>
                                <td><button style={{background:'#e9115bf0'}} onClick={()=>{AppointmentDetailsFunction(appointment.app_id, appointment.patient_name)}}>{index+1}</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default AppointmentTable;
