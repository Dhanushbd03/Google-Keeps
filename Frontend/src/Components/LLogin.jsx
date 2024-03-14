import React, { useState } from "react";

function Login() {
  const [emaillog, setemail] = useState("");
  const [passwordlog, setpassword] = useState("");
  const login = async () => {
    try {
      const response = await Axios.post("http://localhost:3000/login", {
        email: emaillog,
        password: passwordlog,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-form-box">
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
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={passwordlog}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          name="password"
        />
        <button>Login</button>
      </form>
      <button>Don't have a account ?,Register</button>
    </div>
  );
}

export default Login;
