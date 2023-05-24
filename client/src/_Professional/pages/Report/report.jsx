import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../pages/ProfessionalHeader/Header";
import ReactPDF from "react-to-print";
import { useState, useEffect } from "react";
import "./report.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


const Report = () => {
  const [rdetails,setrdetails] = useState([]);
  const cref = React.useRef(); 
  const navigate = useNavigate();

  var arequest = JSON.parse(localStorage.getItem('acceptedservreq'));
  var atradie = JSON.parse(localStorage.getItem('accepttradiedata'));

  useEffect(() => {
    const getrdetails = async () => {
      try {
        var arequest = JSON.parse(localStorage.getItem('acceptedservreq'));
        let sid = arequest.reqid;      
        const result = await Axios.get(`http://localhost:8800/professionalreport?servreqid=${sid}}`)
        console.log(result.data);
        setrdetails(result.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    getrdetails();
},[]);

  console.log(rdetails);

  
  function ClearlocalStorage() {
    localStorage.removeItem('acceptedservreq');
    localStorage.removeItem('accepttradiedata');
    navigate("/professional");
  }

  return (
    <div className="professional-report-page">
      <Header />
      <div className="table-wrapper" ref={cref}>
        <div className="professional-table">
          <tr>
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
                  <span className="table-title">Professional Number:</span>
                  <span className="table-data">
                    {localStorage.getItem('LuserId')}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Professional Name:</span>
                  <span className="table-data">
                    {localStorage.getItem('Tradie_name')}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Trade:</span>
                  <span className="table-data">
                     {atradie.tradiespecialty}
                  </span>
                </tr>
                <tr>
                  <span className="table-title">Professional Notes:</span>
                  <span className="table-data">
                     {detail.job_notes} 
                  </span>
                </tr>
              </tbody>
             ))}
            </table>
          </tr>
        </div>
        <div className="client-table">
          <table>
          {rdetails.map((detail) => (
            <tbody>
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
                <span className="table-title">Client Address:</span>
                <span className="table-data">
                     {detail.full_address} 
                </span>
              </tr>
              <tr>
                <span className="table-title">Client Phone Number:</span>
                <span className="table-data">
                     {detail.Phone_number} 
                </span>
              </tr>
              <br/>
              <br/>
              <tr>
                <span className="table-title">Commission:</span>
                <span className="table-data">
                   ${arequest.price * 0.25}
                </span>
              </tr>
            </tbody>
            ))}
          </table>
        </div>
      </div>


      <div>
          <ReactPDF
              trigger={() => (<button className="print-btn">Print</button>)}
              content={() => cref.current}
          />
      </div>
      <div>
         <button className="print-btn" onClick={ClearlocalStorage}>Finish</button>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
