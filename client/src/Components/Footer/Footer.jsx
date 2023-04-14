import React from "react"; 
import "./Footer.css";

const Footer = () => {
    return(
            <div className="footer">
               <ul>
                    <li className="CopyRight"><a href="#Copyright">Copy Right ©2023 Tradies Inc </a></li>
                    <li className="Privacy"><a href="#privacy">Privacy Policy</a></li>
                    <li className="line"><a>|</a></li>
                    <li className="terms"><a href="#terms">Terms of Use</a></li>
                    <li className="line"><a>|</a></li>
                    <li className="support"><a href="#support">Support</a></li>
                    <li className="line"><a>|</a></li>
                    <li className="Contact"><a href="#contact">Contact Us</a></li>
               </ul>
            </div>
    );
};

export default Footer;
