import { path } from "framer-motion/client";

// Access token for authentication
export const accessToken = localStorage.getItem("accessToken") || " ";

// profile data
export const profile = localStorage.getItem("userInfo") || " ";

// login status
export const loginStatus = false;

// admin status
export const adminStatus = profile?.is_admin || true;

// Base URL for the API
export const BASE_URL = "http://13.238.142.220";


const ApiRoutes = {
    // LOGIN
    SIGNUP: {
        path: '/api/v1/user/signup/'
    },
    LOGIN: {
        path: '/api/v1/auth/token'
    },
    CURRENT_USER:{
        path:'/api/v1/user/' 
    },
    RESET_PASSWORD: { path: '/api/v1/auth/password-reset/' },
    REFRESH_TOKEN: {
        path: '/api/v1/auth/token/refresh/'
    },
    LOGOUT: {
        path: '/api/v1/auth/logout/'
    },
    LOGOUT_ALL: {
        path: '/api/v1/auth/logout_all/'
    },

    // PRODUCT ROUTES
    GET_ALL_PRODUCTS: {
        path: '/api/v1/products/',
        authenticate: true
    },
    CREATE_PRODUCT: {
        path: '/api/v1/products/create/',
        authenticate: true
    },
    UPDATE_PRODUCT: {
        path: (id) => `/api/v1/products/update/${id}`,
        authenticate: true
    },

    // CART ROUTES
    GET_USER_CART: {
        path: '/api/v1/user/cart/',
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

    // SHOPPING (ADDRESS)
    CREATE_ADDRESS: { path: '/api/v1/shopping/addresses/' },
    GET_ADDRESS: {path:'/api/v1/shopping/addresses/'},

    // orders
    CREATE_ORDERS: {path:'api/v1/order/create/'},
    GET_ORDERS: {path:'api/v1/order/'},

    // payments
    CREATE_PAYMENTS: {path:'api/v1/payments/create/'},
    GET_PAYMENTS: {path:'api/v1/payments/'},

    // profile
    UPDATE_PROFILE: {path:'api/v1/profile/'},

    // contact
    CONTACT: {path:'api/v1/contact/'},

}

export default ApiRoutes;