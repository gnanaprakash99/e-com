import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    productCategory: [
        { id: 'bb11', categoryName: 'Macrame', categoryImage: 'https://i.etsystatic.com/24528021/r/il/c3fd73/3973359140/il_570xN.3973359140_jiq7.jpg', },
        { id: 'bb22', categoryName: 'Home Decor', categoryImage: 'https://www.realsimple.com/thmb/TT9NZ4a30pmIkMWzIlHcEZJWnW4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rs-home-1020hom-office-a7701595d1a145169d0e9e1d80dd4419.jpg', },
        { id: 'bb33', categoryName: "Festive collections", categoryImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIX_O0OkX6htrq98xx8QR84ZkiaZH3jbWzLA&s', },
        { id: 'bb44', categoryName: 'Paintings', categoryImage: 'https://i.pinimg.com/originals/86/60/ec/8660ec40240ad6e9b682dd3bbb6105c3.jpg', },
        { id: 'bb55', categoryName: 'Mandala Art', categoryImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmZks7i8YYQJllaTYGVBX38ylXZ_fCGWnmvA&s', },
        { id: 'bb66', categoryName: "wearable", categoryImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhHccLUqzwMrDbIe7hqCNyivr9ymdWKhMmeA&s', },

        // { id: 'aa55', categoryName: 'appliances', categoryImage: 'https://m.media-amazon.com/images/G/31/img20/Smallappliances/Mixer-grinders.jpg', },
        // { id: 'aa66', categoryName: 'mobiles', categoryImage: 'https://content.jdmagicbox.com/v2/comp/chennai/i5/044pxx44.xx44.210305001030.y9i5/catalogue/mrk-mobile-service-center-ambattur-chennai-mobile-phone-repair-and-services-samsung-0d8axn65z9-250.jpg', },
        // { id: 'aa77', categoryName: 'toys', categoryImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQygwNJDH1vAw_1nBBrUlAjQO3vsw_tp3a93g&s', },
        // { id: 'aa88', categoryName: 'fashion', categoryImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5jlc4cYpmKan2lTlDqrp4cP47mKh8vgTwDQ&s', },
        // { id: 'aa11', categoryName: "men's clothing", categoryImage: 'https://assets.myntassets.com/f_auto,q_auto:eco,dpr_1.3,w_66,c_limit,fl_progressive/w_66,h_88,q_30,dpr_3,fl_progressive,f_webp/assets/images/2025/JULY/20/uIFo0GGG_2cb72bfef43d41bdab70418aa52c5a46.jpg', },
        // { id: 'aa22', categoryName: "jewelery", categoryImage: 'https://5.imimg.com/data5/TG/DN/MY-37294786/designer-artificial-jewellery.jpg', },
        // { id: 'aa33', categoryName: "electronics", categoryImage: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_800,h_586/https://ikonic.com/wp-content/uploads/2023/10/industries-consumer-electronics.jpeg', },
        // { id: 'aa44', categoryName: "women's clothing", categoryImage: 'https://cms.landmarkshops.in/cdn-cgi/image/w=500,q=85,fit=cover/MAX-Friday/MAX2.O/MAX-Banner1-mob-Women-18Aug25.png', },
        // { id: 'aa99', categoryName: 'books', categoryImage: 'https://3.imimg.com/data3/CY/NJ/MY-15306271/books-500x500.png', },
        // { id: 'aa10', categoryName: 'pharmacy', categoryImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeyrCAe9HyS4KogRwg0OEbbscJi6fCPqEQhg&s', }
    ],
}

const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState,
    reducers: {
        setProductCategory: (state, action) => {
            state.productCategory = action.payload || [];
        },
        addCategory: (state, action) => {
            const exists = state.productCategory.some(
                (cat) => cat.categoryName.toLowerCase() === action.payload.categoryName.toLowerCase()
            );
            if (!exists) {
                state.productCategory.push(action.payload);
            }
        },
        removeCategory: (state, action) => {
            state.productCategory = state.productCategory.filter(
                (cat) => cat.id !== action.payload
            );
        },
    },
});

export const { setProductCategory, addCategory, removeCategory } = productCategorySlice.actions;
export default productCategorySlice.reducer;