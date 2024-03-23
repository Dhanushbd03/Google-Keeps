import React, { useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Login(props) {
  const [emaillog, setemail] = useState("");
  const [passwordlog, setpassword] = useState("");
  const [message, setMessage] = useState("");
  const color = "red";

  const noacc = () => {
    props.setreg(false);
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3000/login", {
        email: emaillog,
        password: passwordlog,
      });
      console.log(response.data);
      if (response.data.success) {
        props.isloggedin(true);
      } else {
        setMessage(response.data.error);
        setColor("red");
      }
    } catch (err) {
      setMessage(err.response.data.error);
    }
  };
  setTimeout(() => {
    setMessage("");
  }, 3000);

  return (
    <div className="login-form-box" style={{ background: props.color }}>
      <h1>Login</h1>
      <form onSubmit={login} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={emaillog}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={passwordlog}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          name="password"
          required
        />
        <button style={{ background: props.color }}>Login</button>
      </form>
      <p style={{ color: color }}>{message}</p>
      <button onClick={noacc}>Don't have a account ?,Register</button>
    </div>
  );
}

export default Login;
