import { createSlice } from "@reduxjs/toolkit";

const CartBuySlice = createSlice({
    name: "cartBuy",
    initialState: {
        item: null,
    },
    reducers: {
        setCartBuy: (state, action) => {
            state.item = action.payload;
        },
        clearCartBuy: (state) => {
            state.item = null;
        },
    },
});

export const { setCartBuy } = CartBuySlice.actions;
export default CartBuySlice.reducer;
