// Header.jsx
import React from "react";

import Search from "./Search";
import Login from "./Login";

function Header(props) {
  return (
    <header style={{ backgroundColor: props.color }}>
      <div style={{ display: "flex" }}>
        <img src="/images/keeps.png" alt="" />
        <h1>Keeper</h1>
      </div>
      <Search />
      <Login color={props.color} handleuser={props.handleuser} />
    </header>
  );
}

export default Header;
