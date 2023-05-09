import React from "react";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import "./taskselection.css";

/* 
  
TODO: 
    * Impliment logic to only query traides that are within 5km range of client location
    * Replace avaliableTradies with SQL query  
*/

//DUMMY DATA -> TODO: replace with SQL
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
            {avaliableTradies.map((tradie, pos) => (
              <tr key={tradie.name}>
                <td>{pos + 1}</td>
                <td>{tradie.name}</td>
                <td>{tradie.location}</td>
                <td>{tradie.trade}</td>
                <td>{tradie.phone}</td>
                <td>
                  <button
                    className="select-tradie-button"
                    onClick={() => submitTradie(tradie)}
                  >
                    &#9989;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="tradie-count">
          <h2>
            Total number of respondents in area: {avaliableTradies.length}
          </h2>
        </div>

        <div className="NextPage-btn-container">
          <form action="/client/rating">
            <input className="NextPage-btn" type="submit" value="Next Page" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaskSelection;
