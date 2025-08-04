import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    bannerCarouselData: [
        {
            id: 1,
            Imgsrc:
                "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/13d4b7ac61ff30ee.jpg?q=50",
        },
        {
            id: 2,
            Imgsrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlWeaIA6lfGH3OUs6S9jLJBIxr1SwVGVyOEw&s",
        },
        {
            id: 3,
            Imgsrc:
                "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/13d4b7ac61ff30ee.jpg?q=50",
        },
        {
            id: 4,
            Imgsrc:
                "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/61c104839324e184.jpg?q=50",
        },
    ]
}

const BannerCarouselSlice = createSlice({
    name: 'bannerCarouselData',
    initialState,
    reducers: {
        setBannerCarousel: ((state, action) => {
            state.bannerCarouselData = action.payload || []
        }),
    }
})

export const { setBannerCarousel } = BannerCarouselSlice.actions;
export default BannerCarouselSlice.reducer;