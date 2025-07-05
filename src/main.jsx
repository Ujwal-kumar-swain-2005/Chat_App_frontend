import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Signin from "./Components/Register/Signin";
import Signup from "./Components/Register/Signup"
import Status from "./Components/Status/Status";
import DisplayStatus from "./Components/Status/DisplayStatus";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Profile from "./Components/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/status",
    element: <Status />,
  },
  {
    path: "/status/:userId",
    element: <DisplayStatus />,
  },
  {
    path: "/signin/",
    element: <Signin/>,
  },
  {
    path: "/signup/",
    element: <Signup/>,
  },
  {
    path: "/profile/",
    element: <Profile/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} >
    </RouterProvider>
    </Provider>
  </React.StrictMode>
);
