import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useRazorpay = () => {
    const token = localStorage.getItem("accessToken");

    // ✅ Create Razorpay Order
    const createRazorpayOrderMutation = useMutation({
        mutationFn: async (orderData) => {
            if (!token) throw new Error("No access token");

            const response = await axiosInstance.post(
                ApiRoutes.RAZORPAY_CREATE_ORDER.path,
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        },
    });

    // ✅ Verify Razorpay Payment
    const verifyRazorpayPaymentMutation = useMutation({
        mutationFn: async (paymentData) => {
            if (!token) throw new Error("No access token");

            const response = await axiosInstance.post(
                ApiRoutes.RAZORPAY_VERIFY_PAYMENT.path,
                paymentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        },
    });

    return {
        createRazorpayOrderMutation,
        verifyRazorpayPaymentMutation,
    };
};

export default useRazorpay;
