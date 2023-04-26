import React from "react"; 
import Logo from "../../Images/logo.png";
import Img1 from "../../Images/user.png";
import "./Header.css";
<<<<<<< Updated upstream

=======
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import  Membership from "../../pages/ClientPage/Membership/Membership";
>>>>>>> Stashed changes

const Header = () => {
    return (
        <div className="header">
          <ul>
            <li className="logo"><img src={Logo} alt="logo" id="logoimg" /></li>
            <li className="home"><a href="#home">Home</a></li>
<<<<<<< Updated upstream
            <li className="membership"><a href="#membership">Membership</a></li>  
            <li className="payondemand"><a href="#payOnDamand">Pay-on-Demand </a></li>
            <li className="more"> <a href="#more">More</a></li>
            <li className="account"> <a href="#account"><img src={Img1} alt="img1" id="img1"/></a></li>
=======
            <li className="membership"><Link to="member">Membership</Link></li>  
            <li className="payondemand"><a href="#payOnDemand">Pay-on-Demand </a></li>
            <li className="more"><a href="#more">More</a></li>
            <li className="account"><a href="#account"><img src={Img1} alt="img1" id="img1"/></a>
              <ul className="dropdown">
                <button className="logout" onClick={handleUserLogout}><a href=""></a>Logout</button>
              </ul>
            </li>
>>>>>>> Stashed changes
          </ul>
          <Routes>
            <Route exact path="member" element={<Membership/>} /> {/*Note: Membership.jsx is under /client route defined in app.js */}
            {/*Add more routes on other pages here*/}
          </Routes>
        </div>
    );
};

    export default Header;


