import React from "react";
import styles from "./loader.module.css";

const Loader = ({ title }) => {
  return (
    <div className={` ${styles.loader} text-center m-auto text-white`}>
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="lead text-bold p-3">{title}</p>
    </div>
  );
};

export default Loader;
