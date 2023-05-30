/*
CSIT314 Project
Application Type: Web Application
Web Stack Used: MySQL, Express, React, Nodejs (MERN)
Project Contributors: Min Htut Myat, Ali Saleh, Charlie Johnson, Nathan Hunter, Amanda Moss
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Register from "../Register/Register"; // Min -> routes for register
import "./Login-page.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // SQL query to check email and passwords will go here !
    Axios.post("http://localhost:8800/users", {
      email: email,
      password: password,
    }).then((response) => {
       
      //--------- FOR DEBUG PURPOSES ------------
      // console.log() to identify bugs, checking if data is undefined or null
      try{
         console.log(response)
         console.log(response.data)
         console.log(response.data[0].Id)
         console.log(response.data[0].First_Name)
         console.log(response.data[0].Last_Name)
         console.log(response.data[0].AccountType)
      }
      catch(err)
      { 
        alert("Wrong login credentials",err)
      }

       //---- LOGIC ----------------
       try
       {

        if(response.status == 200) // handle with OK HTTP status code 
        {       
            // Handle login based on user type here, for Client and Professional
            if(response.data[0].AccountType == "Client" && response.data[0].First_Name != null)
            {
                /* Mixture of MySQL database and localStorage being used
                   Reason: 
                   For Web Applications, cookies and sessions exists for a reason,
                   if we were to wolly use database to store all user data. The database
                   design will be complex and backend queries will be complex. Making the
                   implementation more complex. There will be more data transferred through 
                   each function which negatively impacts performance of application and
                   user convenience and experience.
                */
                localStorage.setItem('Client_name', response.data[0].First_Name+" "+response.data[0].Last_Name)
                localStorage.setItem('LuserId', response.data[0].Id)
                navigate("/client") // Handle bringing relevant data over to next page
            }
            else if(response.data[0].AccountType == "Professional" && response.data[0].First_Name != null)
            {
                localStorage.setItem('Tradie_name', response.data[0].First_Name+" "+response.data[0].Last_Name)
                localStorage.setItem('LuserId', response.data[0].Id)
                navigate("/professional")
            }
            else
            {
                alert("Fatal Error")
                setEmail('')
                setPassword('')
            }
        }
        else
        {
            alert("Wrong login credentials")
            setEmail('')
            setPassword('')
        }
      }
      catch(error)
      {
         alert("wrong login credentials")
         setEmail('')
         setPassword('')
      }
    })
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
              /* onKeyPress={handleEnterKey} */
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
              /* onKeyPress={handleEnterKey} */
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          <button className="login-btn" type="submit">Sign in</button>
          <br></br>
          <br></br>
           <Link className="sign_up" to="register">Not a member? Sign Up</Link>
        </form>
      </div>
      <Routes>
            <Route exact path="register" element={<Register/>} /> {/*Note: Membership.jsx is under /client route defined in app.js */}
            {/*Add more routes on other pages here*/}
      </Routes>
    </div>
  );
};

export default LoginPage;
