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
          {" "}
          <a href={"/client/account"}>
            <img src={Img1} alt="img1" id="img1" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
