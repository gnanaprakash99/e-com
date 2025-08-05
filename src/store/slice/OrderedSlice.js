import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    orderedData: [
        {
            id: 1,
            productName: "Canvas Painting",
            image: "https://example.com/canvas.jpg",
            quantity: 1,
            totalPrice: 1200,
            status: "Delivered",
            date: "2025-08-01"
        },
        {
            id: 2,
            productName: "Pottery Vase",
            image: "https://example.com/vase.jpg",
            quantity: 2,
            totalPrice: 1800,
            status: "Shipped",
            date: "2025-08-03"
        },
        {
            id: 3,
            productName: "Watercolour Landscape",
            image: "https://example.com/watercolor.jpg",
            quantity: 1,
            totalPrice: 950,
            status: "Processing",
            date: "2025-08-04"
        },
        {
            id: 4,
            productName: "Antique Pottery Plate",
            image: "https://example.com/plate.jpg",
            quantity: 3,
            totalPrice: 2100,
            status: "Delivered",
            date: "2025-07-30"
        },
        {
            id: 5,
            productName: "Miniature Canvas",
            image: "https://example.com/mini-canvas.jpg",
            quantity: 2,
            totalPrice: 1600,
            status: "Cancelled",
            date: "2025-08-05"
        }
    ]
}

const OrderedSlice = createSlice({
    name: 'OrderedData',
    initialState,
    reducers: {
        setOrderedData: ((state, action) => {
            state.orderedData = action.payload || []
        }),
    }
})

export const { setOrderedData } = OrderedSlice.actions;
export default OrderedSlice.reducer;