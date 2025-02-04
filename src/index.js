import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AddProduct from "./pages/AddProduct";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import PageC from "./pages/PageC";
import ChangeProduct from "./pages/ChangeProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/add",
    element: <AddProduct />,
  },
  {
    path: "/pageA",
    element: <PageA />,
  },
  {
    path: "/pageB",
    element: <PageB />,
  },
  {
    path: "/pageC",
    element: <PageC />,
  },
  {
    path: "/change/:id",
    element: <ChangeProduct />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<Provider store={store}>

<RouterProvider router={router} />
</Provider>
);
