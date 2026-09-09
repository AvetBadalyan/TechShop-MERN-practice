import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const getInitialState = () => {
  const storedState = localStorage.getItem("cart");
  return storedState
    ? JSON.parse(storedState)
    : {
        cartItems: [],
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
        shippingAddress: {},
        paymentMethod: "PayPal",
      };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      // Strip server-only product fields; the cart only needs the item data.
      // eslint-disable-next-line no-unused-vars
      const { user, rating, numReviews, reviews, ...newItem } = action.payload;

      // Check if the item is already in the cart
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === newItem._id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existingItem._id ? newItem : cartItem
        );
      } else {
        state.cartItems.push(newItem);
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // clearCartItems: used after a successful order — resets prices + items
    // but keeps shippingAddress/paymentMethod in state (they're already saved
    // to localStorage via saveShippingAddress/savePaymentMethod).
    clearCartItems: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // resetCart: used on logout — returns a completely fresh default state.
    // localStorage is cleared separately by authSlice.logout so the next
    // user doesn't inherit anything.
    resetCart: () => ({
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      shippingAddress: {},
      paymentMethod: "PayPal",
    }),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
