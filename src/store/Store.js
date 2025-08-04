import { configureStore } from "@reduxjs/toolkit";
import productCategoryReducer from "./slice/ProductCategorySlice"
import BannerCarouselReducer from "./slice/BannerCarouselSlice";

const store = configureStore({
    reducer: {
        productCategory: productCategoryReducer,
        bannerCarouselData: BannerCarouselReducer,
    }
})

export default store;