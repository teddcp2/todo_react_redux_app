import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as actionCreators from "./actions";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim";
import "bootstrap/dist/js/bootstrap.min.js";

import { RootReducer } from "./reducers";

// import "font-awesome/css/font-awesome.min.css";

import App from "./App";
const rootElement = document.getElementById("root");

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25
});

let store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunk),)
);

const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

toast.configure(options);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
