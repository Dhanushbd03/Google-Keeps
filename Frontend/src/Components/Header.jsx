import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import Profile from "./Profile";
function Header(props) {
  return (
    <header>
      {props.isloggedin ? <MenuIcon /> : null}
      <img src="/images/keeps.png" alt="" />
      <h1>Keeper</h1>
      {props.isloggedin ? <Search /> : null}
      {props.isloggedin ? <Profile /> : null}
    </header>
  );
}
export default Header;
