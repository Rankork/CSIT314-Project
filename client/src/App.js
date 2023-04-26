import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClientPage, LoginPage, ProfessionalPage, MembershipPage, Register } from "./pages"; //goes to index.js in './pages'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/client" element={<ClientPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/professional" element={<ProfessionalPage />} />
          <Route exact path="/client/member" element={<MembershipPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
