import React from "react";
import logo from "../../componentpic/company-logo-telestream-press-kit-12.png";
import "./Navbar.css";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src={logo} alt="logo" className="company-logo" />
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">contact us</a>
          <a href="#">About Us</a>
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              alt="Semy Sharp"
              src="/broken-image.jpg"
            />
          <a href="#">logout</a>
        </div>
      </div>
    </>
  );
};
export default Navbar;
