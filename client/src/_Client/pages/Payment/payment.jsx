import React from "react";
import "./payment.css";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";

const Payment = () => {
  return (
    <div className="payment-page">
      <Header />

      <div className="due-amount-wrapper">
        <p className="payment-heading">Pending Amount</p>
        <br />
        <p className="due-amount">100$ {/*TODO: Replace with SQL*/}</p>
      </div>

      <div className="card-details-wrapper">
        {/* Enter Card Deatils */}
        <table>
          <tr>
            <div className="cardDeatils">
              <h3 className="title">Enter Card Details: </h3>

              <form id="cardDeail" name="cardDeail">
                {/* Enter Card Number */}
                <label for="cardNum" className="label2">
                  Card Number:{" "}
                </label>
                <input
                  type="text"
                  id="cardNum"
                  name="cardNum"
                  placeholder="Enter Card Number"
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
                />
                <br />
              </form>
            </div>
          </tr>
        </table>
      </div>

      <div className="payment-NextPage-btn-container">
        <form action="/client/rating">
          <input
            className="payment-NextPage-btn"
            type="submit"
            value="Next Page"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
