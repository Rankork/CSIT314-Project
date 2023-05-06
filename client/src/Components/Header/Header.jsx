import React from "react";
import Logo from "../../Images/logo.png";
import Img1 from "../../Images/user.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <ul>
        <li className="logo">
          <img src={Logo} alt="logo" id="logoimg" />
        </li>
        <li className="home">
          <a href="/home">Home</a>
        </li>
        <li className="membership">
          <a href="/membership">Membership</a>
        </li>
        <li className="taskAllocation">
          <a href="#taskallocation">Task Allocation</a>
        </li>
        <li className="selection">
          {" "}
          <a href="#selection">Selection</a>
        </li>
        <li className="rating">
          <a href="#rating">Rating</a>
        </li>
        <li className="report">
          <a href="#report">Report</a>
        </li>
        <li className="account">
          {" "}
          <a href="#account">
            <img src={Img1} alt="img1" id="img1" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
