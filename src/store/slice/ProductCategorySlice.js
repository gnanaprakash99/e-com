import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    productCategory: ['appliances', 'mobiles', 'electronics', 'beauty', 'grocery', 'furniture', 'toys', 'fashion', 'books', 'pharmacy'],
}

const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState,
    reducers: {
        setProductCategory: (state, action) => {
            state.productCategory = action.payload || [];
        },
        addCategory: (state, action) => {
            if (!state.productCategory.includes(action.payload)) {
                state.productCategory.push(action.payload);
            }
        },
        removeCategory: (state, action) => {
            state.productCategory = state.productCategory.filter(cat => cat !== action.payload);
        },
    }
});

export const { setProductCategory, addCategory, removeCategory } = productCategorySlice.actions;
export default productCategorySlice.reducer;