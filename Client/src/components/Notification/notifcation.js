import React from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from "./notification.module.css";

const Notification = ({ title, type }) => {

  let classes = ""

  if (type === "success") {
    classes = ` text-success text-bold text-monospace`
  }
  else {
    classes = ` text-danger text-bold text-monospace`
  }
  return (
    <div className="card border-0 text-primary font-weight-bold">
      <div className={`card-body ${classes} ${styles.textSize}`}>{title}</div>
    </div>
  );
};

export default Notification;
