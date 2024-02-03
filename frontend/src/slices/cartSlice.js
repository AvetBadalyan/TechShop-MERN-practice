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
      };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

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
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
