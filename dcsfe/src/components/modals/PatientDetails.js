import React from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientDetails = ({
    isOpen, setIsOpen, addPatient, updatePatient,patient_id,
    patient_status,set_patient_status,patient_gender,set_patient_gender,
    patient_name,set_patient_name,patient_mobile,set_patient_mobile,patient_allergen,
    set_patient_allergen,patient_dob,set_patient_dob,patientAge
    }) => {

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <>
            <div className='details-details-container'>
                <div className='details-details-modal-container'>
                    <div className='details-details-modal-title'>{patient_id? `${patient_name} Details --  Age: ${patientAge}`: 'Patient Details'}</div>
                    <div className='details-details-modal-body'>
                        <div className='details-details-modal-body-input-box'>
                            <span>Date of Birth</span>
                            <DatePicker maxDate={new Date()} yearDropdownItemNumber={90} showYearDropdown scrollableYearDropdown={true} dateFormat='yyyy/MM/dd' className='date-picker' placeholderText="Click to select    " selected={patient_dob} onChange={date=>set_patient_dob(date)} />
                        </div>
                        <div className='details-details-modal-body-input-box'>
                            <span>Full Name</span>
                            <input type="text" placeholder="Enter name" value={patient_name} required onChange={e=>set_patient_name(e.target.value)} />
                        </div>
                        <div className="details-details-modal-body-input-box">
                            <span>Mobile</span>
                            <input type="text" placeholder="Enter mobile" value={patient_mobile} required onChange={e=>set_patient_mobile(e.target.value)}/>
                        </div>                       
                        <div className="details-details-modal-body-input-box">
                            <span>Allergen</span>
                            <input type="text" placeholder="Enter allergens" value={patient_allergen} required onChange={e=>set_patient_allergen(e.target.value)}/>
                        </div>
                        <div className="details-details-modal-body-status-gender">
                            <div className="details-details-modal-body-input-box">
                                <span>Status</span>
                                <select value={patient_status} onChange={(e)=>{set_patient_status(e.target.value)}}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="Deleted">Deleted</option>
                                    <option value="">-Select Status-</option>
                                </select>
                            </div>
                            <div className='details-details-modal-body-gender'>
                                <span>Gender</span>
                                <div className='details-details-modal-body-input-box-gender'>
                                    <div>
                                        <input type="radio" name="gender" checked={patient_gender==="Male"? true: false} id="dot-1" value="Male" onChange={e=>set_patient_gender(e.target.value)}/>
                                        <span className='details-details-modal-body-input-box-gender-span-male'>Male</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" checked={patient_gender==="Female"? true: false} id="dot-2" value="Female" onChange={e=>set_patient_gender(e.target.value)}/>
                                        <span>Female</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    <div className='details-details-modal-body-button'>                    
                        <button onClick={patient_id? updatePatient : addPatient}>{patient_id? 'Update' : 'Add'}</button>                               
                        <button onClick={()=>{setIsOpen(false); set_patient_dob(new Date())}}>Close</button>
                    </div>
                    
                </div>
            </div>
        </>,
        document.getElementById('patient-details')
        
    )
}

export default PatientDetails
