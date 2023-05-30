import React from "react";
import "./payment.css";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import Axios from 'axios';

const Payment = () => {
  const [cardNo, setCardNo] = useState("");
  const [cvc, setCVC] = useState("");
  const [cardexpiry, setCardExp] = useState("");

  // Regex checking for correct format of credit/debit card length and cvc
  const regexcard = /^[0-9]{16}$/;
  const regexcvc = /^[0-9]{3}$/;

  const currentdate = new Date();
  const currentyear = currentdate.getFullYear();
  const year = cardexpiry.substring(2, 5);

  var acceptedservreq = JSON.parse(localStorage.getItem('acceptedservreq'));
  let reqprice = acceptedservreq.price;

  const handletpaymentSubmit = (event) => {

    event.preventDefault(); 

    if(!regexcard.test(cardNo) || !regexcvc.test(cvc) || year < currentyear)
    {
      alert("One or more field does not meet criteria or unfilled");
    }
    else
    {
      // handle insert with axios
      Axios.post("http://localhost:8800/tpayment", {
        cardNo: cardNo,
        cvc: cvc,
        cardexpiry: cardexpiry,
        reqprice: reqprice,
        userId: localStorage.getItem('LuserId')
      })
      .then((response) => {
        console.log(response);
        alert("Data Inserted Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Insert Failed");
      });

      setCardNo('');
      setCardExp('');
      setCVC('');

    }
  }



  return (
    <div className="payment-page">
      <Header />

      <div className="due-amount-wrapper">
        <p className="payment-heading">Pending Amount</p>
        <br />
        <p className="due-amount">{reqprice}</p>
      </div>

      <div className="card-details-wrapper">
        {/* Enter Card Details */}
        <table>
          <tr>
            <div className="tcardDetails">
              <h3 className="title">Enter Card Details: </h3>

              <form id="cardDetails" name="cardDetails" onSubmit={handletpaymentSubmit}>
                {/* Enter Card Number */}
                <label for="cardNum" className="label2">
                  Card Number:
                </label>
                <input
                  type="text"
                  id="cardNum"
                  name="cardNum"
                  placeholder="Enter Card Number"
                  value={cardNo}
                  onChange={(event) => setCardNo(event.target.value)}
                />
                <br />

                {/* Enter Expiry Date */}
                <label for="expiryDate" className="label2">
                  Expiry Date:
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="Enter Card Number"
                  value={cardexpiry}
                  onChange={(event) => setCardExp(event.target.value)}
                />
                <br />

                {/* Enter CVC*/}
                <label for="cvc" className="label2">
                  CVC:
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="Enter CVC"
                  value={cvc}
                  onChange={(event) => setCVC(event.target.value)}
                />
                <br />
                <input
                      className="payment-pay-btn"
                      type="submit"
                      value="Make Payment"
                />
              </form>
            </div>
          </tr>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
