import React from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserDetails = ({
    isOpen, setIsOpen, addUser, updateUser,user_id,
    user_type,set_user_type,user_gender,set_user_gender,
    user_name,set_user_name,user_mobile,set_user_mobile,user_email,
    set_user_email,user_dob,set_user_dob,userAge,
    user_password,set_user_password,user_status,set_user_status
    }) => {

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <>
            <div className='details-details-container'>
                <div className='details-details-modal-container'>
                    <div className='details-details-modal-title'>{user_id? `${user_name} Details --  Age: ${userAge}`: 'User Details'}</div>
                    <div className='details-details-modal-body'>
                        <div className='details-details-modal-body-input-box'>
                            <span>Date of Birth</span>
                            <DatePicker maxDate={new Date()} yearDropdownItemNumber={90} showYearDropdown scrollableYearDropdown={true} dateFormat='yyyy/MM/dd' className='date-picker' placeholderText="Click to select" selected={user_dob} onChange={date=>set_user_dob(date)} />
                        </div>
                        <div className='details-details-modal-body-input-box'>
                            <span>Full Name</span>
                            <input type="text" placeholder="Enter name" value={user_name} required onChange={e=>set_user_name(e.target.value)} />
                        </div>
                        <div className="details-details-modal-body-input-box">
                            <span>Mobile</span>
                            <input type="text" placeholder="Enter mobile" value={user_mobile} required onChange={e=>set_user_mobile(e.target.value)}/>
                        </div>                       
                        <div className="details-details-modal-body-input-box">
                            <span>Email</span>
                            <input type="text" placeholder="Enter email" value={user_email} required onChange={e=>set_user_email(e.target.value)}/>
                        </div>
                        <div className="details-details-modal-body-input-box">
                            <span>Password</span>
                            <input type="password" placeholder="Enter password" value={user_password} required onChange={e=>set_user_password(e.target.value)}/>
                        </div>
                        <div className="details-details-modal-body-input-box">
                                <span>Status</span>
                                <select value={user_status} onChange={(e)=>{set_user_status(e.target.value)}}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Deleted">Deleted</option>
                                    <option value="">-Select Status-</option>
                                </select>
                            </div>
                        <div className="details-details-modal-body-status-gender">
                            <div className="details-details-modal-body-input-box">
                                <span>Type</span>
                                <select value={user_type} onChange={(e)=>{set_user_type(e.target.value)}}>
                                    <option value="Dentist">Dentist</option>
                                    <option value="Receptionist">Receptionist</option>
                                    <option value="Surgeon">Surgeon</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Deleted">Deleted</option>
                                    <option value="">-Select Type-</option>
                                </select>
                            </div>
                            <div className='details-details-modal-body-gender'>
                                <span>Gender</span>
                                <div className='details-details-modal-body-input-box-gender'>
                                    <div>
                                        <input type="radio" name="gender" checked={user_gender==="Male"? true: false} id="dot-1" value="Male" onChange={e=>set_user_gender(e.target.value)}/>
                                        <span className='details-details-modal-body-input-box-gender-span-male'>Male</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" checked={user_gender==="Female"? true: false} id="dot-2" value="Female" onChange={e=>set_user_gender(e.target.value)}/>
                                        <span>Female</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    <div className='details-details-modal-body-button'>                    
                        <button onClick={user_id? updateUser : addUser}>{user_id? 'Update' : 'Add'}</button>                               
                        <button onClick={()=>{setIsOpen(false); set_user_dob(new Date())}}>Close</button>
                    </div>
                    
                </div>
            </div>
        </>,
        document.getElementById('user-details')
        
    );
};

export default UserDetails;
