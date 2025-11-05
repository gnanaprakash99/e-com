import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useOrders = () => {

    // create orders
    const createOrdersMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post(ApiRoutes.CREATE_ORDERS.path, data)
            return res.data;
        }
    })

    // get orders
    const ordersQuery = useQuery({
        queryKey: ['ordersQuery'],
        queryFn: async () => {
            const res = await axiosInstance.get(ApiRoutes.GET_ORDERS.path)
            return res.data;
        }
    })

    return {
        createOrdersMutation,
        ordersQuery,
        orderedData: ordersQuery ?? [],
    }

}

export default useOrders;