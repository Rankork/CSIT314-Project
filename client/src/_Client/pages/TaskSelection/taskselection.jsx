import React, { useState } from "react";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import "./taskselection.css";

/* 
  
TODO: 
    * Impliment logic to only query traides that are within 5km range of client location
    * Replace avaliableTradies with SQL query  
*/

const avaliableTradies = [
  {
    name: "John Doe",
    location: "Prestons",
    trade: "Plumber ",
    phone: "0498843377",
  },
  {
    name: "Felix Homes ",
    location: "Prestons",
    trade: "Painter",
    phone: "0497843377",
  },
  {
    name: "Jane Doe",
    location: "Liverpool",
    trade: "Electrician",
    phone: "0497843879",
  },
];

function submitTradie(trade) {
  // Function to handle the tradie the client submitted
}

const TaskSelection = () => {
  return (
    <div className="task-selection">
      <Header />
      <div>
        <h1>Please select your tradie</h1>
        <table className="tradie-table">
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Location</th>
            <th>Trade</th>
            <th>Phone</th>
            <th>Accept</th>
          </tr>
          <tbody>
            {avaliableTradies.map((trade, pos) => (
              <tr key={trade.name}>
                <td>{pos + 1}</td>
                <td>{trade.name}</td>
                <td>{trade.location}</td>
                <td>{trade.trade}</td>
                <td>{trade.phone}</td>
                <td>
                  <button
                    className="select-tradie-button"
                    onClick={() => submitTradie(trade)}
                  >
                    &#9989;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="tradie-count">
          <h2>{`Total number of respondents in area: ${avaliableTradies.length}`}</h2>
        </div>
        <div className="NextPage-btn-container">
          <button className="NextPage-btn">Next Page</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaskSelection;
