import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useCart = () => {
    const localProfileRaw = localStorage.getItem("userInfo");
    const localProfile = localProfileRaw ? JSON.parse(localProfileRaw) : null;
    const userId = localProfile?.id;

    const { data: cartQuery = [], refetch: cartQueryRefetch } = useQuery({
        queryKey: ["cart", userId],
        queryFn: async () => {
            if (!userId) return [];

            const response = await axiosInstance.get(
                ApiRoutes.GET_USER_CART.path,
                { params: { user_id: userId } }
            );

            return response.data?.[0]?.items ?? [];
        },
        enabled: !!userId,
    });

    const addToCartMutation = useMutation({
        mutationFn: async (cartData) => {
            const response = await axiosInstance.post(
                ApiRoutes.ADD_TO_CART.path,
                cartData
            );
            return response.data;
        },
        onSuccess: cartQueryRefetch,
    });

    const removeFromCartMutation = useMutation({
        mutationFn: async (cartData) => {
            const response = await axiosInstance.post(
                ApiRoutes.REMOVE_FROM_CART.path,
                cartData
            );
            return response.data;
        },
        onSuccess: cartQueryRefetch,
    });

    return {
        cartItems: cartQuery,
        cartQueryRefetch,
        addToCartMutation,
        removeFromCartMutation,
    };
};

export default useCart;
