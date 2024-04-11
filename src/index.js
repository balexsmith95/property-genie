
import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { UserInfoProvider } from "userContext";

// Material Dashboard 2 PRO React Context Provider
import { MaterialUIControllerProvider } from "context";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
