const permissions = {
    admin: {
        addProduct: true,
        deleteProduct: true,
        controlPanel: true,
    },
    user: {
        addProduct: false,
        deleteProduct: false,
        controlPanel: false,
    },
};

export const getPermissions = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const role = userInfo?.role;
    return permissions[role] || {};
};
