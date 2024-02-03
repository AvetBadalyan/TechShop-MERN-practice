import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === newItem._id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existingItem._id ? newItem : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      // items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // tax price
      state.taxPrice = addDecimals(Number((0.2 * state.itemsPrice).toFixed(2)));

      // total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
