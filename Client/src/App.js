import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import LoaderComp from "./components/loader/loader";
import Header from "./components/header/header";
import ParentComponent from "./components/ParentCreateComponent/parentComponent";
import CollectionItem from "./components/collectionItem/collectionItem";
import Buckets from "./components/buckets/bucket";
import "./styles.css";

export default function App() {
  let loader = useSelector((state) => state.loader);
  return (
    <div className="container">
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" component={ParentComponent} exact />
          <Route path="/tasks" component={CollectionItem} exact />
          <Route path="/buckets" component={Buckets} exact />
          <Redirect to="/" />
        </Switch>
        {loader.value ? <LoaderComp title={loader.title} /> : null}
      </Fragment>
      {/* )}*/}
    </div>
  );
}
