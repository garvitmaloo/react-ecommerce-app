import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import store from "./store/store";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "wishlist",
        element: <WishlistPage />
      },
      {
        path: "cart",
        element: <CartPage />
      }
    ]
  }
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
