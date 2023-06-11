import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <>
      {["today", "this week"].map((item, index) => {
        return (
          <div className="link-container" key={index.toString()}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "active link" : "link";
              }}
              to={
                item == "today"
                  ? "/dashboard/"
                  : item == "this week"
                  ? "weekly"
                  : ""
              }
            >
              <h5 className="link-text">{item}</h5>
            </NavLink>
          </div>
        );
      })}
    </>
  );
};

export default NavLinks;
