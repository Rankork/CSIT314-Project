import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientPage from "./pages/ClientPage";
import LoginPage from "./pages/LoginPage";
import ProfessionalPage from "./pages/ProfessionalPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/client" element={<ClientPage />} />
          <Route exact path="/professional" element={<ProfessionalPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

