export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.quantity) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // tax price
  const taxPrice = 0.2 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // total price
  state.totalPrice = addDecimals(totalPrice);

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
