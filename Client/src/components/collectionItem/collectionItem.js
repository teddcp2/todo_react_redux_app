import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInfo, disableSearchBar } from "../../actions";
import Item from "../item/item";
import "./collectionItem.css";

const CollectionItems = (props) => {
  let [editingStatus, setEditingStatus] = useState({
    editing: false,
    itemId: null
  });
  let url = props.match ? props.match.url : null;
  let [items, searchValue, searchBarStatus] = useSelector((state) => [
    state.items,
    state.searchValue,
    state.searchBarActiveStatus
  ]);

  const dispatch = useDispatch();

  const callGetItems = useCallback(() => {

    if (url === '/tasks' || url) dispatch(fetchAllInfo());
    else dispatch(fetchAllInfo(true));


    // fetchTasks
  }, [dispatch, url]);

  useEffect(() => {
    callGetItems();
  }, [callGetItems]);


  const handleEditing = (id) =>
    setEditingStatus({ editing: !editingStatus.editing, itemId: id });

  if (searchBarStatus) dispatch(disableSearchBar(!searchBarStatus));

  let filteredItems = "";

  if (!searchValue) {
    filteredItems = items;
  } else {
    filteredItems = items.filter((item) => {
      let nm = item.name;
      return nm.toLowerCase().includes(searchValue.toLowerCase());
    });
  }
  // console.log("PArent--", editingStatus)
  return (
    // <div className="row row-cols-1 row-cols-md-3">
    <div className="card-columns my-3">
      {filteredItems.map((item, idx) => (
        <Item
          key={idx}
          index={idx}
          {...item}
          editingItem={editingStatus}
          handleChange={handleEditing}
        />
      ))}
      {
        !items.length ? <p className='text-primary text-center text-bold'>No Items are created !!</p> : null
      }
    </div>
  );
};

export default CollectionItems;
