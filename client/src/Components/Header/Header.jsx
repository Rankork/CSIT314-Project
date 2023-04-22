import React from "react"; 
import Logo from "../../Images/logo.png";
import Img1 from "../../Images/user.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
        <div className="header">
          <ul>
            <li className="logo"><img src={Logo} alt="logo" id="logoimg" /></li>
            <li className="home"><a href="#home">Home</a></li>
            <li className="membership"><a href="#membership">Membership</a></li>  
            <li className="payondemand"><a href="#payOnDemand">Pay-on-Demand </a></li>
            <li className="more"><a href="#more">More</a></li>
            <li className="account"><a href="#account"><img src={Img1} alt="img1" id="img1"/></a>
              <ul className="dropdown">
                <button className="logout" onClick={handleUserLogout}><a href=""></a>Logout</button>
              </ul>
            </li>
          </ul>
        </div>
    );
};

export default Header;


