import React from "react";
import Header from "../ClientHeader/Header";
import Footer from "../../../Components/Footer/Footer";
import "./taskallocation.css";

const TaskAllocation = () => {
  return (
    <div className="task-allocation">
      <Header />
      <div className="add-task-container">
        <div className="add-task-title">
          <h1>Add Task</h1>
        </div>

        <div className="task-information">
          <form>
            {/*Task title input*/}
            <label for="task-title: ">Title of task</label>
            <input
              id="task-title"
              type="text"
              name="task-title"
              placeholder="Enter title of task here..."
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
            ></textarea>

            {/*Task tradie selection*/}
            <label for="select-tradie: ">Type of Tradie Required:</label>
            <select id="select-tradie">
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
            </table>
        </div>
      </div>
      <div className="task-next-page-btn-container">
        <form action="/client/task-selection">
          <input
            className="task-next-page-btn"
            type="submit"
            value="Next Page"
          />
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default TaskAllocation;