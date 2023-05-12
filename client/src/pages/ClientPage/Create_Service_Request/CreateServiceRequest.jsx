import React from "react";
import "./csr.css";
import { useState } from "react";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import Axios from "axios"

const CreateServiceRequest = () => {
  // set input field here
  const [task, settask] = useState("");
  const [task_description, settaskdesc] = useState("");
  const [specialty, setSpecialty] = useState("");

  // For debugging purposes
  // console.log(localStorage.getItem('userId'))
  const handleSelectionChange = (event) => {
    setSpecialty(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault(); 

    // set input validation here
  
    if(true)
    {
       alert("Card number is invalid");
    }
    else
    {
      // handle insert with axios
      Axios.post("http://localhost:8800/moredetails", {
        // set relevant data here
        userId: localStorage.getItem('userId')
      })
      .then((response) => {
        console.log(response);
        alert("Data Inserted Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Insert Failed");
      });
    }
  };

  return (
    <div>
      {/* Div for whole Page*/}
      <div className="page">

        {/* Div for header */}
        <div>
          <Header/>
        </div>
      
      {/* Div for body of page */}
      <div className="Client">
          {/* Div for Enter Details */}
          <table className="center">
              <th className="enterDetails">
                <div className="enter_task_deets">
                  <h3 className="title">Create Service Request:</h3>

                  {/* Form for Enter Details */}
                  <form id="enter_deets" name="enter_deets">

                      {/* Enter Address */}
                      <label for="task" className="label2">Task: </label> <br/>
                      <input type="text" id="address" name="task" placeholder="Enter Task" value={task} onChange={(event) => settask(event.target.value)}/><br/>

                      {/* Enter Suburb */}
                      <label for="task description" className="label2">Task Description: </label> 
                      <br/>
                      <br/> 
                      <textarea type="text" rows="5" cols="50" id="suburb" name="suburb" placeholder="Enter Task Description" value={task_description} onChange={(event) => settaskdesc(event.target.value)}/><br/>

                  </form>
                  </div>
              </th>

               {/* Div for Select Membership Type */}
              <th>
                <tr className="selectMemberType">
                    <div className="specialty">

                      <h3 className="title">Type of Tradie Required:</h3>
                      <form id="memberType" name="memberType">

                        <div className="radbut">
                          <input type="radio" id="memberSub" name="membershipType" value="Electrician" onChange={handleSelectionChange}/>
                          <label for="Electrician"> Electrician</label> 
                        </div>

                        <br/>

                        <div className="radbut">
                          <input type="radio" id="payOnDemand" name="membershipType" value="Landscaper" onChange={handleSelectionChange}/>
                          <label for="Landscaper" className="memLabel"> Landscaper</label>
                        </div>

                        <br/>

                        <div className="radbut">
                          <input type="radio" id="payOnDemand" name="membershipType" value="Plumber" onChange={handleSelectionChange}/>
                          <label for="Plumber" className="memLabel"> Plumber</label>
                        </div>

                        <br/>

                        <div className="radbut">
                          <input type="radio" id="payOnDemand" name="membershipType" value="Carpenter" onChange={handleSelectionChange}/>
                          <label for="Carpenter" className="memLabel"> Carpenter</label>
                        </div>

                      </form>
                    </div>
                    <br/>
                  </tr>

                   {/* Submit Button */}
                  <tr>
                      <div className="Button">
                        <form onSubmit={handleSubmit}> {/* The end one with the type=submit is where you handle submit*/}
                          <input className="submitButton" type="submit" value="Add Task"/>  {/*Next Page*/}
                        </form>
                      </div>
                  </tr>

              </th>
          </table>
      </div>

      {/* Div for fotter*/}
      <div className="Footer">
            <Footer/>
        </div>

      </div>
    </div>
  );
};

export default CreateServiceRequest;