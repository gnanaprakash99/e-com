import { configureStore } from "@reduxjs/toolkit";
import productCategoryReducer from "./slice/ProductCategorySlice";
import BannerCarouselReducer from "./slice/BannerCarouselSlice";
import ProductCarouselReducer from "./slice/ProductCarouselSlice";
import OrderedReducer from "./slice/OrderedSlice";

const store = configureStore({
    reducer: {
        productCategory: productCategoryReducer,
        bannerCarouselData: BannerCarouselReducer,
        ProductData: ProductCarouselReducer,
        OrderedData: OrderedReducer,
    }
})

export default store;