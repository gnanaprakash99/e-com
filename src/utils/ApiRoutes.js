import { path } from "framer-motion/client";

// Access token for authentication
export const accessToken = localStorage.getItem("accessToken") || "PMAK-68e789827fe86d0001d3f8b4-89ee37bf472399962c5ff61c6278eb7b8";

// Base URL for the API
export const BASE_URL = "https://e9ad5f64-7fa9-400a-8454-37857df89bcf.mock.pstmn.io";


const ApiRoutes = {

    // PRODUCT ROUTES
    GET_ALL_PRODUCTS: {
        path: '/products/',
        authenticate: true
    },
    CREATE_PRODUCT: {
        path: '/products/create',
        authenticate: true
    },
    UPDATE_PRODUCT: {
        path: (id) => `/products/update/${id}`,
        authenticate: true
    },

    // USER ROUTES
    CREATE_USER: {
        path: '/user/signup/',
        authenticate: false
    },
    USER_LOGIN: {
        path: '/user/login/',
        authenticate: false
    },
    GET_AUTH_TOKEN: {
        path: '/auth/token/',
        authenticate: false
    },
    GET_USER_PROFILE: {
        path: '/user/profile/',
        authenticate: true
    },

    // CART ROUTES
    GET_USER_CART: {
        path: '/user/cart/',
        authenticate: true
    },
    ADD_TO_CART: {
        path: '/user/cart/add',
        authenticate: true
    },
    REMOVE_FROM_CART: {
        path: (id) => `/user/cart/remove/${id}`,
        authenticate: true
    },

}

export default ApiRoutes;