import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './View.css';

const View = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

    const {id} = useParams();

    useEffect(()=>{
        if (id) {
            getSingleUser(id);
        }
    }, [id]);

    const getSingleUser = async (id)=>{
        const response = await axios.get(`http://localhost:3001/user/${id}`);
            if (response.status === 200) {
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setContact(response.data[0].contact);
            }
    };
    return (
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br/>
                    <br/>
                    <strong>Name:</strong>
                    <span>{name}</span>
                    <br/>
                    <br/>
                    <strong>Email:</strong>
                    <span>{email}</span>
                    <br/>
                    <br/>
                    <strong>Contact:</strong>
                    <span>{contact}</span>
                    <br/>
                    <br/>
                    <Link to="/">
                        <button className="btn btn-edit">Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View
