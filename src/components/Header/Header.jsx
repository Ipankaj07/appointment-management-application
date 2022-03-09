import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div className="container container_header">
          <div className="nav-div">
            <Link to="/">
              <img
                src="https://s3-symbol-logo.tradingview.com/apollo-hospitals--big.svg"
                alt=".."
              />
            </Link>
            <div className="btn-gap">
              <Link to="/clinic">Clinic</Link>
              <Link to="/">History</Link>
              <Link to="/">Login</Link>
              <Link to="/">SignUp</Link>
            </div>
          </div>
        </div>
        <div className="line"></div>
      </header>
    </>
  );
};

export default Header;
