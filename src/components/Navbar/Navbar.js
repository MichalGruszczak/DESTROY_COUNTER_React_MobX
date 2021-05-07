import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

// navItems list
const navItems = [
  { to: "/counter", text: "Counter", exact: true },
  { to: "/supplies", text: "Supplies", exact: false },
  { to: "/achievements", text: "Achievements", exact: false },
  { to: "/shop", text: "Shop", exact: false }
];

const Navbar = () => {
  return (
    <div className="navbar">
      {navItems.map((item) => {
        return (
          <NavLink className="navbar__navItem" to={item.to} exact={item.exact}>
            {item.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navbar;
