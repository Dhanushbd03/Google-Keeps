import React, { useState } from "react";
import Axios from "axios";
function Register() {
  const [emailreg, setemailreg] = useState("");
  const [passwordreg, setpasswordreg] = useState("");
  const [fullname, setfullname] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("red");

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3000/register", {
        email: emailreg,
        password: passwordreg,
        fullname: fullname,
      });
      if (response.data.success) {
        setMessage("Registration successful");
        setColor("green");
        setemailreg("");
        setpasswordreg("");
        setfullname("");
      } else {
        setMessage(response.data.error);
        setColor("red");
        console.log(response.data.error);
      }
    } catch (err) {
      setMessage(err.response.data.error); // Use err.response.data.error instead of response.data.error
      setColor("red");
      console.log(err);
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  return (
    <div className="login-form-box">
      <h1>Register</h1>
      <form onSubmit={register} className="login-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => {
            setfullname(e.target.value);
          }}
          name="name"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={emailreg}
          onChange={(e) => {
            setemailreg(e.target.value);
          }}
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={passwordreg}
          onChange={(e) => {
            setpasswordreg(e.target.value);
          }}
          name="password"
          required
        />
        <button type="submit">Register</button>
        <p style={{ color: color }}>{message}</p>
      </form>
      <button>Already have an account? login</button>
    </div>
  );
}

export default Register;
