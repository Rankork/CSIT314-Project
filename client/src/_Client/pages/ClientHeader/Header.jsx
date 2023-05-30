import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Images/logo.png";
import Img1 from "../../../Images/user.png";
import { useNavigate } from "react-router-dom";
import "./Header.css";


const Header = () => {
  const navigate = useNavigate();

    const handleUserLogout = () => {
      // clear associated value/variables associated to a login session
      localStorage.removeItem('cLong'); 
      localStorage.removeItem('cLat');
      localStorage.removeItem('LuserId');
      localStorage.removeItem('Client_name');
      try {
        fetch("http://localhost:3000/logout", {
          method: "GET",
          credentials: "same-origin",
        });
        navigate("/");
      } catch (error) {
        console.error("Error on Logout", error);
      }
    };
    // handleUserLogout() --> Bug found: Don't bug it out 

  return (
    <div className="header">
      <ul>
        <li className="logo">
          <img src={Logo} alt="logo" id="logoimg" />
        </li>
        <li className="home">
          <Link to={"/client"}>Home</Link>
        </li>
        <li className="membership">
          <Link to={"/client/membership"}>Membership</Link>
        </li>
        <li className="taskAllocation">
          <Link to={"/client/task-allocation"}>Task Allocation</Link>
        </li>
        <li className="selection">
          <Link to={"/client/task-selection"}>Selection</Link>
        </li>
        <li className="rating">
          <Link to={"/client/rating"}>Rating</Link>
        </li>
        <li className="report">
          <Link to={"/client/report"}>Report</Link>
        </li>

        <li className="account">
          <ul className="dropdown">
            <button className="logout" onClick={handleUserLogout}>
              <a href=""></a>Logout
            </button>
          </ul>
          <img src={Img1} alt="img1" id="img1" />
        </li>
      </ul>
    </div>
  );
};

export default Header;
