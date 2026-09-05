import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./assets/styles/bootstrap.custom.css";
import AdminRoute from "./Components/AdminRoute/AdminRoute.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import "./index.css";
import CreateProductPage from "./Pages/AdminPages/CreateProductPage/CreateProductPage.jsx";
import EditProductPage from "./Pages/AdminPages/EditProductPage/EditProductPage.jsx";
import OrderListPage from "./Pages/AdminPages/OrderListPage/OrderListPage.jsx";
import ProductListPage from "./Pages/AdminPages/ProductListPages/ProductListPages.jsx";
import UserEditPage from "./Pages/AdminPages/UserEditPage/UserEditPage.jsx";
import UserListPage from "./Pages/AdminPages/UserListPage/UserListPage.jsx";
import CartPage from "./Pages/CartPage/CartPage.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import OrderPage from "./Pages/OrderPage/OrderPage.jsx";
import PaymentPage from "./Pages/PaymentPage/PaymentPage.jsx";
import PlaceOrderPage from "./Pages/PlaceOrderPage/PlaceOrderPage.jsx";
import ProductPage from "./Pages/ProductPage/ProductPage.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import RegisterPage from "./Pages/RegisterPage/Register.jsx";
import ShippingPage from "./Pages/ShippingPage/ShippingPage.jsx";
import store from "./store/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />{" "}
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
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
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />} />
        <Route path="/admin/productlist" element={<ProductListPage />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListPage />}
        />
        <Route path="/admin/product/create" element={<CreateProductPage />} />
        <Route path="/admin/product/:id/edit" element={<EditProductPage />} />
        <Route path="/admin/userlist" element={<UserListPage />} />
        <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
