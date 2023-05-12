import React from "react"; 
import Logo from "../../Images/logo.png";
import Img1 from "../../Images/user.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import ClientPage  from "../../pages/ClientPage/ClientPage";
import Membership from "../../pages/ClientPage/Membership/Membership";
import CreateServiceRequest from "../../pages/ClientPage/Create_Service_Request/CreateServiceRequest";

const Header = () => {

  const navigate = useNavigate();
  const handleUserLogout = (e) => {
      localStorage.clear(); // clear associated value/variables associated to a login session
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
            <li className="home"><Link to="/client">Home</Link></li> {/*  This is not needed maybe, make something like a dashboard on client page*/}
            <li className="membership"><Link to="/client/member">Membership</Link></li>  {/*Fixed routing issue here using absolute path*/}
            <li className="payondemand"><a href="#payOnDamand">Pay-on-Demand </a></li>
            <li className="createservicerequest"><Link to="/client/servicerequest">Create Service Request</Link></li>
            <li className="more"> <a href="#more">More</a></li>
            <li className="account"><a href="#account"><img src={Img1} alt="img1" id="img1"/></a>
              <ul className="dropdown">
                <button className="logout" onClick={handleUserLogout}><a href=""></a>Logout</button>
              </ul>
            </li>
          </ul>
          <Routes>
            <Route exact path="/client" element={<ClientPage/>} />
            <Route exact path="/client/member" element={<Membership/>} /> {/*Note: Membership.jsx is under /client route defined in app.js */}
            <Route exact path="/client/servicerequest" element={<CreateServiceRequest/>} />
            {/*Add more routes on other pages here*/}
          </Routes>
        </div>
    );
};

export default Header;


