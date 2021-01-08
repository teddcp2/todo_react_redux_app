import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../inputBox/inputField";
import Button from "../button/button";
import { createCategory } from "../../actions";
import Wrapper from "../wrapper/wrapper";

const CreateDropdown = (props) => {
  let dispatch = useDispatch();
  let options = useSelector((store) => store.categories);

  let [bucketText, setBucketText] = useState("");
  let [validationData, setValidationData] = useState({
    status: "valid",
    message: ""
  });

  const handleInputChange = (e) => {
    setBucketText(e.target.value);
    if (validationData.status !== "valid")
      setValidationData({ status: "valid", message: "" });
  };
  const handleBucketSubmit = () => {
    if (!bucketText || options.includes(bucketText.toLowerCase()) || bucketText.length > 8) {
      setValidationData({
        status: "invalid",
        message: "Invalid name entered!"
      });
    } else {
      // console.log("Firing -", bucketText.toLowerCase());
      dispatch(createCategory(bucketText.toLowerCase()));
      setBucketText("");
      setValidationData({ status: "valid", message: "" });

    }
  };

  // console.log(bucketText);

  return (
    <Wrapper title="Create a Bucket">
      <div className="form-inline align-items-baseline my-1">
        <InputField
          value={bucketText}
          handleChange={handleInputChange}
          placeholder="Type a Bucket name of 8 or less chars"
          type="text"
          category="inputField"
          classes="form-control mb-2 mr-sm-2 "
          validation={validationData.status}
        />
        {validationData.status === "invalid" ? (
          <div class="text-danger text-monospace">{validationData.message}</div>
        ) : null}
      </div>
      <Button
        value="create"
        classes="d-block btn btn-primary mx-auto px-4 "
        handleClick={handleBucketSubmit}
        disableCheck={bucketText.length ? false : true}
      />
    </Wrapper>
  );
};

export default CreateDropdown;
