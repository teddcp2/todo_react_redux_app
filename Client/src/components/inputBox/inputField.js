import React from "react";
import styles from "./input.module.css";

let mapObjects = {
  inputField: styles.inputField,
  invalid: styles.invalid
};

const InputField = ({
  type,
  placeholder,
  value,
  handleChange,
  category,
  classes,
  validation
}) => {
  // console.log(validation, "valid");
  let myClasses = ` ${classes} ${mapObjects[category]} `;
  if (validation === "invalid") {
    myClasses += ` ${mapObjects["invalid"]}`;
  }
  // console.log("classes-", myClasses);
  return (
    <input
      className={myClasses}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputField;
