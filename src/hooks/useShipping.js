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
        onSuccess: async () => {
            await refetchAddressQuery();
        }
    });

    // Get addresses
    const { data: addressQuery, refetch: refetchAddressQuery, isLoading } = useQuery({
        queryKey: ["addressQuery"],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");
            const res = await axiosInstance.get(ApiRoutes.GET_ADDRESS.path, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data; 
        },
    });

    // Return useful parts
    return {
        createAddressMutation,
        addressQuery,                        
        addressData: addressQuery ?? [],      
        isLoading,
        refetchAddress: refetchAddressQuery,
    };
};

export default useShipping;