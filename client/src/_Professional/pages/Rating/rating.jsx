import React from "react";
import Header from "../ProfessionalHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import "./rating.css";
import Axios from "axios";
import { FaStar } from "react-icons/fa";

const fillstars = {
  yellow : "#FFEA00",
  grey : "#E5E4E2"
};

const Rating = () => {
  const [feedback,setfeedback] = useState("");
  const [jobnotes,setjobnotes] = useState("")
  const [rating, setrating] = useState(0);
  const [mouseoverVal, setmouseoverVal] = useState(undefined);
  const ratingstar = Array(5).fill(0);

  var tradie = JSON.parse(localStorage.getItem('accepttradiedata'));
  var arequest = JSON.parse(localStorage.getItem('acceptedservreq'));
  let sid = arequest.reqid;

  function fillstarClick(value)
  {
    setrating(value);
  };

  function mouseoverPreview(previewVal)
  {
    setmouseoverVal(previewVal);
  };

  function mouseexit() 
  {
    setmouseoverVal(undefined);
  };

  console.log(rating);

  const handlefeedbacksubmit = (event) => {
    event.preventDefault();
    if(feedback.trim().length == 0 || rating == 0)
    {
      alert("One or more field does not meet criteria or unfilled");
    }
    else
    {
      // handle insert with axios
      Axios.post("http://localhost:8800/tradieratesclient", {
         feedback: feedback,
         rating: rating,
         jobnotes: jobnotes,
         sid: sid,
      })
      .then((response) => {
        console.log(response);
        alert("Data Inserted Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Insert Failed");
      });

      setrating(0);
      setfeedback('');
      setjobnotes('');
    }
  }

  console.log(rating);

  return (
    <div className="professional-rating">
      <Header />
      <h1>Rating Page</h1>
      <Footer />
      <div className="professional-rating-table">
        <table>
          <tbody>
            <tr>
              <td>Client Name: {tradie.client_name}</td>
            </tr>
            <td>Rating:</td>
            <tr>
              <div className="five-start-rating">
                {/*TODO: develop interactive 5 star rating system */}
                {ratingstar.map((_,index) => {
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      color={(mouseoverVal || rating) > index ? fillstars.yellow : fillstars.grey}
                      onClick={() => fillstarClick(index + 1)}
                      onMouseOver={() => mouseoverPreview(index + 1)}
                      onMouseLeave={mouseexit}
                    />
                  )
                })}
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
                    value={feedback}
                    onChange={(event) => setfeedback(event.target.value)}
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
                    value={jobnotes}
                    onChange={(event) => setjobnotes(event.target.value)}
                  ></textarea>
                </td>
              </tr>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rating-NextPage-btn-container">
        <form onSubmit={handlefeedbacksubmit}>
          <input
            className="rating-NextPage-btn"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Rating;
