import React, { useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Login(props) {

  return (
    <div className="login-form-box" style={{ background: props.color }}>
      <h1>Login</h1>
      <form onSubmit={} className="login-form">
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
      <button onClick={}>Don't have a account ?,Register</button>
    </div>
  );
}

export default Login;
