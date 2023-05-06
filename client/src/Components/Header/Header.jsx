import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Images/logo.png";
import Img1 from "../../Images/user.png";
import "./Header.css";
import user from "../../user.js";

const Header = () => {
  let isClient = false;
  let isProfessional = false;

  if (user.accountType === "Client") {
    isClient = true;
  } else if (user.accountType === "Professional") {
    isProfessional = true;
  }

  return (
    <div className="header">
      <ul>
        <li className="logo">
          <img src={Logo} alt="logo" id="logoimg" />
        </li>
        <li className="home">
          <Link to={isClient === true ? "/client" : "/professional"}>Home</Link>
        </li>
        <li className="membership">
          <Link
            to={
              isClient === true
                ? "/client/membership"
                : "/professional/membership"
            }
          >
            Membership
          </Link>
        </li>
        <li className="taskAllocation">
          <Link
            to={
              isClient === true
                ? "/client/taskAllocation"
                : "/professional/taskAllocation"
            }
          >
            Task Allocation
          </Link>
        </li>
        <li className="selection">
          <Link
            to={
              isClient === true
                ? "/client/selection"
                : "/professional/selection"
            }
          >
            Selection
          </Link>
        </li>
        <li className="rating">
          <Link
            to={isClient === true ? "/client/rating" : "/professional/rating"}
          >
            Rating
          </Link>
        </li>
        <li className="report">
          <Link
            to={isClient === true ? "/client/report" : "/professional/report"}
          >
            Report
          </Link>
        </li>
        <li className="account">
          {" "}
          <a
            href={
              isClient === true ? "/client/account" : "/professional/account"
            }
          >
            <img src={Img1} alt="img1" id="img1" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
