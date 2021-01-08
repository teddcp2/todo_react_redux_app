import React, { Fragment } from "react";

import CreateItem from "../createItem/createItem";
import CreateBucket from "../createDropdown/createDropdown";
import Collection from "../collectionItem/collectionItem";

const ParentComponent = (props) => {
  return (
    <Fragment>
      {/* CreateBucket and CreateItem Component */}
      <div className="row">
        <div className="col-md-6">
          <CreateItem />
        </div>
        <div className="col-md-6">
          <CreateBucket />
        </div>
      </div>
      <hr />
      <p className='text-center h6 lead text-primary m-1'>Recent 3 items</p>
      <Collection />
    </Fragment>
  );
};

export default ParentComponent;
