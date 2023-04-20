import React from "react";
import "./client-page.css";
import Logo from "../../Images/logo.png";
import Img1 from "../../Images/user.png";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ClientPage = () => {
  const navigate = useNavigate();
  const handleUserLogout = (e) => {
      try
      {
        fetch("http://localhost:3000/logout", {
          method: 'GET',
          credentials: 'same-origin' 
        });
        navigate("/")
      }
      catch(error)
      {
        console.error('Error on Logout', error)
      }
  }


  return (
    <div>
      {/* Div for whole Page*/}
      <div className="page">

      {/* Div for header */}
        <div>
          <Header/>
        </div>
      
      {/* Div for body of page*/}
      <div className="Client">
        <h1>Welcome, Client</h1>
      </div>

      {/* Div for fotter*/}
        <div className="Footer">
            <Footer/>
        </div>

      </div>
    </div>
  );
};

export default ClientPage;
