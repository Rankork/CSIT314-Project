import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import "./home.css";

const Home = () => {
  return (
    <div className="home-client">
      <Header />
      <h1>Welcome, Client</h1>
      <Footer />
    </div>
  );
};

export default Home;
