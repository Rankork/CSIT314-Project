import React, { useState } from "react";
import Header from "../ProfessionalHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import "./taskselection.css";

const TaskSelection = () => {
  const [task1_expand, set_task1_expand] = useState(false);
  const [task2_expand, set_task2_expand] = useState(false);
  const [task3_expand, set_task3_expand] = useState(false);

  return (
    <div className="professional-task-selection">
      <Header />
      <h1>Please select your tasks to be completed</h1>
      <div className="task-container">
        <div
          className="task-header"
          onClick={() => set_task1_expand(!task1_expand)}
        >
          <h3>
            <table>
              <tr className="table-header">
                <th>1</th>
                <th className="table-pad">Kitchen Sink needs to be Fixed</th>
                <th className="table-pad">Prestons</th>
                <th className="table-pad">plumber</th>
              </tr>
            </table>
          </h3>
          <span className={`${task1_expand ? "open" : "closed"}`} />
        </div>
        {task1_expand && (
          <div className="task-content">
            <div className="task-details">
              <hr />
              {/* Table*/}
              <table className="task1">
                {/* Table - Row 1 */}
                <tr id="rowT1">
                  <th className="Location">Location:</th>
                  <td id="value"> 22 Fovex Avenue, Liverpool, NSW </td>

                  <th className="Proximity">Proximity:</th>
                  <td id="value"> 10 km</td>
                </tr>

                {/* Table - Row 2 */}
                <tr id="rowT1">
                  <th className="TradeNeed">Trade Needed:</th>
                  <td id="value"> Carpenter</td>

                  <th className="priceSet">Set price: </th>
                  <td>
                    <input
                      id="price-input"
                      type="Text"
                      placeholder="Enter Price"
                    />
                  </td>
                </tr>

                {/* Table - Row 3 */}
                <tr id="rowT1">
                  <th className="clientName">Client Name: </th>
                  <td id="value" clientData="clientData" colSpan="2">
                    John Doe
                  </td>
                </tr>

                {/* Table - Row 4 */}
                <tr id="rowT1">
                  <th className="phoneNum">Client Phone Number: </th>
                  <td id="value" colspan="2">
                    0488222902
                  </td>
                </tr>

                {/* Table - Row 4 */}
                <tr id="rowT1">
                  <th className="Descript">Description: </th>
                  <td id="value" colspan="3">
                    Wood fence needs to be build in my backyard out of Pine wood
                    ...
                  </td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="task-container">
        <div
          className="task-header"
          onClick={() => set_task2_expand(!task2_expand)}
        >
          <h3>
            <table>
              <tr className="table-header">
                <th>2</th>
                <th className="table-pad">Task description here</th>
                <th className="table-pad">Location here</th>
                <th className="table-pad">Tradie type here</th>
              </tr>
            </table>
          </h3>
          <span className={`${task2_expand ? "open" : "closed"}`} />
        </div>
        {task2_expand && (
          <div className="task-content">
            <hr />
            {/* Table*/}
            <table className="task1">
              {/* Table - Row 1 */}
              <tr id="rowT1">
                <th className="Location">Location:</th>
                <td id="value"> 22 Fovex Avenue, Liverpool, NSW </td>

                <th className="Proximity">Proximity:</th>
                <td id="value"> 10 km</td>
              </tr>

              {/* Table - Row 2 */}
              <tr id="rowT1">
                <th className="TradeNeed">Trade Needed:</th>
                <td id="value"> Carpenter</td>

                <th className="priceSet">Set price: </th>
                <td>
                  <input
                    id="price-input"
                    type="Text"
                    placeholder="Enter Price"
                  />
                </td>
              </tr>

              {/* Table - Row 3 */}
              <tr id="rowT1">
                <th className="clientName">Client Name: </th>
                <td id="value" clientData="clientData" colSpan="2">
                  John Doe
                </td>
              </tr>

              {/* Table - Row 4 */}
              <tr id="rowT1">
                <th className="phoneNum">Client Phone Number: </th>
                <td id="value" colspan="2">
                  0488222902
                </td>
              </tr>

              {/* Table - Row 4 */}
              <tr id="rowT1">
                <th className="Descript">Description: </th>
                <td id="value" colspan="3">
                  Wood fence needs to be build in my backyard out of Pine wood
                  ...
                </td>
              </tr>
            </table>
          </div>
        )}
      </div>

      <div className="task-container">
        <div
          className="task-header"
          onClick={() => set_task3_expand(!task3_expand)}
        >
          <h3>
            <table>
              <tr className="table-header">
                <th>3</th>
                <th className="table-pad">Task description here</th>
                <th className="table-pad">Location here</th>
                <th className="table-pad">Tradie type here.</th>
              </tr>
            </table>
          </h3>
          <span className={`${task3_expand ? "open" : "closed"}`} />
        </div>
        {task3_expand && (
          <div className="task-content">
            <hr />
            {/* Table*/}
            <table className="task1">
              {/* Table - Row 1 */}
              <tr id="rowT1">
                <th className="Location">Location:</th>
                <td id="value"> 22 Fovex Avenue, Liverpool, NSW </td>

                <th className="Proximity">Proximity:</th>
                <td id="value"> 10 km</td>
              </tr>

              {/* Table - Row 2 */}
              <tr id="rowT1">
                <th className="TradeNeed">Trade Needed:</th>
                <td id="value"> Carpenter</td>

                <th className="priceSet">Set price: </th>
                <td>
                  <input
                    id="price-input"
                    type="Text"
                    placeholder="Enter Price"
                  />
                </td>
              </tr>

              {/* Table - Row 3 */}
              <tr id="rowT1">
                <th className="clientName">Client Name: </th>
                <td id="value" clientData="clientData" colSpan="2">
                  John Doe
                </td>
              </tr>

              {/* Table - Row 4 */}
              <tr id="rowT1">
                <th className="phoneNum">Client Phone Number: </th>
                <td id="value" colspan="2">
                  0488222902
                </td>
              </tr>

              {/* Table - Row 4 */}
              <tr id="rowT1">
                <th className="Descript">Description: </th>
                <td id="value" colspan="3">
                  Wood fence needs to be build in my backyard out of Pine wood
                  ...
                </td>
              </tr>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TaskSelection;
