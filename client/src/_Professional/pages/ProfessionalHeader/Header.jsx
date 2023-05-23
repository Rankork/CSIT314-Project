import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Images/logo.png";
import Img1 from "../../../Images/user.png";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const handleUserLogout = (e) => {
    localStorage.removeItem('Tradie_name');
    localStorage.removeItem('pLong'); 
    localStorage.removeItem('pLat');
    localStorage.removeItem('LuserId');
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
  return (
    <div className="header">
      <ul>
        <li className="logo">
          <img src={Logo} alt="logo" id="logoimg" />
        </li>
        <li className="home">
          <Link to={"/professional"}>Home</Link>
        </li>
        <li className="membership">
          <Link to={"/professional/membership"}>Membership</Link>
        </li>
        <li className="selection">
          <Link to={"/professional/task-selection"}>Selection</Link>
        </li>
        <li className="rating">
          <Link to={"/professional/rating"}>Rating</Link>
        </li>
        <li className="report">
          <Link to={"/professional/report"}>Report</Link>
        </li>
        <li className="account">
          <ul className="dropdown">
            <button className="logout" onClick={handleUserLogout}>
              <a href=""></a>Logout
            </button>
          </ul>
          <a href={"/professional/account"}>
            <img src={Img1} alt="img1" id="img1" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
