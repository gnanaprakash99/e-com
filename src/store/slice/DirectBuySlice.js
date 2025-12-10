import { createSlice } from "@reduxjs/toolkit";

const DirectBuySlice = createSlice({
  name: "directBuy",
  initialState: {
    item: null,
  },
  reducers: {
    setDirectBuyItem: (state, action) => {
      state.item = action.payload;
    },
    clearDirectBuyItem: (state) => {
      state.item = null;
    },
  },
});

export const { setDirectBuyItem, clearDirectBuyItem } = DirectBuySlice.actions;
export default DirectBuySlice.reducer;
