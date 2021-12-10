import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PatientTable = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
       
        getUsers(); 
    
    }, []);

    const getUsers = async ()=>{
        const response = await axios.get('http://172.16.0.101:3001/users');
  
        if (response.data) {
            setData(response.data);
        }
    };
    return (
        <div className='patient-table-container'>
            <h1 className='patient-table-heading'>Patient Table</h1>
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
