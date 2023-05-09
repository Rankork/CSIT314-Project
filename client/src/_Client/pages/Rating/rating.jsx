import React from "react";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import "./rating.css";

const Rating = () => {
  return (
    <div className="client-rating">
      <Header />
      <h1>Rating Page</h1>
      <Footer />
      <div className="client-rating-table">
        <table>
          <tbody>
            <tr>
              <td>Professional Name: {/*TODO: replace with SQL*/} John Doe</td>
            </tr>
            <tr>
              <td>Trade : {/*TODO: replace with SQL*/} Electrician</td>
            </tr>
            <td>Rating:</td>
            <tr>
              <div className="five-start-rating"></div>
            </tr>
            <tr>
              <td>
                Feed back
                <br />
                <textarea
                  type="textarea"
                  rows="10"
                  placeholder="Enter feed back here..."
                  id="feed-back-textarea"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="NextPage-btn-container">
        <form action="/client/report">
          <input className="NextPage-btn" type="submit" value="Next Page" />
        </form>
      </div>
    </div>
  );
};

export default Rating;
