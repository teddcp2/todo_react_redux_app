export const loaderReducer = (loader = false, action) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return action.payload;
    default:
      return loader;
  }
};
