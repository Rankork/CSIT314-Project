import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../pages/ProfessionalHeader/Header";
import "./report.css";

const Report = () => {
  return (
    <div className="professional-report-page">
      <Header />
      <div className="table-wrapper">
        <div className="client-table">
          <table>
            <tbody>
              <tr>
                <span className="table-title">Client Number:</span>
                <span className="table-data">
                  #1234 {/*TODO: replace with SQL*/}
                </span>
              </tr>
              <tr>
                <span className="table-title">Client Name:</span>
                <span className="table-data">
                  Joe Doe {/*TODO: replace with SQL*/}
                </span>
              </tr>
              <tr>
                <span className="table-title">Address:</span>
                <span className="table-data">
                  100 road, somewhere {/*TODO: replace with SQL*/}
                </span>
              </tr>
              <tr>
                <span className="table-title">Phone Number:</span>
                <span className="table-data">
                  041000000 Joe Doe {/*TODO: replace with SQL*/}
                </span>
              </tr>
              <tr>
                <span className="table-title">Task:</span>
                <span className="table-data">
                  Some task {/*TODO: replace with SQL*/}
                </span>
              </tr>
              <tr>
                <span className="table-title">Task Description:</span>
                <span className="table-data">
                  This is the description of the task, ect, ect, ect...{" "}
                  {/*TODO: replace with SQL*/}
                </span>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="professional-table">
          <tr>
            <table>
              <tbody>
                <tr>
                  <span className="table-title">Professional Number:</span>
                  <span className="table-data">
                    #1234 {/*TODO: replace with SQL*/}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Professional Name:</span>
                  <span className="table-data">
                    Joe Doe {/*TODO: replace with SQL*/}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Trade:</span>
                  <span className="table-data">
                    100 road, somewhere {/*TODO: replace with SQL*/}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Phone Number:</span>
                  <span className="table-data">
                    041000000 Joe Doe {/*TODO: replace with SQL*/}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Fee:</span>
                  <span className="table-data">
                    Some task {/*TODO: replace with SQL*/}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Professional Notes:</span>
                  <span className="table-data">
                    This is the description of the task, ect, ect, ect...{" "}
                    {/*TODO: replace with SQL*/}
                  </span>
                </tr>
              </tbody>
            </table>
          </tr>
        </div>
      </div>

      <div className="print-btn">
        <form action="">
          <input className="print-btn" type="submit" value="Print" />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
