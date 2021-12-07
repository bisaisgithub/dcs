import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {useNavigate, useLocation, Navigate} from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';

// const initialState = {
//     name: "",
//     email: "",
//     contact: "",
// };

const AddEdit = () => {
    // const [state, setState] = useState(initialState);
    // const {name, email, contact} = initialState;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [redirect, setRedirect] = useState(false);

    const history = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        if (id) {
            getSingleUser(id);
        }
    }, [id]);

    const getSingleUser = async (id)=>{
        const response = await axios.get(`http://172.16.0.101:3001/user/${id}`);
            if (response.status === 200) {
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setContact(response.data[0].contact);
            }
    };

    const addUser = async (data)=>{
        // console.log('addContact ',data);
        const response = await axios.post("http://172.16.0.101:3001/user", data);
        if (response.status === 200) {
            toast.success(response.data);
            setRedirect(true);
        }
    };

    const updateUser = async (data, id)=>{
        // console.log('addContact ',data);
        const response = await axios.put(`http://172.16.0.101:3001/user/${id}`, data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(name, email, contact);
        const data = {
            name, contact, email
        }
        // console.log(data);
        // console.log('submit ', state);
        // console.log('name, email, contact',name, email, contact);

        if (!name || !email || !contact) {
            toast.error('Empty Field/s')
       
        }else{
            if (!id) {
                addUser(data);
            }else{
                updateUser(data, id);
            }
            
            // history("/");
            // setTimeout(()=>history("/"), 500);
            
        }
        
    }
    // const handleInputChange = (e)=>{
    //     let {name, value} = e.target;
    //     console.log(name, value);
    //     setState({...state, [name] : value});
    //     console.log(state);
    // }
    if (redirect) {
        return <Navigate to="/login"/>
    }
    
    return (
        <div style={{marginTop: "100px"}}>
            <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter Name .." onChange={(e)=>setName(e.target.value)} defaultValue={name} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter Email .." onChange={(e)=>setEmail(e.target.value)}  defaultValue={email}/>
                <label htmlFor="contact">Contact</label>
                <input type="number" id="contact" name="contact" placeholder="Enter Contact .." onChange={(e)=>setContact(e.target.value)} defaultValue={contact} />
                <input type="submit" value={id ? "Update": "Add"} onClick={handleSubmit}/>
            </form>            
        </div>
    )
}

export default AddEdit
