import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { updateUserInfo } from "../../services/updateUser.js";
import { getAllUserInfo } from "../../services/user.js";
import { updateImage } from "../../services/updateUser.js";

import "./AccountPage.css";

export const AccountPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile_picture, setProfilePicture] = useState();

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
            console.error(err);
            console.log(err)
            });
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                await updateUserInfo(username, email, password, profile_picture, token)
                .then(updateImage(profile_picture))
                console.log("Details updated!");
            } catch (err) {
                console.error(err);
            }
        };
    
        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        };
    
        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };
    
        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };
    
        const handleProfilePictureChange = (event) => {
            const file = event.target.files[0];
            console.log("I am the filename:", file.name)
            setProfilePicture(file);
        };
    
    return (
        <>
        <div className="accountpage">

            <Navbar />
                {/* TITLE */}
                <h1>This is your Account page!</h1>
            

            {/* FORM */}
            <form encType="multipart/form-data" onSubmit={handleSubmit}>

                 {/* USERNAME FORM */}
                 {/* <label htmlFor="username">Username:</label> */}
                    <input
                        className="input-sg"
                        id="username"
                        placeholder={user.username}
                        type="text"
                        onChange={handleUsernameChange}
                    />

                    {/* EMAIL FORM */}
                    {/* <label htmlFor="email">Email:</label> */}   
                    <input
                        className="input-sg"
                        id="email"
                        placeholder={user.email}
                        type="email"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        onChange={handleEmailChange}
                    />

                    {/* PASSWORD FORM */}
                    {/* <label htmlFor="password">Password:</label> */}
                    <input
                        className="input-sg"
                        id="password"
                        placeholder="********"
                        type="password"
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
                        onChange={handlePasswordChange}
                    />

                    {/* PICTURE FORM */}
                    {/* <label className="label-picture"  htmlFor="profile_picture">Add Profile Picture:</label> */}
                    <label className="picture" htmlFor="profile_picture">
                        <input
                            id="profile_picture"
                            type="file"
                            name="profile_picture"
                            onChange={handleProfilePictureChange}
                            style={{ display: 'none' }}
                        />
                        Upload Profile Picture
                    </label>


                     {/* BUTTON SUBMIT */}
                    <input className="btn btn-signup" role="submit-button" id="submit" type="submit" value="Update!" />

            </form>
        </div>
    </>
    );
};