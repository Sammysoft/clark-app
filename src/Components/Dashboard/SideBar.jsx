/* eslint-disable */

import React from "react";
import Nav from "./Nav";
import NavList from "./NavList";

const SideBar = ({ route, setRoute }) => {
  return (
    <>
      <div
        id="nav"
        class="nav-container d-flex"
        style={{ backgroundColor: "#1ea8e7" }}
      >
        <div class="nav-content d-flex">
          <Nav />
          <NavList route={route} setRoute={setRoute}/>
          <div class="mobile-buttons-container">
            <a href="#" id="mobileMenuButton" class="menu-button">
              <i data-acorn-icon="menu"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="nav-shadow"></div>
    </>
  );
};

export default SideBar;
