export const startRazorpayPayment = async ({
    createPayment,
    verifyPayment,
    orderId,
    amount,
    address,
    onSuccess,
    onFailure,
}) => {
    try {
        // 1️⃣ Create Razorpay Order (Backend)
        const paymentOrder = await createPayment({
            order: orderId,
            amount, // rupees
        });

        // 2️⃣ Open Razorpay
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: paymentOrder.amount * 100, // paise
            currency: "INR",
            name: "Your Store Name",
            description: "Order Payment",
            order_id: paymentOrder.razorpay_order_id,

            prefill: {
                name: address?.full_name,
                contact: address?.phone,
            },

            theme: {
                color: "#3399cc",
            },

            handler: async function (response) {
                try {
                    // 3️⃣ Verify payment
                    await verifyPayment({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    onSuccess?.();
                } catch (err) {
                    alert("Payment verification failed");
                    onFailure?.();
                }
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (err) {
        alert("Failed to create payment");
        onFailure?.();
    }
};
