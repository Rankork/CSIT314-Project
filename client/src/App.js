import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Students from "./pages/Students";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Students />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
