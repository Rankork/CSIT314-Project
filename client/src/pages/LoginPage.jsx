import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO : UPDATE LOGIC
    // SQL query to check email and passwords will go here !
    const isClient = true;
    if (isClient) {
      navigate("/client");
    } else {
      navigate("/professional");
    }
  };

  return (
    <div className="loginpage">
      <h1 class="loginpage__title">Login Page</h1>

      <form onSubmit={handleSubmit}>
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
