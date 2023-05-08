import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Global Pages
import LoginPage from "./Components/LoginPage/LoginPage";
//Client Pages
import ClientHome from "./_Client/pages/Home/home";
import ClientMember from "./_Client/pages/Membership/membership";
import TaskAllocation from "./_Client/pages/TaskAllocation/taskallocatoin";
import TaskSelection from "./_Client/pages/TaskSelection/taskselection";
import ClientRating from "./_Client/pages/Rating/rating";
//TODO : import ClientReport from "./_Client/pages/Report/report";
// Professional Pages
import ProfessionalHome from "./_Professional/pages/Home/home";
import ProfessionalMember from "./_Professional/pages/Membership/membership";
//TODO : import ProfessionalTaskSelection form "./_Professional/pages/TaskSelection/taskselection";
//TODO : import ProfessionalRating from "./_Professional/pages/Rating/rating";
//TODO : import ProfessionalReport from "./_Professional/pages/Report/report";
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
        <Route exact path="/client/rating" element={<ClientRating />} />
        {/*TODO : <Route exact path ="/client/report" element={<ClientReport/>}>*/}
        {/*professional routes*/}
        <Route exact path="/professional" element={<ProfessionalHome />} />
        <Route
          exact
          path="/professional/membership"
          element={<ProfessionalMember />}
        />
        {/*TODO : <Route exact path ="/professional/task-selection" element={<ProfessionalTaskSelection/>}>*/}
        {/*TODO : <Route exact path="/professional/rating" element={<ProfessionalTaskSelection />} />*/}
        {/*TODO : <Route exact path="/professional/report" element={<ProfessionalReport/>} />*/}
      </Routes>
    </Router>
  );
};

export default Routing;
