import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Global Pages
import LoginPage from "./Components/LoginPage/LoginPage";
//Client Pages
import ClientHome from "./_Client/pages/Home/home";
import ClientMember from "./_Client/pages/Membership/membership";
import TaskAllocation from "./_Client/pages/TaskAllocation/taskallocatoin";
import TaskSelection from "./_Client/pages/TaskSelection/taskselection";
// Professional Pages
import ProfessionalHome from "./_Professional/pages/Home/home";
import ProfessionalMember from "./_Professional/pages/Membership/membership";

const Routing = () => {
  return (
    <Router>
      <Routes>
        {/*global routes*/}
        <Route exact path="/" element={<LoginPage />} />

        {/*client routes*/}
        <Route exact path="/client" element={<ClientHome />} />
        <Route exact path="/client/membership" element={<ClientMember />} />
        <Route
          exact
          path="/client/task-allocation"
          element={<TaskAllocation />}
        />

        <Route
          exact
          path="/client/task-selection"
          element={<TaskSelection />}
        />

        {/*professional routes*/}
        <Route exact path="/professional" element={<ProfessionalHome />} />
        <Route
          exact
          path="/professional/membership"
          element={<ProfessionalMember />}
        />
      </Routes>
    </Router>
  );
};

export default Routing;
