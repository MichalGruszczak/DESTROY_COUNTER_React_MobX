import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

// navItems list
const navItems = [
  { to: "/", text: "Counter" },
  { to: "/achievements", text: "Achievements" },
  { to: "/shop", text: "Shop" }
];

const Navbar = () => {
  return (
    <div className="navbar">
      {navItems.map((item) => {
        return (
          <NavLink key={item.text} className="navbar__navItem" to={item.to}>
            {item.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navbar;
