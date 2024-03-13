import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import Profile from "./Profile";
function Header() {
  return (
    <header>
      <MenuIcon />
      <img src="/images/keeps.png" alt="" />
      <h1>Keeper</h1>
      <Search />
      <Profile />
    </header>
  );
}
export default Header;
