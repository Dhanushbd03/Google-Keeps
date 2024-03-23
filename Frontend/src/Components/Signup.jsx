import React, { useState } from "react";
import Login from "./LLogin";
import Register from "./Register";
function Signup(props) {
  const isloggedin = props.setIsloggedin;
  const [isreg, setreg] = useState(false);

  return isreg ? (
    <Login
      isloggedin={isloggedin}
      setreg={setreg}
      setuserid={props.setuserid}
      color={props.color}
    />
  ) : (
    <Register isloggedin={isloggedin} setreg={setreg} color={props.color} />
  );
}

export default Signup;
