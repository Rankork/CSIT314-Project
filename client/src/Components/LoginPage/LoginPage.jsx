import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./login-page.css";
import "../../user.js";
import user from "../../user.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // SQL query to check email and passwords
    Axios.post("http://localhost:8800/users", {
      email: email,
      password: password,
    }).then((response) => {
      //--------- FOR DEBUG PURPOSES -------------
      //console.log(response)
      //console.log(response.data)
      //console.log(response.data[0].AccountType)
      //console.log(response.status)

      //---- LOGIC ----------------
      if (response.status === 200) {
        /// Updating the global user var
        user.accountType = response.data[0].AccountType;

        /*
        TODO: 
         * Update all of the params in user such as:
             - user.location = ...
             - user.fistName = ...
             - user.lastName = ...
            ect...
        
        Note user var is located in user.js file, this is so
        that user var can be used in any location in the file.
        */

        // handle with OK HTTP status code
        if (user.accountType === "Client") {
          navigate("/client");
        } else if (user.accountType === "Professional") {
          navigate("/professional");
        } else {
          alert("Fatal Error");
        }
      } else {
        alert("Error with session");
      }
    });
  };

  useEffect(() => {
    // Add LoginPage to the body element when mounting
    document.body.classList.add("loginPage");

    // Remove LoginPage to the body element when un-mounting
    return () => {
      document.body.classList.remove("loginPage");
    };
  }, []);

  return (
    <div className="login">
      <div className="login__container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <form>
            <label for="email">Email</label>
            <input
              className="login__input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </form>
          <form>
            <label for="password">Password</label>
            <input
              className="login__input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          <button className="login-btn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
