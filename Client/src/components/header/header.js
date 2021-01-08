import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "../Search/searchBox";
import classes from "./header.module.css";

const Header = (props) => {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-primary ${classes.navbarx}`}
    >
      <Link to="/">
        <h2 className={`navbar-brand ${classes.title} ml-5`}>TODOS APP</h2>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${classes.navbarcollapsex}`}
        id="navbar"
      >
        <Link to="/">
          <h5 className={`text-white d-flex justify-content-center mx-2`}>
            Home
          </h5>
        </Link>
        <Link to="/tasks">
          <h5 className={`text-white d-flex justify-content-center mx-2`}>
            Tasks
          </h5>
        </Link>
        <Link to="/buckets">
          <h5 className={`text-white d-flex justify-content-center mx-2`}>
            Buckets
          </h5>
        </Link>
        <SearchBox />
      </div>
    </nav>
  );
};

export default Header;
