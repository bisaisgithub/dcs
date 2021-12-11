import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
    const [selectedDateInput, setSelectedDatenput] = useState(new Date());
    return (
        <div>
            <DatePicker maxDate={new Date()} yearDropdownItemNumber={90} showYearDropdown scrollableYearDropdown={true} dateFormat='yyyy/MM/dd' className='date-picker' placeholder="Enter Date of Birth" selected={selectedDateInput} onChange={date=>setSelectedDatenput(date)}/>
        </div>
    )
}

export default Dashboard
