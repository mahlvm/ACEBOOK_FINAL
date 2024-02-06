

import  { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import './Navbar.css';
// import 'bootstrap/dist/css/bootstrap.css';
import ang from '../../assets/ang_profile.jpeg';

import { getAllUserInfo } from "../../services/user"

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    };

    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            getAllUserInfo(token)
                .then((data) => {
                setUser(data.user);
                console.log(data.user)
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
                })
        .catch((err) => {
            console.err(err);
            console.log(err)
            });
        }
    }, []);


    return (
    
        <div className="nav-box">

            <nav className="navbar-header">


                {/* LEFT INFO */}
                <div className="left-header">

                    {/* ACEBOOK NAME/LOGO */}
        
                        <Link className="logo-home" to='/'>Acebook</Link>
                

                    {/* GREETING */}
                    <div className="user-greeting" data-testid="user-greeting">
                        Hi {user.username || "You"}  
                    </div>

                </div>

                {/* RIGHT INFO  */}
                <div className="right-header">

                    {/* BUTTONS */}
                
                    <Link className="btnHeader-profile" to='/profilepage'>Profile</Link>
                    
                    <Link className="btnHeader-account" to='/accountpage'>Account</Link>

                    <Link className="btnHeader-logout" to='/'>Logout</Link>
                
                    {/* PICTURE */}
                        <img
                            src={ user.profile_picture || ang }
                            className="photo-profile"
                            style={{ maxWidth: '15%' }}
                            onClick={handleDropdownToggle}
                        />
                    
                    {/* ?? */}
                    <div
                        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                        aria-labelledby="navbarDropdown"
                    >
                    </div>


                    
                </div>    
            </nav>
        </div>


    );
};


export default Navbar;


