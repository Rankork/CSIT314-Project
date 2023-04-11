//import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [users, setUser] = useState([])
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    // TODO : UPDATE LOGIC
    // SQL query to check email and passwords will go here !
    Axios.post("http://localhost:8800/users", {
        email: email,
        password: password,
      }).then((response) => {
         //--------- FOR DEBUG PURPOSES -------------
         //console.log(response)
         //console.log(response.data)
         //console.log(response.data[0].AccountType)

         //---- LOGIC ----------------
         if(response.data[0].AccountType == "Client")
         {
             navigate("/client")
         }
         else if(response.data[0].AccountType == "Professional")
         {
             navigate("/professional")
         }
         else
         {
             alert("Fatal Error")
         }
      })
  };

  return (
    <div className="loginpage">
      <h1 className="loginpage__title">Login Page</h1>

      <form onSubmit={handleLoginSubmit}>
        <div className="loginpage__email-container">
          <h3 className="loginpage__email-header">Email</h3>
          <input
            type="email"
            id="loginpage__email-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="loginpage__password-container">
          <h3 className="loginpage__password-header">Password</h3>
          <input
            type="password"
            id="loginage__password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="loginpage__login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
