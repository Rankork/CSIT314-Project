import React from "react";
import "./client-page.css";
import Logo from "../../Images/logo.png";
import Img1 from "../../Images/user.png";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const ClientPage = () => {
  const userId = localStorage.getItem('userId');

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
        <h1>Welcome to Tradies !!</h1>
        <br/>
        <p>Tradies is a platform where client and professionals can connect <br/> where professionals provides their services and clients provides serivce request for help they need.</p>
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
