import React from "react";
import ReactDOM from "react-dom/client";
import { Reset } from "styled-reset";
import "antd/dist/antd.css";
import Router from "./router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
