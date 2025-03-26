import { createSlice } from "@reduxjs/toolkit";

let carty = JSON.parse(localStorage.getItem("cart"));
const cartSlice = createSlice({
  name: "cart",
  initialState: carty,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cart" , JSON.stringify([...state]))
    },
    removeProduct: (state, action) => {
      const updatedCart = state.filter((product) => product.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("cart" , JSON.stringify([...updatedCart]))
      return updatedCart;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
