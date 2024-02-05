import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

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
    {/* <Navbar /> */}
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          required />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            onChange={handleEmailChange}
          required />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
            value={password}
            onChange={handlePasswordChange}
          required />
          <label htmlFor="profile_picture">Add Profile Picture:</label>
          <input
            id="profile_picture"
            type="file"
            value={profile_picture}
            onChange={handleProfilePictureChange}
          />
          <input role="submit-button" id="submit" type="submit" value="Sign up!" />
      </form>
      {signUpError && <div ><h4 role="invalid-signup">{signUpError}</h4></div>}
    </>
  );
};
