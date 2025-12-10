import { configureStore } from "@reduxjs/toolkit";
import productCategoryReducer from "./slice/ProductCategorySlice";
import BannerCarouselReducer from "./slice/BannerCarouselSlice";
import ProductCarouselReducer from "./slice/ProductCarouselSlice";
import OrderedReducer from "./slice/OrderedSlice";
import DirectBuyReducer from "./slice/DirectBuySlice";
import CartBuyReducer from "./slice/CartBuySlice";

const store = configureStore({
    reducer: {
        productCategory: productCategoryReducer,
        bannerCarouselData: BannerCarouselReducer,
        ProductData: ProductCarouselReducer,
        OrderedData: OrderedReducer,
        DirectBuy: DirectBuyReducer,
        CartBuy: CartBuyReducer,
    }
})

export default store;