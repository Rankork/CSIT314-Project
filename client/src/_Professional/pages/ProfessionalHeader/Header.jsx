import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Images/logo.png";
import Img1 from "../../../Images/user.png";

import "./Header.css";

const Header = () => {
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
          {" "}
          <a href={"/professional/account"}>
            <img src={Img1} alt="img1" id="img1" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
