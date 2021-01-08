import React, { useState, Fragment } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import InputField from "../inputBox/inputField";
import { editItem, deleteItem, markItem } from "../../actions";
import styles from "./item.module.css";

const Item = ({
  category,
  mark_complete,
  deleted,
  created_date,
  name,
  id,
  editingItem,
  handleChange
}) => {
  let dispatch = useDispatch();
  let titleContent = null;
  let [value, setValue] = useState(name);

  const handleTextChange = (e) => setValue(e.target.value);
  const handleSubmit = () => {
    dispatch(editItem(id, value));
    handleChange(null);
  };
  const handlDelete = () => {
    dispatch(deleteItem(id));
  };

  const handleMark = () => {
    dispatch(markItem(id));
  };
  // console.log(editingItem);

  if (editingItem.itemId === id && editingItem.editing) {
    titleContent = (
      <Fragment>
        <InputField
          value={value}
          placeholder={"Type here"}
          category="editField"
          classes="form-control mb-2 mr-sm-2 overflow-auto "
          handleChange={handleTextChange}
        />
        <button className="btn btn-sm btn-primary my-2" onClick={handleSubmit}>
          submit
        </button>
      </Fragment>
    );
  } else titleContent = <h5 className="card-title">{name}</h5>;

  let cardStatus = "";
  let textStatus = "";
  let msg = "";

  if (deleted === "YES") {
    cardStatus = `border-danger ${styles.deleted}`;
    textStatus = "text-danger";
    msg = "Deleted";
  } else if (deleted === "NO" && mark_complete === "YES") {
    cardStatus = "border-success";
    textStatus = "text-success";
    msg = "Completed";
  } else if (deleted === "NO" && mark_complete === "NO") {
    cardStatus = "border-warning";
    textStatus = "text-warning";
    msg = "In-Progress";
  }

  return (
    <div className={`card ${cardStatus} ${styles.mycard}`}>
      <div className="card-header d-flex justify-content-between">
        <div className="text-lead font-italic">{moment(created_date).format("YYYY-MM-DD")}</div>
        <button
          className=" btn btn-outline text-primary"
          disabled={editingItem.editing || deleted === "YES"}
          onClick={() => {
            handleChange(id);
          }}
        >
          <i className="fas fa-edit px-2"></i>Edit
        </button>
      </div>
      <div className="card-body">
        {titleContent}
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="card-subtitle mt-1 mb-2 text-muted">{category}</h6>
          <h6 className={`${textStatus} mt-1`}>{msg}</h6>
        </div>
      </div>
      <div className="card-footer text-muted d-flex justify-content-end align-items-baseline">
        <button
          className="btn btn-primary mx-1 d-flex justify-content-center align-items-baseline"
          disabled={editingItem.editing || deleted === "YES"}
          onClick={handleMark}
        >
          <i className="far fa-check-circle  px-1"></i>
          {msg === "In-Progress" ? "Mark" : "UnMark"}
        </button>
        <button
          className="btn btn-primary mx-1 d-flex justify-content-center align-items-baseline"
          disabled={editingItem.editing || deleted === "YES"}
          onClick={handlDelete}
        >
          <i className="fas fa-trash-alt px-2"></i>Delete
        </button>
      </div>
    </div>
  );
};

export default Item;

// id: 1
// name: "wwe"
// created_date: "2020-12-07"
// category: "study"
// mark_complete: "NO"
// deleted: "NO"
