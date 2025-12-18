// Access token for authentication
export const accessToken = localStorage.getItem("accessToken") || " ";

// profile data
export const localProfile = JSON.parse(localStorage.getItem("userInfo") || "{}");

// admin status
export const isAdmin = localStorage.getItem("isAdmin") || false;
export const adminStatus = isAdmin;

// admin status
export const isId = localProfile?.id || " ";
export const id = isId;

// profile update status
export const updateStatus = localProfile?.is_updated;

// Base URL for the API
export const BASE_URL = "http://13.238.142.220";

export const getAuthData = () => {
    // login status
    const loginStatus = !!localStorage.getItem("accessToken");

    return {
        loginStatus,

    };
};


const ApiRoutes = {
    // LOGIN
    SIGNUP: { path: '/api/v1/user/signup/' },
    LOGIN: { path: '/api/v1/auth/token/' },
    CURRENT_USER: { path: '/api/v1/user/' },
    RESET_PASSWORD: { path: '/api/v1/auth/password-reset/' },
    REFRESH_TOKEN: { path: '/api/v1/auth/token/refresh/', authenticate: true },
    LOGOUT: { path: '/api/v1/auth/logout/', authenticate: true },
    LOGOUT_ALL: { path: '/api/v1/auth/logout_all/', authenticate: true },

    // Razorpay
    RAZORPAY_CREATE_ORDER: { path: '/api/v1/payment/create/' },
    RAZORPAY_VERIFY_PAYMENT: { path: '/api/v1/payment/verify/' },

    // PRODUCT ROUTES
    GET_ALL_PRODUCTS: { path: '/api/v1/products/' },
    CREATE_PRODUCT: {
        path: '/api/v1/products/create/',
        authenticate: true
    },
    UPDATE_PRODUCT: {
        path: (id) => `/api/v1/products/update/${id}/`,
        authenticate: true
    },

    // CART ROUTES
    GET_USER_CART: {
        path: `/api/v1/cart/`,
        authenticate: true
    },
    // GET_USER_CART: {
    //     path: `/api/v1/cart/`,
    //     authenticate: true
    // },
    ADD_TO_CART: {
        path: '/api/v1/cart/add/',
        authenticate: true
    },
    REMOVE_FROM_CART: {
        path: `/api/v1/cart/remove/`,
        authenticate: true
    },

    // SHIPPING (ADDRESS)
    CREATE_ADDRESS: { path: '/api/v1/shipping/address/', authenticate: true },
    GET_ADDRESS: { path: '/api/v1/shipping/address/', authenticate: true },

    // orders
    CREATE_ORDERS: { path: 'api/v1/order/place/', authenticate: true },
    GET_ORDERS: { path: 'api/v1/order/', authenticate: true },

    // payments
    CREATE_PAYMENTS: { path: 'api/v1/payments/create/' },
    GET_PAYMENTS: { path: 'api/v1/payments/' },

    // profile
    UPDATE_PROFILE: { path: 'api/v1/profile/', authenticate: true },
    GET_PROFILE: { path: 'api/v1/profile/', authenticate: true },

    // contact
    CONTACT: { path: 'api/v1/contact/' },

    // CATEGORY ROUTES
    GET_USER_CATEGORY: {
        path: '/api/v1/products/category/',
        authenticate: true
    },
    ADD_TO_CATEGORY: {
        path: '/api/v1/products/category/create/',
        authenticate: true
    },
    REMOVE_FROM_CATEGORY: {
        path: (id) => `/api/v1/products/category/delete/${id}/`,
        authenticate: true
    },

    // BANNER ROUTES
    GET_USER_BANNER: {
        path: '/api/v1/banner/',
        authenticate: true
    },
    ADD_TO_BANNER: {
        path: '/api/v1/banner/create/',
        authenticate: true
    },
    REMOVE_FROM_BANNER: {
        path: (id) => `/api/v1/banner/delete/${id}/`,
        authenticate: true
    },

}

export default ApiRoutes;