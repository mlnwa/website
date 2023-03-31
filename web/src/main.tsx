import React from "react";
// import ReactDOM from "react-dom"
import App from "./App";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ReactDOM.render(<App/>,document.getElementById("root"))
// React 18+  replace ReactDOM.render
const container = document.getElementById("root");
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
