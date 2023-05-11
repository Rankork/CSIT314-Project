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
              <div className="five-start-rating">
                {/*TODO: develop interactive 5 star rating system */}
              </div>
            </tr>
            <tr>
              <td>
                <label for="feed-back-textarea">Feed Back</label>
                <br />
                <textarea
                  name="feed-back-textarea"
                  id="feed-back-textarea"
                  type="textarea"
                  rows="10"
                  cols="150"
                  placeholder="Enter feed back here..."
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rating-NextPage-btn-container">
        <form action="/client/report">
          <input
            className="rating-NextPage-btn"
            type="submit"
            value="Next Page"
          />
        </form>
      </div>
    </div>
  );
};

export default Rating;
