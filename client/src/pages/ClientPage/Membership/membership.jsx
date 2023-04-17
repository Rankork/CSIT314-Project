import React from "react";
import "./membership.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";


const ClientPage = () => {
  return (
    <div>
      {/* Div for whole Page*/}
      <div className="page">

      {/* Div for header */}
        <div>
          <Header/>
        </div>
      
      {/* Div for body of page */}
      <div className="Cleint">
        <h1>Welcome, Client</h1>

          {/* Div for Enter Details */}
          <table className="center">
              <th className="enterDetails">
                <div className="register">
                  <h3 className="title">Enter Details:</h3>

                  {/* Form for Enter Details */}
                  <form id="register" name="register">
                      {/* Enter Fname */}
                      <label for="fname" className="Fname">First Name: </label> <br/>
                      <input type="text" id="fname" name="firstname" placeholder="Enter First Name"/><br/>

                      {/* Enter Lname */}
                      <label for="lname" className="label2">Last Name: </label> <br/>
                      <input type="text" id="lname" name="Lastname" placeholder="Enter Last Name"/><br/>

                      {/* Enter Address */}
                      <label for="address" className="label2">Address: </label> <br/>
                      <input type="text" id="address" name="Address" placeholder="Enter Address"/><br/>

                      {/* Enter Suburb */}
                      <label for="suburb" className="label2">Suburb: </label> <br/>
                      <input type="text" id="suburb" name="suburb" placeholder="Enter Suburb"/><br/>

                      {/* Enter Post Code */}
                      <label for="postcode" className="label2">Post Code: </label> <br/>
                      <input type="text" id="postcode" name="postcode" placeholder="Enter Postcode"/><br/>

                      {/* Enter Phone Number */}
                      <label for="phonenum" className="label2">Phone Number: </label> <br/>
                      <input type="text" id="phonenum" name="phonenum" placeholder="Enter Phone Number"/><br/>
                  </form>
                  </div>
              </th>

               {/* Div for Select Membership Type */}
              <th>
                <tr className="selectMemberType">
                    <div className="mship">

                      <h3 className="title">Select Membership Type:</h3>
                      <form id="memberType" name="memberType">

                        {/* Radio Button for Membership Subscription */}
                        <div className="radbut">
                          <input type="radio" id="memberSub" name="membershipType"/>
                          <label for="subscription"> Membership Subscription </label> 
                        </div>

                        <br/>

                        {/* Radio Button for Pay- On-Demand  */}
                        <div className="radbut">
                          <input type="radio" id="payOnDemand" name="membershipType" />
                          <label for="payOnDemand" className="memLabel"> Pay-On-Demand  </label>
                        </div>

                      </form>
                    </div>
                    <br/>
                  </tr>

                   {/* Enter Card Deatils */}
                  <tr>  
                    <div className="cardDeatils">

                      <h3 className="title">Enter Card Details: </h3>

                      <form id="cardDeail" name="cardDeail">

                        {/* Enter Card Number */}
                        <label for="cardNum" className="label2">Card Number: </label>
                        <input type="text" id="cardNum" name="cardNum" placeholder="Enter Card Number"/><br/>

                        {/* Enter Expiry Date */}
                        <label for="expiryDate" className="label2">Expiry Date:</label>
                        <input type="text" id="expiryDate" name="expiryDate" placeholder="Enter Card Number"/><br/>

                        {/* Enter CVC*/}
                        <label for="cvc" className="label2">CVC:</label>
                        <input type="text" id="cvc" name="cvc" placeholder="Enter CVC"/><br/>       


                      </form>
                    </div>
                  </tr>

                   {/* Submit Button */}
                  <tr>
                      <div className="Button">
                        <form>
                          <input className="submitButton" type="submit" value="Next Page"/>
                        </form>
                      </div>
                  </tr>

              </th>
          </table>
      </div>

      {/* Div for fotter*/}
        <div className="Footer">
            <Footer/>
        </div>

      </div>
    </div>
  );
};

export default ClientPage;
