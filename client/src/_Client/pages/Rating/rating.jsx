import React from "react";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import "./rating.css";
import Axios from "axios";
import { FaStar } from "react-icons/fa";

const fillstars = {
  yellow : "#FFEA00",
  grey : "#E5E4E2"
};

    {/*To think: local storage or MySQL

    useEffect(() => {
    const gettradie = async () => {
      try {
        // handle data retrieval here
      }
      catch (err) {
        console.log(err);
      }
    };
    getrdetails();
    },[]);

  */}

const Rating = () => {
  const [feedback,setfeedback] =  useState("");
  const [rating, setrating] = useState(0);
  const [mouseoverVal, setmouseoverVal] = useState(undefined);
  const ratingstar = Array(5).fill(0);

  var tradie = JSON.parse(localStorage.getItem('accepttradiedata'));

  let professionalname = tradie.tradiename;
  let trad = tradie.tradiespecialty;

  var arequest = JSON.parse(localStorage.getItem('acceptedservreq'));
  let sid = arequest.reqid;

  const fillstarClick = (value) => {
    setrating(value);
  };

  const mouseoverPreview = (previewVal) => {
    setmouseoverVal(previewVal);
  };

  const mouseexit = () => {
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
      Axios.post("http://localhost:8800/clientratestradie", {
         feedback: feedback,
         rating: rating,
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
    }
  }

  return (
    <div className="client-rating">
      <Header />
      <h1>Rating Page</h1>
      <Footer />
      <div className="client-rating-table">
        <table>
          <tbody>
            <tr>
              <td>Professional Name : {professionalname}</td>
            </tr>
            <tr>
              <td>Trade : {trad}</td>
            </tr>
            <td>Rating:</td>
            <tr>
              <div className="five-start-rating">
              {ratingstar.map((_, index) => {
                  return (
                  <FaStar
                      key={index}
                      size={24}
                      onClick={() => fillstarClick(index + 1)}
                      onMouseOver={() => mouseoverPreview(index + 1)}
                      onMouseLeave={mouseexit}
                      color={(mouseoverVal || rating) > index ? fillstars.yellow : fillstars.grey}
                    />
                  )
                })}
              </div>
            </tr>
            <tr>
              <td>
                <label for="feed-back-textarea">FeedBack</label>
                <br />
                <textarea
                  name="feed-back-textarea"
                  id="feed-back-textarea"
                  type="textarea"
                  rows="10"
                  cols="150"
                  placeholder="Enter feed back here..."
                  value={feedback}
                  onChange={(event) => setfeedback(event.target.value)}
                ></textarea>
              </td>
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
