// In production the API lives on a separate origin (its own Vercel project),
// set via VITE_API_URL at build time. Locally it's empty so requests are
// relative and go through the Vite dev proxy.
export const BASE_URL = import.meta.env.VITE_API_URL || "";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
