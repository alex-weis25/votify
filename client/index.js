import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { withRouter, Route, Router, Switch } from "react-router-dom";
import App from "./app";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>

      <App />

  </Provider>,
  document.getElementById("app")
);
