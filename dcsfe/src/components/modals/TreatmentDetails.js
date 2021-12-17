import React from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const TreatmentDetails = (
    {
    isOpen, setIsOpen, addUser, updateUser,userId,
    typeInput,setTypeInput,genderInput,setGenderInput,
    nameInput,setNameInput,mobileInput,setMobileInput,emailInput,
    setEmailInput,selectedDateInput,setSelectedDateInput,userAge,
    passwordInput,setPasswordInput,
    }
    ) => {
    if (!isOpen) {
        return null;
    }
    // const [selectedDateInput, setSelectedDateInput] = useState(new Date());
    // const [isOpen, setIsOpen] = useState(false);
    // const [patientsData, setPatientsData] = useState([]);
    // const [nameInput, setNameInput] = useState('');
    // const [mobileInput, setMobileInput] = useState('');
    // const [genderInput, setGenderInput] = useState('');
    // const [emailInput, setEmailInput] = useState('');
    // const [userId, setPatientId] = useState("");
    // const [typeInput, setTypeInput] =useState('-Select Status-');
    // const [searchInput, setSearchInput] = useState('');
    return ReactDOM.createPortal(
        <>
            <div className='details-details-container'>
                {/* <div className='details-details-modal-container'>
                    <div className='details-details-modal-title'>{userId? `${nameInput} Details --  Age: ${userAge}`: 'User Details'}</div>
                    <div className='details-details-modal-body'>
                        <div className='details-details-modal-body-input-box'>
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
                                <select value={typeInput} onChange={(e)=>{setTypeInput(e.target.value)}}>
                                    <option value="Dentist">Dentist</option>
                                    <option value="Receptionist">Receptionist</option>
                                    <option value="Surgeon">Surgeon</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Deleted">Deleted</option>
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
                        </div>
                        

                    </div>
                    <div className='details-details-modal-body-button'>                    
                        <button onClick={userId? updateUser : addUser}>{userId? 'Update' : 'Add'}</button>                               
                        <button onClick={()=>{setIsOpen(false); setSelectedDateInput(new Date())}}>Close</button>
                    </div>
                    
                </div> */}
            </div>
        </>,
        document.getElementById('user-details')
        
    );
};

export default TreatmentDetails;
