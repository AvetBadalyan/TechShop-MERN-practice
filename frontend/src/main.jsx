import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { lazy } from "react";
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
import "./assets/styles/theme.css";
import AdminRoute from "./Components/AdminRoute/AdminRoute.jsx";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import "./index.css";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import store from "./store/store.js";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx";

// Route pages are code-split so the initial bundle only carries the shell
// and the home page. <App /> provides the Suspense fallback.
const CreateProductPage = lazy(
  () => import("./Pages/AdminPages/CreateProductPage/CreateProductPage.jsx")
);
const DashboardPage = lazy(
  () => import("./Pages/AdminPages/DashboardPage/DashboardPage.jsx")
);
const EditProductPage = lazy(
  () => import("./Pages/AdminPages/EditProductPage/EditProductPage.jsx")
);
const OrderListPage = lazy(
  () => import("./Pages/AdminPages/OrderListPage/OrderListPage.jsx")
);
const ProductListPage = lazy(
  () => import("./Pages/AdminPages/ProductListPages/ProductListPages.jsx")
);
const UserEditPage = lazy(
  () => import("./Pages/AdminPages/UserEditPage/UserEditPage.jsx")
);
const UserListPage = lazy(
  () => import("./Pages/AdminPages/UserListPage/UserListPage.jsx")
);
const CartPage = lazy(() => import("./Pages/CartPage/CartPage.jsx"));
const LoginPage = lazy(() => import("./Pages/LoginPage/LoginPage.jsx"));
const OrderPage = lazy(() => import("./Pages/OrderPage/OrderPage.jsx"));
const PaymentPage = lazy(() => import("./Pages/PaymentPage/PaymentPage.jsx"));
const PlaceOrderPage = lazy(
  () => import("./Pages/PlaceOrderPage/PlaceOrderPage.jsx")
);
const ProductPage = lazy(() => import("./Pages/ProductPage/ProductPage.jsx"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage/ProfilePage.jsx"));
const RegisterPage = lazy(
  () => import("./Pages/RegisterPage/RegisterPage.jsx")
);
const ShippingPage = lazy(
  () => import("./Pages/ShippingPage/ShippingPage.jsx")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
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
        <Route path="/admin/dashboard" element={<DashboardPage />} />
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
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
