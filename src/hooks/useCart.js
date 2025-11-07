import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useCart = () => {
    // Fetch cart items
    const cartQuery = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const response = await axiosInstance.get(ApiRoutes.GET_USER_CART.path);
            return response.data.items;
        }
    });

    // add cart
    const addToCartMutation = useMutation({
        mutationKey: ['addToCart'],
        mutationFn: async (cartData) => {
            const response = await axiosInstance.post(ApiRoutes.ADD_TO_CART.path, cartData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Item added to cart successfully:', data);
            cartQuery.refetch(); // Refetch cart items after successful addition
        },
        onError: (error) => {
            console.error('Error adding item to cart:', error);
        },
    });

    // remove cart
    const removeFromCartMutation = useMutation({
        mutationKey: ['removeFromCart'],
        mutationFn: async (id) => {
            const response = await axiosInstance.delete(ApiRoutes.REMOVE_FROM_CART.path(id));
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Item removed from cart successfully:', data);
            cartQuery.refetch(); // Refetch cart items after successful removal
        },
        onError: (error) => {
            console.error('Error removing item from cart:', error);
        },
    });

    return {
        cartQuery,
        cartItems: cartQuery.data ?? [],
        addToCartMutation,
        removeFromCartMutation,
    };
}
export default useCart;