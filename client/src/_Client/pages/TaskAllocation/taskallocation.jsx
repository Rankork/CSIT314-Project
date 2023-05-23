import React from "react";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import "./taskallocation.css";
import Axios from "axios"

const TaskAllocation = () => {
   // set input field here
   const [task, settask] = useState("");
   const [task_description, settaskdesc] = useState("");
   const [specialty, setSpecialty] = useState("");
   const [servicerequests,setservicerequest] = useState([]);

   console.log(localStorage.getItem('LuserId'));

   useEffect(() => {
      const getrequests = async () => {
        try {
           const userId = localStorage.getItem('LuserId');
           const result = await Axios.get(`http://localhost:8800/servreq/${userId}`)
           setservicerequest(result.data);
        }
        catch (err) {
          console.log(err);
        }
      };
      getrequests();
   },[]);

   console.log(servicerequests);

   const estimatedPrice = (specialty) => {
     if (specialty == "Electrician") {
        return '$150-300';
     }
     else if (specialty == "Landscaper") {
        return '$180-330';
     }
     else if (specialty == "Plumber") {
        return '$130-270';
     }
     else if (specialty == "Carpenter") {
        return '$100-200';
     }
     else if (specialty == "Pest Control") {
        return '$125-250';
     }
     else if (specialty == "General Repair") {
        return '$200-350';
     }

   }

   // For debugging purposes
   // console.log(localStorage.getItem('userId'))
   const handleSelectChange = (event) => {
    setSpecialty(event.target.value);
   };

   const handletaskSubmit = (event) => {

    event.preventDefault(); 

    // set input validation here
  
    if(task.trim().length == 0 || task_description.trim().length == 0 || specialty == "Choose Specialty") // need to fix this
    {
       alert("One or more field does not meet criteria or unfilled"); 
    }
    else
    {
      // handle insert with axios
      Axios.post("http://localhost:8800/service_requests", {
        // set relevant data here
        task: task,
        task_description: task_description,
        specialty: specialty,
        userId: localStorage.getItem('LuserId')
      })
      .then((response) => {
        console.log(response);
        alert("Data Inserted Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Insert Failed");
      });

      settask('');
      setSpecialty('Choose Specialty');
      settaskdesc('');
      
    }
  };

  return (
    <div className="task-allocation">
      <Header />
      <div className="add-task-container">
        <div className="add-task-title">
          <h1>Add Task</h1>
        </div>

        <div className="task-information">
          <form onSubmit={handletaskSubmit}>
            {/*Task title input*/}
            <label for="task-title: ">Title of task</label>
            <input
              id="task-title"
              type="text"
              name="task-title"
              placeholder="Enter title of task here..."
              value={task} 
              onChange={(event) => settask(event.target.value)}
            ></input>

            {/*Task description input*/}
            <label for="task-description: ">Task Description</label>
            <textarea
              id="task-description"
              type="textarea"
              rows="10"
              cols="40"
              name="task-description"
              placeholder="Enter description of your task here..."
              value={task_description}
              onChange={(event) => settaskdesc(event.target.value)}
            ></textarea>

            {/*Task tradie selection*/}
            <label for="select-tradie: ">Type of Tradie Required:</label>
            <select id="select-tradie" onChange={handleSelectChange} value={specialty}>
              <option value="Choose Specialty">Choose Specialty</option> {/*Should we do ---------------*/}
              <option value="Electrician">Electrician</option>
              <option value="Landscaper">Landscaper</option>
              <option value="Plumber">Plumber</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Pest Control">Pest Control</option>
              <option value="General Repair">General Repair</option>
            </select>

            {/*Submit task button*/}
            <button className="task-submit-button" type="submit">
              Add task
            </button>
          </form>
        </div>
      </div>

      <div className="task-list-container">
        <div className="task-list-title">
          <h1>Task List</h1>
          {/*TODO: Need to map task list */}
             <table>
                <thead>
                  <tr className="heading">
                      <th>Task #</th>
                      <th>Title</th>
                      <th>Estimated price</th>
                  </tr>
                </thead>
                <tbody>
                  {servicerequests.map((request, index) => (
                    <tr key={request.sid}>
                      <td>{index + 1}</td>
                      <td>{request.request}</td>
                      <td>{estimatedPrice(request.specialty)}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TaskAllocation;
