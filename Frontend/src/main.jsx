import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import annaDannStore from "./Store";
import { Provider } from "react-redux";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstPage from "./1st-Page/1st-page";
import SecondPage from "./2nd-Page/2nd-Page";
import NotificationsPage from "./2nd-Page/notifiactions";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Acts as the layout
    children: [
      {
        path: "/",
        element: <FirstPage />,
      },
      {
        path: "/donor",
        element: <SecondPage />,
      },
      {
        path: "/ngo",
        element: <SecondPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={annaDannStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
