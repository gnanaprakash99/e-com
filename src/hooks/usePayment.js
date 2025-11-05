import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const usePayment = () => {

    // create Payment
    const createPaymentMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post(ApiRoutes.CREATE_PAYMENTS.path, data)
            return res.data;
        }
    })

    // get Payments
    const paymentQuery = useQuery({
        queryKey: ['paymentQuery'],
        queryFn: async () => {
            const res = await axiosInstance.get(ApiRoutes.GET_PAYMENTS.path)
            return res.data;
        }
    })

    return {
        createPaymentMutation,
        paymentQuery,
        PaymentData: paymentQuery ?? [],
    }

}

export default usePayment;