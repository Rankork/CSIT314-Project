import React from "react";
import Header from "../ProfessionalHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import {useState, useEffect} from "react";
import "./taskselection.css";
import Axios from 'axios'; 

const TaskSelection = () => {
  const [task1_expand, set_task1_expand] = useState(false);
  const [availableservreq,setavailableservreq] = useState([]);
  const [price, setPrice] = useState("");

  const handleacceptSubmit = (event, acceptreq, client, reqid) => {
     event.preventDefault(); 
     console.log(acceptreq);

        Axios.post("http://localhost:8800/acceptservreq", {
          acceptreq: acceptreq,
          price: price
        })
        .then((response) => {
          console.log(response);
          alert("Data Inserted Successfully");
        })
        .catch((error) => {
          console.log(error);
          alert("Insert Failed");
        });
        // Added changes to form clearing after submit
        setPrice('');

        // Create local storage here for tradie
        const data = {
              price: price,
              client: client,
              acceptreq: acceptreq,
              reqid: reqid
        }
        localStorage.setItem('acceptedservreq', JSON.stringify(data));
  };

      useEffect(() => {
        const getservreqdetails = async () => {
          try {
            const pLat = localStorage.getItem('pLat');
            const pLong = localStorage.getItem('pLong');
            const result = await Axios.get(`http://localhost:8800/servicerequests?plat=${pLat}&plng=${pLong}`)
            setavailableservreq(result.data);
            console.log(result.data)
          }
          catch (err) {
            console.log(err);
          }
        };
        getservreqdetails();
    },[]);

   console.log(availableservreq)

  return (
    <div className="professional-task-selection">
      <Header />
      <h1>Please select your tasks to be completed</h1>
      {availableservreq.map((result, index) => (
      <div className="task-container">

        <div
          className="task-header"
          onClick={() => set_task1_expand(index)}
        >
          <h3>
            <table>
              <tr className="table-header">
                <th>{index + 1}</th>
                <th className="table-pad">{result.request}</th>
                <th className="table-pad">{result.Suburb}</th>
                <th className="table-pad">{result.specialty}</th>
              </tr>
            </table>
          </h3>
          <span className={`${task1_expand ? "open" : "closed"}`} />
        </div>
         {task1_expand == index && (
          <div className="task-content">
            <div className="task-details">
              <hr />
              {/* Table*/}
              <table className="task1">
                {/* Table - Row 1 */}
                <tr id="rowT1">
                  <th className="Location">Location:</th>
                  <td id="value">{result.full_address}</td>

                  <th className="Proximity">Proximity:</th>
                  <td id="value"> 50 km</td>
                </tr>

                {/* Table - Row 2 */}
                <tr id="rowT1">
                  <th className="TradeNeed">Trade Needed:</th>
                  <td id="value">{result.specialty}</td>

                  <th className="priceSet">Set price: </th>
                  <td>
                    <input
                      id="price-input"
                      type="Text"
                      placeholder="Enter Price"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </td>
                </tr>

                {/* Table - Row 3 */}
                <tr id="rowT1">
                  <th className="clientName">Client Name: </th>
                  <td id="value" className="clientData" clientData="clientData" colSpan="2">
                    {result.name}
                  </td>
                  <td>
                  <input
                    className="acceptbtn"
                    type="submit"
                    value="Accept"
                    onClick={(event) => handleacceptSubmit(event, result.request, result.name, result.sid)}
                  />
                  </td>
                </tr>

                {/* Table - Row 4 */}
                <tr id="rowT1">
                  <th className="phoneNum">Client Phone Number: </th>
                  <td id="value" colspan="2">
                    {result.Phone_number}
                  </td>
                </tr>

                {/* Table - Row 4 */}
                <tr id="rowT1">
                  <th className="Descript">Description: </th>
                  <td id="value" colspan="3">
                  {result.request_desc}
                  </td>
                </tr>
              </table>
            </div>
          </div>
         )}
      </div>
      ))}
      <Footer />
    </div>
  );
};

export default TaskSelection;