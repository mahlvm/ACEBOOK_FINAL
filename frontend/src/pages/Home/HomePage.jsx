
import { Link } from "react-router-dom";

import "./HomePage.css";

export const HomePage = () => {
  return (

    <body>
    
        {/* Left Column */}
        <div className="content-info">
          <h1>Welcome to Acebook!</h1>
          <h3>Acebook helps you connect and share with the people in your life.</h3>
        </div>
         {/* Right Column */}
        <div className="content-login">
            <div className="buttons-box">

              <button className="btn btn-login">
                <Link to="/login" className="btn">Log In</Link>
              </button>


              <button className="btn btn-signup">
                <Link to="/signup" className="btn">Create new account</Link>
              </button>

            </div>

        </div>




    </body>

  );
};
