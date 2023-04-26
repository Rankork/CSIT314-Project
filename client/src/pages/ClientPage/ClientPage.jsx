import React from "react";
import "./client-page.css";
import Logo from "../../Images/logo.png";
import Img1 from "../../Images/user.png";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from "react-router-dom";

const ClientPage = () => {
  const location = useLocation();
  const userId = location.state.userId;

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
        <p>You are logged in, your user ID is: {userId}</p>
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
