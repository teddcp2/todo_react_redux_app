import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../wrapper/wrapper";
import Button from "../button/button";
import CreateCategory from "../createDropdown/createDropdown";
import { disableSearchBar, fetchBuckets } from "../../actions";
// match: Object
// path: "/buckets"
// url: "/buckets"
// isExact: true
// params: Object

const Buckets = (props) => {
  // console.log(props);
  let dispatch = useDispatch();
  let categories = useSelector((store) => store.categories);
  let url = props.match.url;
  // console.log(categories);

  const update = useCallback(() => {
    if (url === "/buckets") {
      dispatch(disableSearchBar(true));
      dispatch(fetchBuckets())
      // return () => {
      //   console.log("unmounting");
      //   dispatch(disableSearchBar(false));
      //   dispatch(searchItem(null));
      // };
    }
  }, [dispatch, url]);

  useEffect(() => {
    update();
  }, [update]);

  return (
    <div className="my-4 ">
      <Wrapper title="Available Buckets">
        <div className="row row-cols-1 row-cols-sm-2 align-items-baseline">
          <div className="col">
            <div className="list-group">
              {categories.map((category) => (
                <Button
                  classes="list-group-item list-group-item-action text-center text-uppercase text-monospace"
                  value={category.name}
                  disableCheck={true}
                  key={category.id}
                />
              ))}
            </div>
          </div>
          <div className="col">
            <CreateCategory />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Buckets;
