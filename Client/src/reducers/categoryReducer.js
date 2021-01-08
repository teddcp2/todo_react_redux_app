export const categoryReducer = (
  categories = [],
  action
) => {
  switch (action.type) {
    case "ALL_CATEGORIES":
      return [...action.payload.dataCategories]
    case "CREATE_CATEGORY": {
      let { categoryName, id } = action.payload;
      return [...categories, { "id": id, "name": categoryName }];
    }
    default:
      return categories;
  }
};
