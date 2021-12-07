import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import "./Header.css"

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();
    useEffect(()=>{
        // const setTab = ()=>{
            if (location.pathname === "/") {
                setActiveTab("Home");
                console.log('sets to Home')
            }else if(location.pathname === "/add"){
                setActiveTab("AddUser");
                console.log('sets to Add User')
            }else if(location.pathname === "/about"){
                setActiveTab("About");
                console.log('sets to About')
            }
        // }
        // setTab();

    }, [location]);
    
    return (
        <div className="header">
            <p className="logo">User Management System</p>
            <div className="header-right">
                <Link to="/">
                    <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={()=>setActiveTab("Home")}>Home</p>
                </Link>
                <Link to="/add">
                    <p className={`${activeTab === "AddUser" ? "active" : ""}`} onClick={()=>setActiveTab("Adduser")}>Add User</p>
                </Link>
                <Link to="/about">
                    <p className={`${activeTab === "About" ? "active" : ""}`} onClick={()=>setActiveTab("About")}>About</p>
                </Link>
            </div>
        </div>
    )
}

export default Header
