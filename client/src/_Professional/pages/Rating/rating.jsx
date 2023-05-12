import React from "react";
import Header from "../ProfessionalHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import "./rating.css";

const Rating = () => {
  return (
    <div className="professional-rating">
      <Header />
      <h1>Rating Page</h1>
      <Footer />
      <div className="professional-rating-table">
        <table>
          <tbody>
            <tr>
              <td>Client Name: {/*TODO: replace with SQL*/} John Doe</td>
            </tr>
            <tr>
              <td>Address: {/*TODO: replace with SQL*/} Electrician</td>
            </tr>
            <td>Rating:</td>
            <tr>
              <div className="five-start-rating">
                {/*TODO: develop interactive 5 star rating system */}
              </div>
            </tr>
            <tr>
              <tr>
                <td>
                  <label for="client-notes-textarea">Client Notes</label>
                  <br />
                  <textarea
                    name="client-notes-textarea"
                    id="client-notes-textarea"
                    type="textarea"
                    rows="10"
                    cols="50"
                    placeholder="Enter client notes here..."
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="job-notes-textarea">Job notes</label>
                  <br />
                  <textarea
                    name="job-notes-textarea"
                    id="job-notes-textarea"
                    type="textarea"
                    rows="10"
                    cols="50"
                    placeholder="Enter job notes here..."
                  ></textarea>
                </td>
              </tr>
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
