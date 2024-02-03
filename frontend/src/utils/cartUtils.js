export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
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

  // Update localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};

export const generateQuantityOptions = (countInStock) => {
  const options = [];
  for (let i = 1; i <= countInStock; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return options;
};
