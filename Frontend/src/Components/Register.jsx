import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Register(props) {
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

        props.isloggedin(true);
      } else {
        setMessage(response.data.error);
        setColor("red");
        setemailreg("");
        setpasswordreg("");
        setfullname("");
      }
    } catch (err) {
      console.log(err);
      // Use err.response.data.error instead of response.data.error
      setColor("red");
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  return (
    <div className="login-form-box" style={{ background: props.color }}>
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
        <button type="submit" style={{ background: props.color }}>
          Register
        </button>
        <p style={{ color: color }}>{message}</p>
      </form>

      <button
        onClick={() => {
          props.setreg(true);
        }}
      >
        Already have an account? login
      </button>
    </div>
  );
}

export default Register;
