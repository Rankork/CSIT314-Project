import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Header from "../ClientHeader/Header";
import "./home.css";

const Home = () => {
  const userId = localStorage.getItem('userId');

  return (
    <div className="home-client">
      {/* Div for whole Page Above ^ */}

      {/* React Header Call*/}
      <Header />
      
      {/* Title for home page "Welcome, Client */}
      <h1 className="WelcomeCli">Welcome, Client</h1>
      <p>You are logged in, your user ID is: {userId}</p>
      
      {/* About us - Table  */}
      <table className="aboutusTable">
          <tr>
            {/* About us - title */}
            <th>
              <h2 className="aboutus">About us:</h2>
            </th>
        </tr>

        {/* About us - text contents */}
        <tr>
          <td>
            <p className="aboutusContents"> 
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
      <table className="MemOpt">
        <tr>
          {/* Memebrship Options - title */}
          <th>
             <h2 className="memberTit">Membership Options:</h2>
          </th>
        </tr>

        {/* Memebrship Options - Table */}
        <tr>
            <table className="membershipTableOp">

            {/* Memebrship Options - Table - Row 1 */}
              <tr id="row">
                {/* Memebrship Options - Table - Title */}
                  <th id="test1">
                    <h3 className="MembershipSubTitle">Membership Subscription</h3>
                  </th>
                {/* Memebrship Options - Table - Title */}
                  <th id="test1">
                    <h3 className="PayOnDemandTitle">Pay-on-Demand</h3>
                  </th>
              </tr>


            {/* Memebrship Options - Table - Row 2 */}
              <tr id="row" className="row2">
                {/* Memebrship Options - Table - Membership Description */}
                <td id="test1">This allows for the client to Subscribe to the services of our site and have unlimited callouts.</td>
              
                 {/* Memebrship Options - Table - Pay-On-Demand Description */}
                <td id="test1"> In Pay-0n-Demand Clients pay per service use.</td>

              </tr>

            {/* Memebrship Options - Table - Row 3 */}
              <tr id="row" className="row2">
                {/* Memebrship Options - Table - Membership Description */}
                  <td id="test1">The Clients pay a fixed membership fee annually and are entitled to unlimited
                  assistance callouts</td>
                {/* Memebrship Options - Table - Pay-On-Demand Description */}
                  <td id="test1">When the client requires help with a task they will request assistance through the system. </td>
              </tr>

            {/* Memebrship Options - Table - Row 4 */}
              <tr id="row" className="row2">
                {/* Memebrship Options - Table - Membership Description */}
                  <td id="test1"> When you are a memeber you get perks like faster respose time, and higher priority for task completion </td>
                {/* Memebrship Options - Table - Pay-On-Demand Description */}
                  <td id="test1"> Prices are calculated by the system and presented to customers up front. </td>
              </tr>
            </table>
        </tr>
      </table>

    {/* Professional Rate - Table */}
    <table className="professional">
      {/* Professional Rate - Title */}
        <tr>
          <th><h2 className="profesionalTitle">Professional Rate:</h2></th>
        </tr>
      
      {/* Professional Rate - Data */}
        <tr>
          <td className="proData">
            The Professional Charge Rate for the Pay-on-Demand Option is dependent upon the Professionals 
            rate and difficulty of task. 
            <br/><br/>
            The reason we let the professional set their charge rates for the tasks they help the clients with:
            <ul id="list">
              <li id="list1">Professionals invest years of education, training, and practical experience to develop a high level of competence and proficiency in their respective domains.</li>
              <li id="list1">Their expertise from years of education and tranning allows them to offer these services and meet the specific needs of the clinet, solve problems encoundered on the job</li>
              <li id="list1">Professionals will charge for fair compensation for their time, knowledge, and effort to complete the task assigned to them.</li>
            </ul>
          </td>
        </tr>
    </table>


  {/* React Footer Call*/}
    <Footer />
    </div>
  );
};

export default Home;
