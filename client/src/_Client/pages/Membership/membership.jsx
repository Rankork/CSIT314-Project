import React from "react";
import "./membership.css";
import { useState } from "react";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import Axios from "axios"

const Membership = () => {
  const [cardNo, setCardNo] = useState("");
  const [cvc, setCVC] = useState("");
  const [address, setaddress] = useState(""); 
  const [suburb, setsuburb] = useState(""); 
  const [postcode, setpostcode] = useState(""); 
  const [cardexpiry, setCardExp] = useState("");
  const [membershipType, setMembershipType] = useState("");

  // For debugging purposes
  // console.log(localStorage.getItem('userId'))

  const handleSelectionChange = (event) => {
    setMembershipType(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault(); 
  
    const regexcard = /^[0-9]{16}$/;
    const regexcvc = /^[0-9]{3}$/;

    const currentdate = new Date();
    const currentyear = currentdate.getFullYear();
    const year = cardexpiry.substring(2, 5);

    //console.log(regexcard.test(cardNo))
    console.log(membershipType);
  
    if(!regexcard.test(cardNo) || !regexcvc.test(cvc) || year < currentyear || address.trim().length == 0 || suburb.trim().length == 0 || postcode.trim().length == 0)
    {
      alert("One or more field does not meet criteria or unfilled");
    }
    else
    {
      // handle insert with axios
      Axios.post("http://localhost:8800/moredetails", {
        address: address,
        suburb: suburb,
        postcode: postcode,
        cardNo: cardNo,
        cvc: cvc,
        cardexpiry: cardexpiry,
        membershipType: membershipType,
        userId: localStorage.getItem('userId')
      })
      .then((response) => {
        console.log(response);
        alert("Data Inserted Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Insert Failed");
      });
    }
    
    setaddress('');
    setsuburb('');
    setpostcode('');
    setMembershipType('');
    setCardNo('');
    setCardExp('');
    setCVC('');
  
  };

  return (
    <div>
      {/* Div for whole Page*/}
      <div className="page">

        {/* Div for header */}
        <div>
          <Header/>
        </div>
      
      {/* Div for body of page */}
      <div className="Client">
          {/* Div for Enter Details */}
          <table className="center">
              <th className="enterDetails">
                <div className="enter_deets">
                  <h3 className="title">Enter Details:</h3>

                  {/* Form for Enter Details */}
                  <form id="enter_deets" name="enter_deets">

                      {/* Enter Address */}
                      <label for="address" className="label2">Address: </label> <br/>
                      <input type="text" id="address" name="Address" placeholder="Enter Address" value={address} onChange={(event) => setaddress(event.target.value)}/><br/>

                      {/* Enter Suburb */}
                      <label for="suburb" className="label2">Suburb: </label> <br/>
                      <input type="text" id="suburb" name="suburb" placeholder="Enter Suburb" value={suburb} onChange={(event) => setsuburb(event.target.value)}/><br/>

                      {/* Enter Post Code */}
                      <label for="postcode" className="label2">Post Code: </label> <br/>
                      <input type="text" id="postcode" name="postcode" placeholder="Enter Postcode" value={postcode} onChange={(event) => setpostcode(event.target.value)}/><br/>
                      
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
                          <input type="radio" id="memberSub" name="membershipType" value="Membership Subscription" onChange={handleSelectionChange} checked={membershipType == 'Membership Subscription'}/>
                          <label for="subscription"> Membership Subscription</label> 
                        </div>

                        <br/>

                        {/* Radio Button for Pay- On-Demand  */}
                        <div className="radbut">
                          <input type="radio" id="payOnDemand" name="membershipType" value="Pay-On-Demand" onChange={handleSelectionChange} checked={membershipType == 'Pay-On-Demand'}/>
                          <label for="payOnDemand" className="memLabel"> Pay-On-Demand</label>
                        </div>

                      </form>
                    </div>
                    <br/>
                  </tr>

                   {/* Enter Card Details */}
                  <tr>  
                    <div className="cardDetails">

                      <h3 className="title">Enter Card Details: </h3>

                      <form id="cardDetail" name="cardDetail" >

                        {/* Enter Card Number */}
                        <label for="cardNum" className="label2">Card Number: </label>
                        <input type="text" id="cardNum" name="cardNum" value={cardNo} placeholder="Enter Card Number" onChange={(event) => setCardNo(event.target.value)}/><br/>

                        {/* Enter Expiry Date */}
                        <label for="expiryDate" className="label2">Expiry Date:</label>
                        <input type="text" id="expiryDate" name="expiryDate" placeholder="Enter Card Number" value={cardexpiry} onChange={(event) => setCardExp(event.target.value)}/><br/>

                        {/* Enter CVC*/}
                        <label for="cvc" className="label2">CVC:</label>
                        <input type="text" id="cvc" name="cvc" placeholder="Enter CVC" value={cvc} onChange={(event) => setCVC(event.target.value)}/><br/>       

                      </form>
                    </div>
                  </tr>

                   {/* Submit Button */}
                  <tr>
                      <div className="Button">
                        <form onSubmit={handleSubmit}> {/* The end one with the type=submit is where you handle submit*/}
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

export default Membership;
