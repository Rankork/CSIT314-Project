import React from "react";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import "./taskselection.css";
import { useState, useEffect } from "react";
import Axios from 'axios';

/* 
TODO: 
    * Impliment logic to only query traides that are within 50km range of client location
    * Replace avaliableTradies with SQL query  
*/

//DUMMY DATA -> TODO: replace with SQL
/*
const availableTradies = [
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
*/

const TaskSelection = () => {
  const [availableTradies,setavailableTradies] = useState([]);

    useEffect(() => {
      const getlocationdetails = async () => {
        try {
          const cLat = localStorage.getItem('cLat');
          const cLong = localStorage.getItem('cLong');
          const result = await Axios.get(`http://localhost:8800/professional?clat=${cLat}&clng=${cLong}`)
          setavailableTradies(result.data);
        }
        catch (err) {
          console.log(err);
        }
      };
      getlocationdetails();
  },[]);

  // ------------- FOR DEBUG PURPOSES -------------------
  //console.log(localStorage.getItem('cLat'));
  //console.log(localStorage.getItem('cLong'));  
  console.log(availableTradies);
  // console.log(availableTradies[0].name);
  // create local storage data for accepttradie
  // mixture of tradie and client data (made persitent till professional login)

  const handletradieSelect = (event, speciality) => {
    var values = {
      client_id: localStorage.getItem('LuserId'),
      client_name: localStorage.getItem('Client_name'), 
      tradiename : event.target.value,
      tradiespecialty: speciality
    };
    localStorage.setItem('accepttradiedata', JSON.stringify(values));
  }

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
            {availableTradies.map((tradie, pos) => (
              <tr key={tradie.name}>
                <td>{pos + 1}</td>
                <td>{tradie.name}</td>
                <td>{tradie.Suburb}</td>
                <td>{tradie.pSpecialty}</td>
                <td>{tradie.Phone_number}</td>
                <td>
                  <form>
                    <input type="checkbox" id="acccept" name="accept" value={tradie.name} onChange={(event) => handletradieSelect(event, tradie.pSpecialty)}/> {/*Changed to checkbox*/}
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="tradie-count">
          <h2>
            Total number of respondents in area: {availableTradies.length}
          </h2>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default TaskSelection;
