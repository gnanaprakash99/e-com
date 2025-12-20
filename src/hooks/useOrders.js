import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useOrders = ({ fetchOrders } = {}) => {
    const localProfile = JSON.parse(localStorage.getItem("userInfo"));
    const userId = localProfile?.id || "";

    const token = localStorage.getItem("accessToken");

    // ✅ Create Order
    const createOrdersMutation = useMutation({
        mutationKey: ["createOrder"],
        mutationFn: async (data) => {
            if (!token) throw new Error("Unauthorized");

            const res = await axiosInstance.post(
                ApiRoutes.CREATE_ORDERS.path,
                data
            );
            return res.data;
        },
    });

    // ✅ Get Orders (User specific)
    const ordersQuery = useQuery({
        queryKey: ["orders", userId],
        queryFn: async ({ queryKey }) => {
            const [, uid] = queryKey;

            if (!token || !uid) return [];

            const res = await axiosInstance.get(
                ApiRoutes.GET_ORDERS.path,
                { params: { user_id: uid } }
            );

            return res.data;
        },
        enabled: fetchOrders &&  !!token && !!userId,
    });

    // ✅ Always return array
    const orderedData = Array.isArray(ordersQuery.data)
        ? ordersQuery.data
        : [];

    return {
        createOrdersMutation,
        ordersQuery,
        orderedData,
    };
};

export default useOrders;
