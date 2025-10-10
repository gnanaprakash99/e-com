import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useAuth = () => {
    // User registration mutation
    const createUserMutation = useMutation({
        mutationKey: ['createUser'],
        mutationFn: async (userData) => {
            const response = await axiosInstance.post(ApiRoutes.CREATE_USER.path, userData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('User created successfully:', data);
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        },
    });

    // User login mutation
    const userLoginMutation = useMutation({
        mutationKey: ['userLogin'],
        mutationFn: async (loginData) => {
            const response = await axiosInstance.post(ApiRoutes.USER_LOGIN.path, loginData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('User logged in successfully:', data);
            localStorage.setItem("accessToken", data.token); // Store token in localStorage
        },
        onError: (error) => {
            console.error('Error logging in user:', error);
        },
    });

    // Fetch user profile
    const userProfileQuery = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axiosInstance.get(ApiRoutes.GET_USER_PROFILE.path, {
                headers: { Authorization: `${accessToken}` },
            });
            return response.data;
        },
        enabled: !!localStorage.getItem("accessToken"), // Only run this query if the accessToken exists
        onError: (error) => {
            console.error('Error fetching user profile:', error);
        },
    });

    return {
        createUserMutation,
        userLoginMutation,
        userProfileQuery,
    };
}
export default useAuth;