import React from "react"
import { useNavigate } from "react-router-dom"

const ProfessionalPage = () => {
    const navigate = useNavigate();
    const handleUserLogout = (e) => {
    try
    {
      fetch("/api/logout", {
        method: 'POST',
        credentials: 'include' 
      });
      navigate("/")
    }
    catch(error)
    {
      console.error('Error on Logout', error)
    }
  }

  return (
    <div>
      <h1>Welcome, Professional</h1>
      <br></br>
      <button onClick={handleUserLogout}>Logout</button>
    </div>
  );
};

export default ProfessionalPage;