import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login-page.css";


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

  useEffect(() => {
    // Add LoginPage to the body element when mounting
    document.body.classList.add("loginPage");

    // Remove LoginPage to the body element when un-mounting
    return () => {
      document.body.classList.remove("loginPage");
    };
  }, []);

  return (
    <div className="login">
      <div className="login__container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <form>
            <label for="email">Email</label>
            <input
              className="login__input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </form>
          <form>
            <label for="password">Password</label>
            <input
              className="login__input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          <button className="login-btn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
