import React from "react";
import "./rating.css";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";

const Rating = () => {
  return (
    <div className="client-rating">
      <Header />
      <h1>Rating Page</h1>
      <Footer />
      <div className="client-rating-table">
        <table>
          <th>Professional Name</th>
          <th>Trade</th>
          <th>Rating</th>
          <th>Feed back</th>
          <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tbody>
        </table>
      </div>
      <div className="NextPage-btn-container">
        <button className="NextPage-btn">Next Page</button>
      </div>
    </div>
  );
};

export default Rating;
