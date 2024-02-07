import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignupPage.css";
import { signup } from "../../services/authentication";
import { updateImage } from "../../services/updateUser";

export const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState();
  const [signUpError, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Log before signup is called:", username, email, password, profile_picture)
      await signup(username, email, password, profile_picture)
      .then(updateImage(profile_picture))
      console.log("2nd user data:", username, email, password, profile_picture)
      console.log("redirecting...:");
      navigate("/profilepage");
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
    const file = event.target.files[0];
    console.log("I am the filename:", file.name)
    setProfilePicture(file);
  };

  return (

    <body>
      
      <div className="signup-box">

        {/* TITLE */}
        <h2>Create Account</h2>

        {/* FORM */}
        <form className="content-signup" action='/upload' encType="multipart/form-data" onSubmit={handleSubmit}>

          {/* USERNAME FORM */}
          {/* <label htmlFor="username">Username:</label> */}
            <input
              className="input-sg"
              placeholder="Username"
              id="username"
              type="text"
              // value={username}
              onChange={handleUsernameChange}
            />

            {/* EMAIL FORM */}
            {/* <label htmlFor="email">Email:</label> */}
            <input
              className="input-sg"
              placeholder="Email"
              id="email"
              type="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              // value={email}
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
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
              // value={password}
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
            <input className="btn btn-signup" role="submit-button" id="submit" type="submit" value="Create!" />

        </form>

            {/* ERROR */}
            {signUpError && <div ><h4 role="invalid-signup">{signUpError}</h4></div>}


      </div>
    </body>

  );
};

