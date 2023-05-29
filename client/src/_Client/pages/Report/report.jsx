import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../pages/ClientHeader/Header";
import ReactPDF from "react-to-print";
import { useState, useEffect, useRef } from "react";
import "./report.css";
import Axios from "axios";

const Report = () => {
  const [rdetails,setrdetails] = useState([]);
  const creportcontent = useRef(); 

  var arequest = JSON.parse(localStorage.getItem('acceptedservreq'));
  var atradie = JSON.parse(localStorage.getItem('accepttradiedata'));

  useEffect(() => {
    const getlocationdetails = async () => {
      try {
        var arequest = JSON.parse(localStorage.getItem('acceptedservreq'));
        let sid = arequest.reqid;      
        const result = await Axios.get(`http://localhost:8800/clientreport?servreqid=${sid}}`)
        console.log(result.data);
        setrdetails(result.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    getlocationdetails();
},[]);

  console.log(rdetails);

  return (
    <div className="client-report-page">
      <Header />
      <div className="table-wrapper" ref={creportcontent}>
        <div className="client-table">
          <table>
           {rdetails.map((detail) => (
            <tbody>
              <tr>
                  <span className="table-title">Service Request ID:</span> 
                  <span className="table-data">
                      {arequest.reqid}
                  </span>
                </tr>
                <br/>
                <br/>
              <tr>
                <span className="table-title">Client Number:</span>
                <span className="table-data">
                  {detail.Id}
                </span>
              </tr>
              <tr>
                <span className="table-title">Client Name:</span>
                <span className="table-data">
                   {detail.name}
                </span>
              </tr>
              <tr>
                <span className="table-title">Address:</span>
                <span className="table-data">
                   {detail.full_address}
                </span>
              </tr>
              <tr>
                <span className="table-title">Phone Number:</span>
                <span className="table-data">
                   {detail.Phone_number}
                </span>
              </tr>
              <tr>
                <span className="table-title">Task:</span>
                <span className="table-data">
                   {detail.request}
                </span>
              </tr>
              <tr>
                <span className="table-title">Task Description:</span>
                <span className="table-data">
                  {detail.request_desc}
                </span>
              </tr>
            </tbody>
           ))}
          </table>
        </div>

        <div className="professional-table">
          <tr>
            <table>
              <tbody>
                <tr>
                  <span className="table-title">Professional Name:</span>
                  <span className="table-data">
                    {atradie.tradiename}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Trade:</span>
                  <span className="table-data">
                    {atradie.tradiespecialty}
                  </span> 
                </tr>
                <tr>
                  <span className="table-title">Service Fee:</span>
                  <span className="table-data">
                    ${arequest.price}
                  </span>
                </tr>
              </tbody>
            </table>
          </tr>
        </div>
      </div>

      <div>
      <ReactPDF
          trigger={() => <button className="print-btn">Print</button>}
          content={() => creportcontent.current}
      />
      </div>
      <Footer />
    </div>
  );
};

export default Report;