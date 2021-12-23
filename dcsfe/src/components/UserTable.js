import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserDetails from './modals/UserDetails.js';
import './Table.css';


const UserTable = () => {
    const [user_dob, set_user_dob] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [user_name, set_user_name] = useState('');
    const [user_mobile, set_user_mobile] = useState('');
    const [user_gender, set_user_gender] = useState('');
    const [user_email, set_user_email] = useState('');
    const [user_id, set_user_id] = useState("");
    const [user_type, set_user_type] =useState("-Select Type-");
    const [searchNameInput, setSearchNameInput] = useState('');
    const [userAge, setUserAge] = useState('');
    const [user_password, set_user_password] = useState('');
    const [searchTypeInput, setSearchTypeInput] = useState('');
    const [user_status, set_user_status] = useState('-Select Status-');
    useEffect(()=>{
        
        getUsers(); 
    
    }, []);
    const addUser = async ()=>{
        setIsOpen(true);
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
        let date = formatDate(user_dob);
        // console.log('date: ', date);
        // console.log('addUser called');
        if (!user_name || !user_mobile || !user_gender || !user_dob || !user_email || !user_password || user_type === '-Select Status-') {
            alert('Empty field/s')
        }else{
            const response = await axios.post("http://172.16.0.101:3001/user", {
                user_name: user_name,
                user_mobile: user_mobile,
                user_gender: user_gender,
                user_dob: date,
                user_email: user_email,
                user_type: user_type,
                user_password: user_password,
                user_status: user_status,
        });
        // console.log('add user response.data', response.data)
        if (response.data.userInsertOk) {
            alert('User Added');
            // setSelectedDatenput(new Date());
            // set_user_name('');
            // set_user_mobile('');
            // set_user_email('');
            // set_user_gender('');
            // console.log('clearing input name', user_name);
            getUsers();
            setIsOpen(false);
        }else{
            alert('Failed Adding User');
        }
        }
        
    }
    
    const getUsers = async (data)=>{
        
        if (data) {
            const response = await axios.post(`http://172.16.0.101:3001/users`, data);
            if (response.data) {
                // console.log('response data',response.data)
                setUsersData(response.data);
            }
        } else {
            const response = await axios.get(`http://172.16.0.101:3001/users`);
            if (response.data) {
                // console.log('response data',response.data)
                setUsersData(response.data);
            }
        }
        
  
        
    };
    const updateUser = async ()=>{
        
        // function formatDate(date) {
        //     var d = new Date(date),
        //         month = '' + (d.getMonth() + 1),
        //         day = '' + d.getDate(),
        //         year = d.getFullYear();
        
        //     if (month.length < 2) 
        //         month = '0' + month;
        //     if (day.length < 2) 
        //         day = '0' + day;
        
        //     return [year, month, day].join('-');
        // }        
        // let date = formatDate(user_dob);
        // console.log('date: ', date);
        // console.log('addUser called');
        if (!user_name || !user_mobile || !user_gender || !user_dob || !user_email) {
            alert('Empty field/s')
        }else{
            const response = await axios.put(`http://172.16.0.101:3001/user/${user_id}`, {
                user_name: user_name,
                user_mobile: user_mobile,
                user_gender: user_gender,
                user_dob: user_dob,
                user_email: user_email,
                user_status: user_status,
                user_type: user_type,
             });

            if (response.data.userUpdateOk) {
            alert('User Upated');
            // setSelectedDatenput(new Date());
            // set_user_name('');
            // set_user_mobile('');
            // set_user_email('');
            // set_user_gender('');
            // console.log('clearing input name', user_name);
            setIsOpen(false);
            getUsers();
            }else{
                alert('Failed Updating User');
            }
        }
        
    };
    const newUser = ()=>{
        set_user_id(null);
        set_user_dob(new Date());
        set_user_name('');
        set_user_mobile('');
        set_user_email('');
        set_user_gender('');
        set_user_password('');
        set_user_type('-Select Type-');
        set_user_status('-Select Status-');
        // console.log('clearing input name', user_name);
        setIsOpen(true);
    };
    const setUserAgeFunction = (patientDOB)=>{
        // let age = 0;
        const ageDiffs = new Date().getFullYear() - new Date(patientDOB).getFullYear();
        if (new Date().getMonth() < new Date(patientDOB).getMonth()) {
            // age = ageDiffs -1;
            setUserAge(ageDiffs -1);
        } else {
            // age = ageDiffs;
            setUserAge(ageDiffs);
        }
    }
    const detailsFunction = async (patientIdparam)=>{
        // console.log('edit user ccalled')
        // console.log('patienId before fetch', user_id)
        const responsePatient = await axios.get(`http://172.16.0.101:3001/user/${patientIdparam}`);
        
        if (responsePatient.data[0].user_id) {
            set_user_dob(new Date(responsePatient.data[0].user_dob));
            set_user_name(responsePatient.data[0].user_name);
            set_user_mobile(responsePatient.data[0].user_mobile);
            set_user_email(responsePatient.data[0].user_email);
            // set_user_password(responsePatient.data[0].input);
            set_user_gender(responsePatient.data[0].user_gender);
            set_user_type(responsePatient.data[0].user_type);
            set_user_id(responsePatient.data[0].user_id);
            setUserAgeFunction(responsePatient.data[0].user_dob);
            // console.log('patienId after set_user_id', user_id);
            // console.log('name after setPatientname', user_name);
            // if (user_id) {
            //     console.log('user_id true', user_id)
            // } else {
            //     console.log('user_id false', user_id)
            // }
            setIsOpen(true);
            
        } else {
            console.log('responsePatientId is empty: ', responsePatient.data[0].user_id)
        }
    }
    return (
        <div className='table-table2-container'>
            <UserDetails
            isOpen={isOpen} setIsOpen={setIsOpen} addUser={addUser}
            updateUser={updateUser} user_id={user_id} user_type={user_type}
            set_user_type={set_user_type} user_gender={user_gender} set_user_gender={set_user_gender}
            user_name={user_name} set_user_name={set_user_name} user_mobile={user_mobile}
            set_user_mobile={set_user_mobile} user_email={user_email} set_user_email={set_user_email}
            user_dob={user_dob} set_user_dob={set_user_dob}
            userAge={userAge} user_password={user_password} set_user_password={set_user_password}
            user_status={user_status} set_user_status={set_user_status}

            ></UserDetails>
            <div className='table-table2-head-container'>
                <div className='table-table2-head-input'>
                    <div className='table-table2-head-search-container'>
                        {/* <button className='table-table2-head-search-button' onClick={getUsers} >Search</button> */}
                        {/* <input className='table-table2-head-search-input' placeholder='Search' value={searchNameInput} onChange={(e)=>{setSearchNameInput(e.target.value)}} /> */}
                        {/* <button className='table-table2-head-search-clear' onClick={()=>{setSearchNameInput('')}}>X</button> */}
                    </div>
                    <div className='table-table2-head-add-container'>
                    {/* <button className='table-table-head-add-button' onClick={()=>newUser()}>New User</button> */}
                </div>
                </div>
            </div>
            <div className='table-table2-table'>
                <thead className='table-table2-table-thead-search2'>
                    <tr className='table-table2-table-thead-tr-search2'>
                        {/* <th>
                            <div><button>Find</button></div>
                        </th> */}
                        <th><p onClick={()=>{getUsers({name: searchNameInput, type: searchTypeInput})}}>Find</p></th>
                        <th><input placeholder='Name' value={searchNameInput} onChange={(e)=>{setSearchNameInput(e.target.value)}}/><button onClick={()=>{setSearchNameInput('');setSearchTypeInput('')}}>X</button></th>
                        <th><input placeholder='Type' value={searchTypeInput} onChange={(e)=>{setSearchTypeInput(e.target.value)}}/></th>
                        <th><p onClick={()=>newUser()}>New</p></th>
                    </tr>
                </thead>
                <thead className='table-table2-table-thead'>
                    <tr className='table-table2-table-thead-tr'>
                        <th>No</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody className='table-table2-table-tbody'>
                    
                    {usersData && usersData.map((user, index)=>{
                        
                        return (
                            <tr key={index} className='table-table2-table-tbody-tr'>
                               <td>{index+1}</td>
                                <td>{user.user_name}</td>
                                <td>
                                    <button  id={user.user_status=== 'Scheduled'? 'bg-green':'bg-black'}>{user.user_type}</button>
                                </td>
                                <td className='table-table2-table-body-tr-td'>
                                    <button onClick={()=>{detailsFunction(user.user_id)}}>Details</button>
                                    {/* <button>Treatments</button> */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </div>

        </div>
    )
}

export default UserTable;
