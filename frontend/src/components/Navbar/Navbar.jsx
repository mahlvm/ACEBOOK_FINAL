

import  { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.css';
// import ang from '../../assets/ang_profile.jpeg';
import { useNavigate } from "react-router-dom";

import { getAllUserInfo } from "../../services/user"

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    };

    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [profilePicture, setProfilePicture] = useState();

    useEffect(() => {
        if (token) {
            getAllUserInfo(token)
                .then((data) => {
                setUser(data.user);
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
                if (data.user.profile_picture) {
                    fetchImage(data.user.profile_picture);
                }
                })
        .catch((err) => {
            console.error(err);
            console.log(err)
            });
        }
    }, []);
    
    const fetchImage = async (imageName) => {
        try {
            // this makes a request to the server to fetch the image
            const response = await fetch(`http://localhost:3000/upload/${imageName}`);
            const blob = await response.blob();
            setProfilePicture(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
    
    const logout = () => {
        window.localStorage.removeItem("token");
        useNavigate('/');
    }


    return (

    
        // <div className="nav-box">

            <nav className="navbar-header">

                <div className="left-header">
                    <div className="logo">
                        <Link className="logo-home" to='/posts'>Acebook</Link>
                    </div>
            
                    <div className="buttons">
                    <Link className="btnHeader-profile" to='/profilepage'>Profile</Link>
                    <Link className="btnHeader-account" to='/accountpage'>Account</Link>
                    <Link className="btnHeader-logout" to='/' onClick={logout}>Logout</Link>
                    </div>
                </div>

                <div className="right-header">
                    <div className="user-greeting" data-testid="user-greeting">
                        Hi {user.username || "You"}  
                    </div>
                    <img src={profilePicture} className="photo-profile" style={{ maxWidth: '15%' }} onClick={handleDropdownToggle}/>
                    <div
                        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                        aria-labelledby="navbarDropdown">
                    </div>
                </div>  
    
            </nav>
        // </div>


    );
};

export default Navbar;


