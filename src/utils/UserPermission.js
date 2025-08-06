const permissions = {
    admin: {
        addProduct: true,
        deleteProduct: true,
    },
    user: {
        addProduct: false,
        deleteProduct: false,
    },
};

export const getPermissions = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const role = userInfo?.role;
    return permissions[role] || {};
};
