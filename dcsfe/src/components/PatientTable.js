import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from './Modal.js';
import './PatientTable.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientTable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [mobileInput, setMobileInput] = useState('');
    const [genderInput, setGenderInput] = useState('');
    const [selectedDateInput, setSelectedDatenput] = useState(new Date(1979-11-29));
    const [allergenInput, setAllergenInput] = useState('');
    useEffect(()=>{
       
        getUsers(); 
    
    }, []);

    const getUsers = async ()=>{
        const response = await axios.get('http://172.16.0.101:3001/patient');
  
        if (response.data) {
            console.log('response data',response.data)
            setData(response.data);
        }
    };

    console.log('patient table fecth data',data);
    // console.log('name: ', nameInput);
    // console.log('mobile: ', mobileInput);
    // console.log('gender: ', genderInput);
    // console.log('dob: ', selectedDateInput);
    // console.log('allergen: ', allergenInput);

    

    const addPatient = async ()=>{
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
   
        
        let date = selectedDateInput;
        // console.log('addPatient called');
        if (!nameInput || !mobileInput || !genderInput || !selectedDateInput || !allergenInput) {
            alert('Empty field/s')
        }else{
            const response = await axios.post("http://172.16.0.101:3001/patient", {
            name: nameInput,
            mobile: mobileInput,
            gender: genderInput,
            dob: date,
            allergen: allergenInput,
            status_: 'Active',
        });
        console.log('add patient response.data', response.data)
        if (response.data.insertOk) {
            alert('Patient Added');
        }else{
            alert('Failed Adding Patient');
        }
        }
        
    }

    return (
        <div className='patient-table-container'>
            <p className='patient-table-heading'>Patient Table</p>
            <button onClick={()=>setIsOpen(true)}>New Patient</button>
            <Modal className='modal-container' open={isOpen} onClose={()=>setIsOpen(false)} >
                <div className="container">
                    <div className="title">Adding Patient</div>
                    <div className="content">
                    <div className='form'>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Full Name</span>
                                <input type="text" placeholder="Enter name" required onChange={e=>setNameInput(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <span className="details">Mobile</span>
                                <input type="text" placeholder="Enter mobile" required onChange={e=>setMobileInput(e.target.value)}/>
                            </div>
                            <div className="input-box ">
                                <span className="details">Date of Birth</span>
                                <DatePicker dateFormat='yyyy/MM/dd' className='date-picker' placeholder="Enter Date of Birth" selected={selectedDateInput} onChange={date=>setSelectedDatenput(date)}/>
                            </div>
                           
                            
                            <div className="input-box">
                                <span className="details">Allergen</span>
                                <input type="text" placeholder="Enter allergens" required onChange={e=>setAllergenInput(e.target.value)}/>
                            </div>
                        </div>
                        <div className="gender-details">
                            <input type="radio" name="gender" id="dot-1" value="male" onChange={e=>setGenderInput(e.target.value)}/>
                            <input type="radio" name="gender" id="dot-2" value="female" onChange={e=>setGenderInput(e.target.value)}/>
                            <span className="gender-title">Gender</span>
                            <div className="category">
                                <label htmlFor="dot-1">
                                    <span className="dot one"></span>
                                    <span className="gender">Male</span>
                                </label>
                                <label htmlFor="dot-2">
                                    <span className="dot two"></span>
                                    <span className="gender">Female</span>
                                </label>
                            </div>
                        </div>
                        <div className="button">
                        <input type="submit" onClick={addPatient} value="Add Patient" />
                        {/* <button className='modal-button-add-patient' onClick={addPatient}>Add Patient</button> */}
                        </div>
                    </div>
                    </div>
                </div>
            </Modal>
            <table className='patient-table-table'>
                <thead className='patient-table-thead'>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Allergen</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </table>
            
        </div>
    )
}

export default PatientTable
