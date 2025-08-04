import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    productCategory: ['appliances', 'mobiles', 'electronics', 'beauty', 'grocery', 'furniture', 'toys', 'fashion', 'books', 'pharmacy'],
}

const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState,
    reducers: {
        setProductCategory: ((state, action) => {
            state.productCategory = action.payload || []
        }),
    }
})

export const { setProductCategory } = productCategorySlice.actions;
export default productCategorySlice.reducer;