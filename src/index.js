import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AppProvider from "./components/Context";
import "./index.css";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.querySelector("#root")
);
