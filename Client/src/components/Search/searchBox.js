import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchItem } from "../../actions";
import "./search.css";

const SearchBox = (props) => {
  let dispatch = useDispatch();
  let disabledValue = useSelector((state) => state.searchBarActiveStatus);
  const handleChange = (e) => dispatch(searchItem(e.target.value));

  return (
    <Fragment>
      <div className="input-group mx-auto mx-lg-2  search-box">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search Item names..."
          disabled={disabledValue}
          onChange={handleChange}
        />
      </div>
    </Fragment>
  );
};

export default SearchBox;
