import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useShipping = () => {
    // Create address
    const createAddressMutation = useMutation({
        mutationFn: async (data) => {
            const token = localStorage.getItem("accessToken");
            const res = await axiosInstance.post(ApiRoutes.CREATE_ADDRESS.path, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
    });

    // Get addresses
    const addressQuery = useQuery({
        queryKey: ["addressQuery"],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");
            const res = await axiosInstance.get(ApiRoutes.GET_ADDRESS.path, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data; // Assuming API returns an array
        },
    });

    // Return useful parts
    return {
        createAddressMutation,
        addressQuery,
        addressData: addressQuery.data ?? [], // ✅ Correctly returns the array
        isLoading: addressQuery.isLoading,
        refetchAddress: addressQuery.refetch,
    };
};

export default useShipping;
