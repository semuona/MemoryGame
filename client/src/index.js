import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MemoryGameProvider from "./Context";

ReactDOM.render(
  <BrowserRouter>
    <MemoryGameProvider>
      <App />
    </MemoryGameProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
