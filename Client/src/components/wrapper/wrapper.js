import React from "react";

const Wrapper = ({ title, children }) => {
  return (
    <div className="card my-3">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Wrapper;
