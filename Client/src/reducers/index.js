import { combineReducers } from "redux";
import { ItemReducer } from "./ItemReducer";
import { searchReducer, searchBarReducer } from "./searchRedcuer";
import { categoryReducer } from "./categoryReducer";
import { loaderReducer } from "./showLoader";

export const RootReducer = combineReducers({
  items: ItemReducer,
  loader: loaderReducer,
  searchValue: searchReducer,
  searchBarActiveStatus: searchBarReducer,
  categories: categoryReducer
});
