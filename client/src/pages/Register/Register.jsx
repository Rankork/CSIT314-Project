import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import "./register.css";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmpassword, setcfmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event) => {

    event.preventDefault(); 
  
    if(password != cfmpassword)
    {
       alert("Password mismatch");
    }
    if(email.trim().length == 0)
    {
       alert("Email required");
    }
    if(name.trim().length == 0)
    {
       alert("Name required");
    }
    else
    {
        // redirect to login page 
        Axios.post("http://localhost:8800/users/new", {
          email: email,
          password: password,
          name: name
        })
        .then((response) => {
          console.log(response);
          alert("Data Inserted Successfully");
        })
        .catch((error) => {
          console.log(error);
          alert("Insert Failed");
        });
    }
  
  };

  useEffect(() => {
    // Add LoginPage to the body element when mounting
    document.body.classList.add("RegisterPage");

    // Remove LoginPage to the body element when un-mounting
    return () => {
      document.body.classList.remove("RegisterPage");
    };
  }, []);

  return (
    <div className="register">
      <div className="register__container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
         <form>
            <label for="Name">Name</label>
            <input
              className="register__input"
              type="text"
              placeholder="Brandon Terryson"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </form>
          <form>
            <label for="email">Email</label>
            <input
              className="register__input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </form>
          <form>
            <label for="password">Password</label>
            <input
              className="register__input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          <form>
            <label for="cfm_password">Confirm Password</label>
            <input
              className="register__input"
              type="password"
              placeholder="Enter password"
              value={cfmpassword}
              onChange={(event) => setcfmPassword(event.target.value)}
            />
          </form>
          <button className="register-btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;