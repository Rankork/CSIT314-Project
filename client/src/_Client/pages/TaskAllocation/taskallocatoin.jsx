import React from "react";
import Header from "../../../Components/Header/Header";
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
              name="task-description"
              placeholder="Enter description of your task here..."
            ></textarea>

            {/*Task tradie selection*/}
            <label for="select-tradie: ">Type of Tradie Required:</label>
            <select id="select-tradie">
              <option value="electrician">Electrician</option>
              <option value="plumber">Plumber</option>
              <option value="carpenter">Carpenter</option>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaskAllocation;
