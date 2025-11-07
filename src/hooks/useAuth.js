import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useAuth = () => {

    // ✅ Signup
    const signUpMutation = useMutation({
        mutationKey: ["createUser"],
        mutationFn: async (userData) => {
            const response = await axiosInstance.post(ApiRoutes.SIGNUP.path, userData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("✅ User Created:", data);
        },
        onError: (err) => console.error("❌ Signup Error:", err),
    });

    // ✅ Login
    const loginMutation = useMutation({
        mutationKey: ["userLogin"],
        mutationFn: async (loginData) => {
            const response = await axiosInstance.post(ApiRoutes.LOGIN.path, loginData);
            return response.data;
        },
        onSuccess: async (data) => {
            await userProfileRefetch();
            console.log("✅ Login Success:", data);
            localStorage.setItem("refreshToken", data?.refresh);
            localStorage.setItem("accessToken", data?.access);
        },
        onError: (err) => console.error("❌ Login Error:", err),
    });

    // ✅ Get Profile
    const { data: profileQuery, refetch: userProfileRefetch } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");
            const response = await axiosInstance.get(ApiRoutes.CURRENT_USER.path, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('11111', response.data)
            localStorage.setItem("userInfo", JSON.stringify(response.data.data.user_profile)); 
            localStorage.setItem("isAdmin", response.data.data.is_admin);
            localStorage.setItem("email", response.data.data.email);
            return response.data;
        },

        enabled: !!localStorage.getItem("accessToken"),
        onError: (err) => console.error("❌ Profile Error:", err),
    });

    // ✅ Reset Password
    const resetPasswordMutation = useMutation({
        mutationKey: ['resetPassword'],
        mutationFn: async (data) => {
            const response = await axiosInstance.post(ApiRoutes.RESET_PASSWORD.path, data);
            return response.data;
        },
        onSuccess: () => {
            console.log("Reset email sent!");
        },
        onError: (error) => {
            console.error("Reset password error:", error);
        },
    });

    // ✅ REFRESH TOKEN
    const refreshTokenMutation = useMutation({
        mutationKey: ['refreshToken'],
        mutationFn: async () => {
            const refreshToken = localStorage.getItem("refreshToken");

            const response = await axiosInstance.post(ApiRoutes.REFRESH_TOKEN.path, {
                refresh: refreshToken,
            });

            localStorage.setItem("accessToken", response.data.access);
            return response.data;
        },
    });

    // ✅ Logout
    const logoutMutation = useMutation({
        mutationKey: ["logoutUser"],
        mutationFn: async () => {
            const token = localStorage.getItem("accessToken");
            const response = await axiosInstance.post(
                ApiRoutes.LOGOUT.path,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        },
        onSuccess: () => {
            console.log("✅ Logged Out");
            localStorage.clear();
            window.location.reload();
        },
        onError: (err) => console.error("❌ Logout Error:", err),
    });

    // ✅ Logout All Devices
    const logoutAllMutation = useMutation({
        mutationKey: ["logoutAll"],
        mutationFn: async () => {
            const token = localStorage.getItem("accessToken");
            const response = await axiosInstance.post(
                ApiRoutes.LOGOUT_ALL.path,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        },
        onSuccess: () => {
            console.log("✅ Logged out from all devices");
            localStorage.clear();
            window.location.reload();
        },
        onError: (err) => console.error("❌ Logout All Error:", err),
    });

    return {
        signUpMutation,
        loginMutation,
        profileQuery,
        profileData: profileQuery ?? [],
        resetPasswordMutation,
        refreshTokenMutation,
        logoutMutation,
        logoutAllMutation,
    };
};

export default useAuth;
