import React from 'react';
import ReactDOM from 'react-dom';
import './PatientDetails.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientDetails = ({
    isOpen, setIsOpen, addPatient, updatePatient,patientId,
    status_Input,setStatus_Input,genderInput,setGenderInput,
    nameInput,setNameInput,mobileInput,setMobileInput,allergenInput,
    setAllergenInput,selectedDateInput,setSelectedDateInput,
    }) => {
    if (!isOpen) {
        return null;
    }
    // const [selectedDateInput, setSelectedDateInput] = useState(new Date());
    // const [isOpen, setIsOpen] = useState(false);
    // const [patientsData, setPatientsData] = useState([]);
    // const [nameInput, setNameInput] = useState('');
    // const [mobileInput, setMobileInput] = useState('');
    // const [genderInput, setGenderInput] = useState('');
    // const [allergenInput, setAllergenInput] = useState('');
    // const [patientId, setPatientId] = useState("");
    // const [status_Input, setStatus_Input] =useState('-Select Status-');
    // const [searchInput, setSearchInput] = useState('');
    return ReactDOM.createPortal(
        <>
            <div className='patient-details-container'>
                <div className='patient-details-modal-container'>
                    <div className='patient-details-modal-title'>Patient Details</div>
                    <div className='patient-details-modal-body'>
                        <div className='patient-details-modal-body-input-box'>
                            <span>Full Name</span>
                            <DatePicker maxDate={new Date()} yearDropdownItemNumber={90} showYearDropdown scrollableYearDropdown={true} dateFormat='yyyy/MM/dd' className='date-picker' placeholder="Enter Date of Birth" selected={selectedDateInput} onChange={date=>setSelectedDateInput(date)} />
                        </div>
                        <div className='patient-details-modal-body-input-box'>
                            <span>Full Name</span>
                            <input type="text" placeholder="Enter name" value={nameInput} required onChange={e=>setNameInput(e.target.value)} />
                        </div>
                        <div className="patient-details-modal-body-input-box">
                            <span>Mobile</span>
                            <input type="text" placeholder="Enter mobile" value={mobileInput} required onChange={e=>setMobileInput(e.target.value)}/>
                        </div>                       
                        <div className="patient-details-modal-body-input-box">
                            <span>Allergen</span>
                            <input type="text" placeholder="Enter allergens" value={allergenInput} required onChange={e=>setAllergenInput(e.target.value)}/>
                        </div>
                        <select value={status_Input} onChange={(e)=>{setStatus_Input(e.target.value)}}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Deleted">Deleted</option>
                            <option value="-Select Status-">-Select Status-</option>
                        </select>
                        <div className='patient-details-modal-body-gender'>
                            <div className='patient-details-modal-body-input-box'>
                                <span>Gender</span>
                                <input type="radio" name="gender" checked={genderInput==="Male"? true: false} id="dot-1" value="Male" onChange={e=>setGenderInput(e.target.value)}/>
                            <input type="radio" name="gender" checked={genderInput==="Female"? true: false} id="dot-2" value="Female" onChange={e=>setGenderInput(e.target.value)}/>
                            </div>
                        </div>

                    </div>
                    <div className='patient-details-modal-body-button'>                    
                        {patientId? (<input type="submit" onClick={updatePatient} value='Update' className='percent-40'/>):
                        (<input type="submit" onClick={addPatient} value='Add' className='percent-40'/>)}                                 
                        <button onClick={()=>{setIsOpen(false); setSelectedDateInput(new Date())}}>Close</button>
                    </div>
                    
                </div>
            </div>
        </>
        
    )
}

export default PatientDetails
