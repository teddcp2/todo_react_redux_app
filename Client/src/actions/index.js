// import data from "./sample";
import { toast } from "react-toastify";
import { axiosInstance } from "../api";
import React from "react";
import Notificaton from "../components/Notification/notifcation";
// console.log(data);

// export const createItem = (name = null, category = null) => ({
//   type: "CREATE_ITEM",
//   payload: { itemName: name, itemCategory: category }
// });

// export const createCategory = (enteredCategoryValue = null) => ({
//   type: "CREATE_CATEGORY",
//   payload: { categoryName: enteredCategoryValue }
// });

export const searchItem = (enteredItemValue = null) => ({
  type: "SEARCH_ITEM",
  payload: { itemToBeSearched: enteredItemValue }
});


// export const editItem = (id = null, enteredName = null) => ({
//   type: "EDIT_ITEM",
//   payload: { itemId: id, newName: enteredName }
// });

// export const deleteItem = (id = null) => ({
//   type: "DELETE_ITEM",
//   payload: { itemId: id }
// });

// export const markItem = (id = null) => ({
//   type: "MARK_ITEM",
//   payload: { itemId: id }
// });

export const disableSearchBar = (value = false) => ({
  type: "DISABLE_SEARCH",
  payload: value
});

export const showLoader = (value = false, title = "Loading ...") => ({
  type: "SHOW_LOADER",
  payload: { value, title }
});

//  Getting all the available items

// export const getAllItems = (recent = false) => (dispatch) => {
//   let dataItems = data;
//   dispatch(showLoader(true, "Fetching the tasks..."));
//   setTimeout(() => {
//     dispatch({
//       type: "ALL_ITEMS",
//       payload: { dataItems }
//     });
//     dispatch(showLoader(false));
//   }, 2000);

//   // console.log('action',dataItems);
//   // return ;
// };

export const fetchTasks = (recent = false) => async (dispatch) => {

  dispatch(showLoader(true, "Fetching tasks..."));
  try {
    console.log(recent)
    let repsonse = '';
    let { data, status } = repsonse = await axiosInstance.get("/tasks", {
      params: { "recent": recent }
    });
    console.log(repsonse);

    if (status === 200) {
      dispatch({
        type: "ALL_ITEMS",
        payload: { dataItems: data.tasks }
      });
    }
  } catch (err) {
    dispatch({
      type: "ALL_ITEMS",
      payload: { dataItems: [] }
    });
    toast(<Notificaton title="Items could not be fetched!!" type="error" />);
  }
  return dispatch(showLoader(false, "Fetching done.."));
};

export const fetchBuckets = () => async (dispatch) => {

  dispatch(showLoader(true, "Fetching Buckets"));
  try {
    let { data, status } = await axiosInstance.get("/buckets");
    console.log(data, status);

    if (status === 200) {
      dispatch({
        type: "ALL_CATEGORIES",
        payload: { dataCategories: data.buckets }
      });
    }
  } catch (err) {
    dispatch({
      type: "ALL_CATEGORIES",
      payload: { dataCategories: [] }
    });
    toast(<Notificaton title="Buckets could not be fetched!!" type="error" />);
  }
  return dispatch(showLoader(false, "Fetching done..."));
};

export const fetchAllInfo = (recent = false) => (dispatch) => {
  Promise.all([dispatch(fetchTasks(recent)), dispatch(fetchBuckets())]).then(() => dispatch(showLoader(false)));
}

export const createItem = (name = null, category = null, recent = false) => async dispatch => {

  try {
    let { data, status } = await axiosInstance.post("/task", { "name": name.toLowerCase(), "category": category });

    if (status === 201 && data.status === "success") {
      // dispatch(
      //   {
      //     type: "CREATE_ITEM",
      //     payload: { itemName: name.toLowerCase(), itemCategory: category.toLowerCase(), id: data.id }
      //   }
      // )

      dispatch(fetchTasks(true))
      toast(<Notificaton title="Item Created!!" type='success' />);
    }
  }
  catch (error) {
    // Notifivation
    toast(<Notificaton title="Creation failed!!" type="error" />);
  }


}
export const createCategory = (enteredCategoryValue = null) => async dispatch => {

  try {
    let { data, status } = await axiosInstance.post("/bucket", { "name": enteredCategoryValue.toLowerCase() });
    console.log(status, data)
    if (status === 201 && data.status === "success") {
      // dispatch({
      //   type: "CREATE_CATEGORY",
      //   payload: { categoryName: enteredCategoryValue.toLowerCase(), id: data.id }
      // })
      // console.log("Fetching all..")
      dispatch(fetchBuckets());
      return toast(<Notificaton title="Bucket Created!!" type='success' />);
    }
  }
  catch (err) {
    // Notify
    console.log(err)
    toast(<Notificaton title="Creation failed!!" type="error" />);
  }
}
export const editItem = (id = null, enteredName = null) => async dispatch => {

  try {
    let { data, status } = await axiosInstance.patch(`/task/${id}/update`, { "new_name": enteredName.toLowerCase(), "type": "EDIT" });

    if (status === 200 && data.status === "success") {
      dispatch(showLoader(true, "Updating the name"));
      dispatch({
        type: "EDIT_ITEM",
        payload: { itemId: id, newName: enteredName.toLowerCase() }
      });
      dispatch(showLoader(false));
      toast(<Notificaton title="Name edited!!" type='success' />);
    }
  }
  catch (error) {
    // Notify
    toast(<Notificaton title="Failed!!" type='error' />);
  }
}
export const deleteItem = (id = null) => async (dispatch) => {
  try {
    let { data, status } = await axiosInstance.delete(`/task/${id}/delete`);

    if (status === 200 && data.status === "success") {
      dispatch(showLoader(true, "Deleting the item..."));
      dispatch({
        type: "DELETE_ITEM",
        payload: { itemId: id }
      });
      dispatch(showLoader(false));
      toast(<Notificaton title="Deleted!!" type='success' />);
    }
  }
  catch (error) {
    // Notify
    toast(<Notificaton title="Failed!!" type='error' />);
  }
}

export const markItem = (id = null) => async dispatch => {
  try {
    let { data, status } = await axiosInstance.patch(`/task/${id}/update`, { "new_name": "", "type": "MARK" });

    if (status === 200 && data.status === "success") {
      dispatch(showLoader(true, "Marking the item..."));
      dispatch({
        type: "MARK_ITEM",
        payload: { itemId: id }
      });
      dispatch(showLoader(false));
    }
  }
  catch (error) {
    // Notify
    toast(<Notificaton title="Failed!!" type='error' />);
  }

} 