
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

// import Navbar from "../../components/Navbar/Navbar";


import { login } from "../../services/authentication";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setError] = useState()
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError(err.cause)
      navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (

    <body>

      <div className="login-box">
        {/* TITULO */}
        <h2>Login</h2>

        {/* FORMS */}
        <form className="content-login" onSubmit={handleSubmit}>

        {/* FORM EMAIL */}
        {/* <label htmlFor="email">Email:</label> */}
        <input className="input" placeholder="Email" id="email" type="text" value={email} onChange={handleEmailChange}/>

        {/* FORM PASSWORD */}
        {/* <label htmlFor="password">Password:</label> */}
        <input className="input" placeholder="Password"  id="password" type="password"  value={password} onChange={handlePasswordChange}/>

        {/* Button SUBMIT */}
        <input className="btn btn-login" role="submit-button" id="submit" type="submit" value="Login" />

        </form>

        
        <hr />
      

        {/* Buttor SIGNUP */}
        <button className="btn btn-signup">
                <Link to="/signup" className="btn">Create new account</Link>
        </button>
        


        {/* ERROR */}
        {loginError && <div><h4>{loginError}</h4></div>}

      </div>    

    

    </body>

  );
};