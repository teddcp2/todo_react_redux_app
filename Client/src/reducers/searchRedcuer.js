export const searchReducer = (searchValue = null, action) => {
  switch (action.type) {
    case "SEARCH_ITEM":
      return action.payload.itemToBeSearched;
    default:
      return searchValue;
  }
};

export const searchBarReducer = (active = false, action) => {
  // console.log("active", action);
  switch (action.type) {
    case "DISABLE_SEARCH":
      return action.payload;
    default:
      return active;
  }
};
