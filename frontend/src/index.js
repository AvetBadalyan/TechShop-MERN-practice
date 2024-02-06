import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import HomePage from "./Pages/HomePage/HomePage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import { Provider } from "react-redux";
import store from "./store/store";
import CartPage from "./Pages/CartPage/CartPage.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage/Register.jsx";
import ShippingPage from "./Pages/ShippingPage/ShippingPage.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import PaymentPage from "./Pages/PaymentPage/PaymentPage.jsx";
import PlaceOrderPage from "./Pages/PlaceOrderPage/PlaceOrderPage.jsx";
import OrderPage from "./Pages/OrderPage/OrderPage.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
