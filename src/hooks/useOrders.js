import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useOrders = () => {
  // ✅ Create Order
  const createOrdersMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(ApiRoutes.CREATE_ORDERS.path, data);
      return res.data;
    },
  });

  // ✅ Get Orders
  const ordersQuery = useQuery({
    queryKey: ["ordersQuery"],
    queryFn: async () => {
      const res = await axiosInstance.get(ApiRoutes.GET_ORDERS.path);
      return res.data;
    },
  });

  // ✅ Ensure it always returns an array
  const orderedData = Array.isArray(ordersQuery.data) ? ordersQuery.data : [];

  return {
    createOrdersMutation,
    ordersQuery,
    orderedData,
  };
};

export default useOrders;