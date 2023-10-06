//Importaciones React
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
//Importaciones Redux
import { Provider } from "react-redux";
import store from "../src/redux/store";
//Importacion estilos
import App from "./App";
//import "./main.css";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);