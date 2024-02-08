import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./SignupPage.css";

// import Navbar from "../../components/Navbar/Navbar";


import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState("")
  const [signUpError, setError] = useState()
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(username, email, password, profile_picture);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.cause)
      navigate("/signup");
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
    setProfilePicture(event.target.value);
  };

  return (

    <>

      <div className="signup-box">

        {/* TITLE */}
        <h2>Create Account</h2>

        {/* FORM */}
        <form className="content-signup" onSubmit={handleSubmit}>

          {/* USERNAME FORM */}
          {/* <label htmlFor="username">Username:</label> */}
            <input
              className="input-sg"
              placeholder="Username"
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />

            {/* EMAIL FORM */}
            {/* <label htmlFor="email">Email:</label> */}
            <input
              className="input-sg"
              placeholder="Email"
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />

            {/* PASSWORD FORM */}
            {/* <label htmlFor="password">Password:</label> */}
            <input
              className="input-sg"
              placeholder="Password"
              id="password"
              type="password"
              minLength="8"
              value={password}
              onChange={handlePasswordChange}
            />

            {/* PICTURE FORM */}
            {/* <label className="label-picture"  htmlFor="profile_picture">Add Profile Picture:</label> */}
            <label className="picture" htmlFor="profile_picture">
              <input
                id="profile_picture"
                type="file"
                value={profile_picture}
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
              />
              Upload Profile Picture
            </label>
            

            {/* BUTTON SUBMIT */}
            <input className="btn btn-signup" role="submit-button" id="submit" type="submit" value="Create!" />

        </form>

            {/* BUTTON LOGIN */}
            <hr />
            <button className="btn btn-login">
                <Link to="/login" className="btn">Log In</Link>
            </button>



            {/* ERROR */}
            {signUpError && <div ><h4 role="invalid-signup">{signUpError}</h4></div>}


      </div>
    </>

  );
};

