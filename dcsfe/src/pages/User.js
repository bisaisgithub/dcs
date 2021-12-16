import React from 'react';
import './Page.css';
import UserTable from '../components/UserTable.js';

const User = () => {
    return (
        <div className='page-container'>
            <UserTable />
        </div>
    )
}

export default User;
