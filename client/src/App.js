import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Routing from "./Routing.js"; // TODO : fin routing

import LoginPage from "./Components/LoginPage/LoginPage";

import ClientHome from "./_Client/pages/Home/home";
import ClientMember from "./_Client/pages/Membership/membership";

import ProfessionalHome from "./_Professional/pages/Home/home";
import ProfessionalMember from "./_Professional/pages/Membership/membership";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />

          {/*client routes*/}
          <Route exact path="/client" element={<ClientHome />} />
          <Route exact path="/client/membership" element={<ClientMember />} />

          {/*professional routes*/}
          <Route exact path="/professional" element={<ProfessionalHome />} />
          <Route
            exact
            path="/professional/membership"
            element={<ProfessionalMember />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
