// Header.jsx
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import Profile from "./Profile";

function Header(props) {
  const { isloggedin, setIsloggedin } = props; // Destructure isloggedin and setIsloggedin

  return (
    <header style={{ backgroundColor: props.color }}>
      <img src="/images/keeps.png" alt="" />
      <h1>Keeper</h1>
      {isloggedin ? <Search /> : null}
      {isloggedin ? (
        <Profile setIsloggedin={setIsloggedin} color={props.color} />
      ) : null}
    </header>
  );
}

export default Header;
