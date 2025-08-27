import { createSlice } from "@reduxjs/toolkit";
import banner1 from '../../assets/banner1.jpeg'
import banner2 from '../../assets/banner2.jpeg'
import banner3 from '../../assets/banner3.jpeg'

let initialState = {
    bannerCarouselData: [
        { id: 1, Imgsrc: banner1 },
        { id: 2, Imgsrc: banner2 },
        { id: 3, Imgsrc: banner3 },
    ],
}

const BannerCarouselSlice = createSlice({
    name: 'bannerCarouselData',
    initialState,
    reducers: {
        setBannerCarousel: (state, action) => {
            state.bannerCarouselData = action.payload || []
        },
        addBanner: (state, action) => {
            const newBanner = {
                id: Date.now(),
                Imgsrc: action.payload,
            };
            state.bannerCarouselData.push(newBanner);
        },
        removeBanner: (state, action) => {
            state.bannerCarouselData = state.bannerCarouselData.filter(b => b.id !== action.payload);
        }
    }
});

export const { setBannerCarousel, addBanner, removeBanner } = BannerCarouselSlice.actions;
export default BannerCarouselSlice.reducer;