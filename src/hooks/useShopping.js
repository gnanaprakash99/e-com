import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useShopping = () => {

    // create address
    const createAddressMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post(ApiRoutes.CREATE_ADDRESS.path, data)
            return res.data;
        }
    })

    // get addresses
    const addressQuery = useQuery({
        queryKey: ['addressQuery'],
        queryFn: async () => {
            const res = await axiosInstance.get(ApiRoutes.GET_ADDRESS.path)
            return res.data;
        }
    })

    return {
        createAddressMutation,
        addressQuery,
        addressData: addressQuery ?? [],
    }

}

export default useShopping;