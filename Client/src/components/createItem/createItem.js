import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../inputBox/inputField";
import Dropdown from "../dropdown/dropdown";
import Button from "../button/button";
import { createItem } from "../../actions";
import Wrapper from "../wrapper/wrapper";

const CreateItem = (props) => {
  let dispatch = useDispatch();
  let options = useSelector(state => state.categories)
  let [text, setText] = useState("");
  let [bucketOption, setBucketOption] = useState("");
  let [validationInputData, setValidationInputData] = useState({
    status: "valid",
    message: ""
  });
  let [validationOptionsData, setValidationOptionsData] = useState({
    status: "valid",
    message: ""
  });

  const handleInputChange = (e) => {
    setText(e.target.value);
    if (validationInputData.status !== "valid")
      setValidationInputData({ status: "valid", message: "" });
  };
  const handleBucketChange = (e) => {
    setBucketOption(e.target.value);
    setValidationOptionsData({ status: "valid", message: "" });
  };

  const handleSubmit = () => {
    // if (
    //   !text &&
    //   (!bucketOption || bucketOption.toLowerCase() === "select a bucket")
    // ) {
    //   // validation = " Item name and  !";
    //   setValidationInputData({
    //     status: "invalid",
    //     message: "Please fill the Item name!"
    //   });

    //   setValidationOptionsData({
    //     status: "invalid",
    //     message: "Bucket type can't be empty!"
    //   });
    // } else if (!text) {
    //   setValidationInputData({
    //     status: "invalid",
    //     message: "Please fill the Item name!"
    //   });
    // } else if (
    //   !bucketOption ||
    //   bucketOption.toLowerCase() === "select a bucket"
    // ) {
    //   setValidationOptionsData({
    //     status: "invalid",
    //     message: "Select a bucket name!"
    //   });
    // } else {
    // console.log("Firing -", text, bucketOption);

    console.log(options, bucketOption)

    let bucket_idx = options.find(option => option.name === bucketOption).id
    console.log(bucket_idx)
    dispatch(createItem(text.toLowerCase(), bucket_idx));
    setText("");
    setBucketOption("");
    setValidationInputData({ status: "valid", message: "" });
    setValidationOptionsData({ status: "valid", message: "" });
    // toast(<Notificaton title="Item Created" />);
    // }
  };

  // console.log(text, bucketOption);

  return (
    <Wrapper title="Create a Item">
      <div className="form-inline align-items-baseline my-1">
        <InputField
          value={text}
          handleChange={handleInputChange}
          placeholder="Type a name"
          type="text"
          category="inputField"
          classes="form-control mb-2 mr-sm-2 "
          validation={validationInputData.status}
        />
        {validationInputData.status === "invalid" ? (
          <div class="text-danger text-monospace">
            {validationInputData.message}
          </div>
        ) : null}
        <Dropdown
          handleChange={handleBucketChange}
          value={bucketOption}
          classes="form-control mb-2 mr-sm-2 "
          category="dropdown-option"
          validation={validationOptionsData.status}
        />
        {validationOptionsData.status === "invalid" ? (
          <div class="text-danger text-monospace">
            {validationOptionsData.message}
          </div>
        ) : null}
      </div>
      <Button
        value="create"
        classes="d-block btn btn-primary mx-auto px-4 "
        handleClick={handleSubmit}
        disableCheck={
          text.length &&
            !["", "select a bucket"].includes(bucketOption.toLowerCase())
            ? false
            : true
        }
      />
    </Wrapper>
  );
};

export default CreateItem;
