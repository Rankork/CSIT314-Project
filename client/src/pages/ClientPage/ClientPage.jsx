import React from "react";
import "./client-page.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";



const ClientPage = () => {

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
