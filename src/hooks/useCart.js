import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useCart = () => {
    const localProfile = JSON.parse(localStorage.getItem("userInfo"));
    const id = localProfile.id || " ";

    const { data: cartQuery, refetch: cartQueryRefetch } = useQuery({
        queryKey: ['cart', id],
        queryFn: async ({ queryKey }) => {
            const [, userId] = queryKey; // userId is the second element in queryKey
            const token = localStorage.getItem("accessToken");
            if (!token) return [];

            const response = await axiosInstance.get(ApiRoutes.GET_USER_CART.path, { params: { "user_id": userId } });
            console.log('22222',response.data.items);
            return response.data[0].items;
        },
        enabled: !!localStorage.getItem("accessToken"),
    });

    // const { data: cartQuery, refetch: cartQueryRefetch } = useQuery({
    //     queryKey: ['cart'],
    //     queryFn: async () => {
    //         const token = localStorage.getItem("accessToken");
    //         if (!token) return [];

    //         const response = await axiosInstance.get(ApiRoutes.GET_USER_CART.path);
    //         return response.data.items;
    //     },
    //     enabled: !!localStorage.getItem("accessToken"),
    // });

    const addToCartMutation = useMutation({
        mutationKey: ['addToCart'],
        mutationFn: async (cartData) => {
            const response = await axiosInstance.post(ApiRoutes.ADD_TO_CART.path, cartData);
            return response.data;
        },
        onSuccess: () => {
            cartQueryRefetch();
        },
    });

    const removeFromCartMutation = useMutation({
        mutationKey: ['removeFromCart'],
        mutationFn: async (cartData) => {
            const response = await axiosInstance.post(ApiRoutes.REMOVE_FROM_CART.path, cartData);
            return response.data;
        },
        onSuccess: () => {
            cartQueryRefetch();
        },
    });

    return {
        cartItems: cartQuery ?? [],
        cartQueryRefetch,
        addToCartMutation,
        removeFromCartMutation,
    };
};

export default useCart;