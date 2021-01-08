import React from "react";
import styles from "./button.module.css";

const Button = ({ handleClick, value, classes, disableCheck }) => {
  if (disableCheck) classes = `${classes} ${styles.disabled}`;
  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      disabled={disableCheck}
    >
      {value}
    </button>
  );
};

export default Button;
