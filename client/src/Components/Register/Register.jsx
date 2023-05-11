import { useState, useEffect } from "react";
import Axios from "axios";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmpassword, setcfmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleSelectionChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const regexphone = /^[0-9]{9}$/;

    if (password != cfmpassword) {
      alert("Password mismatch");
    }
    if (email.trim().length == 0) {
      alert("Email required");
    }
    if (!regexphone.test(phonenumber)) {
      alert("Phone number must be 9 digits");
    }
    if (firstname.trim().length == 0) {
      alert("First Name required");
    }
    if (lastname.trim().length == 0) {
      alert("Last Name required");
    } else {
      Axios.post("http://localhost:8800/users/new", {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
      })
        .then((response) => {
          console.log(response);
          alert("Data Inserted Successfully");
        })
        .catch((error) => {
          console.log(error);
          alert("Insert Failed");
        });
    }
  };

  useEffect(() => {
    // Add LoginPage to the body element when mounting
    document.body.classList.add("RegisterPage");

    // Remove LoginPage to the body element when un-mounting
    return () => {
      document.body.classList.remove("RegisterPage");
    };
  }, []);

  return (
    <div className="register">
      <div className="register__container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <form>
            <label for="First_Name">First Name</label>
            <input
              className="register__input"
              type="text"
              placeholder="Brandon"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </form>
          <form>
            <label for="Last_Name">Last Name</label>
            <input
              className="register__input"
              type="text"
              placeholder="BaleWood"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
          </form>
          <form>
            <label for="email">Email</label>
            <input
              className="register__input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </form>
          <form>
            <label for="phonenumber">Phone Number</label>
            <input
              className="register__input"
              type="number"
              placeholder="895458657"
              value={phonenumber}
              onChange={(event) => setPhonenumber(event.target.value)}
            />
          </form>
          <form>
            <label for="password">Password</label>
            <input
              className="register__input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          <form>
            <label for="cfm_password">Confirm Password</label>
            <input
              className="register__input"
              type="password"
              placeholder="Enter password"
              value={cfmpassword}
              onChange={(event) => setcfmPassword(event.target.value)}
            />
          </form>
          <form id="radbutton">
            <label for="Acc_Type">Account Type</label>
            <br />
            <br />
            <select
              id="AccountType"
              name="AccountType"
              onChange={handleSelectionChange}
              value={accountType}
            >
              {/*Do we want this? Professionals might be unqualified and frauds in the system*/}
              <option value="Client">Client</option>
              <option value="Professional">Professional</option>
            </select>
          </form>
          <button className="register-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
