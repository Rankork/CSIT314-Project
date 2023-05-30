import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Global Pages
import LoginPage from "./Components/LoginPage/LoginPage";
import Register from "./Components/Register/Register";
//Client Pages
import ClientHome from "./_Client/pages/Home/home";
import ClientMember from "./_Client/pages/Membership/membership";
import TaskAllocation from "./_Client/pages/TaskAllocation/taskallocation";
import TaskSelection from "./_Client/pages/TaskSelection/taskselection";
import PaymentPage from "./_Client/pages/Payment/payment";
import ClientRating from "./_Client/pages/Rating/rating";
import ClientReport from "./_Client/pages/Report/report";
// Professional Pages
import ProfessionalHome from "./_Professional/pages/Home/home";
import ProfessionalMember from "./_Professional/pages/Membership/membership";
import ProfessionalTaskSelection from "./_Professional/pages/TaskSelection/taskselection";
import ProfessionalRating from "./_Professional/pages/Rating/rating";
import ProfessionalReport from "./_Professional/pages/Report/report";

// This handles all the routing for webpages in the project
const Routing = () => {
  return (
    <Router>
      <Routes>
        {/*global routes*/}
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />

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
        <Route exact path="/client/payment" element={<PaymentPage />} />
        <Route exact path="/client/rating" element={<ClientRating />} />
        <Route exact path="/client/report" element={<ClientReport />} />
        {/*professional routes*/}
        <Route exact path="/professional" element={<ProfessionalHome />} />
        <Route
          exact
          path="/professional/membership"
          element={<ProfessionalMember />}
        />
        <Route
          exact
          path="/professional/task-selection"
          element={<ProfessionalTaskSelection />}
        />
        <Route
          exact
          path="/professional/rating"
          element={<ProfessionalRating />}
        />
        <Route
          exact
          path="/professional/report"
          element={<ProfessionalReport />}
        />
      </Routes>
    </Router>
  );
};

export default Routing;
