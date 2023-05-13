import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Header from "../ProfessionalHeader/Header";
import "./home.css";

const Home = () => {
  const userId = localStorage.getItem('userId');
  return (
    <div className="home-prof">
    {/* Div for whole Page Above ^ */}

    {/* Header */}
      <Header />
    
    {/*Welcome Client - Tittle */}
      <h1 className="WelcomePro">Welcome, Professional</h1>
      <p>You are logged in, your user ID is: {userId}</p>
      
    {/* About us - Table*/}
     <table className="aboutusTablePro">
          <tr>
            {/* About us - title */}
            <th>
              <h2 className="aboutusPro">About us:</h2>
            </th>
        </tr>

    {/* About us - text contents */}
        <tr>
            <td>
              <p className="aboutusContentsPro"> 
              Welcome to our website! 
              <br/><br />
              We are a platform that connects clients with professional tradesmen and women 
              to get tasks completed quickly and efficiently.
            
              It is our mission to help find you the right trades Person for you and your task. 
              Whether you need a plumber, electrician, handyman, or any other type of tradesman, 
              we are here to help you find the right professional for your specific task.
              <br/><br/>
              Our team goal is to make the process of finding a trades person as easy and stress-free 
              as possible. 
              <br/>
              We provide a secure and easy-to-use platform that allows you to connect with 
              tradesmen, get quotes, and hire professionals in just a few clicks.
              <br/><br/>
              We understand that your time is valuable, and that's why we strive to make the process 
              of finding a tradesman quick and easy. 
            
              Whether you need a small repair or a major 
              renovation, we are here to help you find the right professional for your task.
              <br/><br/>
              Thank you for choosing our platform for your tradesmen needs. 
              We look forward to helping you find the perfect professional for your task!
              </p>
            </td>
          </tr>
      </table>

      {/* Membership Options - Table  */}
      <table className="MemOptPro">
        <tr>
          {/* Memebrship Options - title */}
          <th>
             <h2 className="memberTitPro">Membership Options:</h2>
          </th>
        </tr>

        {/* Memebrship Options - Table */}
        <tr>
            <table className="membershipTableOpPro">

            {/* Memebrship Options - Table - Row 1 */}
              <tr id="rowPro">
                {/* Memebrship Options - Table - Title */}
                  <th id="test1Pro">
                    <h3 className="MembershipSubTitlePro">Membership Subscription</h3>
                  </th>
                {/* Memebrship Options - Table - Title */}
                  <th id="test1">
                    <h3 className="PayOnDemandTitlePro">Commission Fee</h3>
                  </th>
              </tr>


            {/* Memebrship Options - Table - Row 2 */}
              <tr id="row" className="row2Pro">
                {/* Memebrship Options - Table - Membership Description */}
                <td id="test1">This allows for the client to Subscribe to the services of our site and have unlimited callouts.</td>
              
                 {/* Memebrship Options - Table - Pay-On-Demand Description */}
                <td id="test1"> In Commission Fee the Clients pay per service use by tradesmen.</td>

              </tr>

            {/* Memebrship Options - Table - Row 3 */}
              <tr id="row" className="row2">
                {/* Memebrship Options - Table - Membership Description */}
                  <td id="test1">The professional pays a fixed membership fee annually and are entitled to unlimited callout per-day</td>
                {/* Memebrship Options - Table - Pay-On-Demand Description */}
                  <td id="test1">When the client requires help with a task they will request help and proessional charges based on the task done. </td>
              </tr>

            {/* Memebrship Options - Table - Row 4 */}
              <tr id="row" className="row2">
                {/* Memebrship Options - Table - Membership Description */}
                  <td id="test1"> When you are a memeber you get perks like more jobs appear outside of your 5km range and top of the recomendation list </td>
                {/* Memebrship Options - Table - Pay-On-Demand Description */}
                  <td id="test1"> Prices are calculated by the system based on the task effort and presented to customers up front. </td>
              </tr>
            </table>
        </tr>
      </table>




      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default Home;
