export const startRazorpayPayment = async ({
    orderId,          // DB order ID (number)
    amount,           // amount in rupees (string or number)
    createPayment,    // mutation: create razorpay order
    verifyPayment,    // mutation: verify payment
    onSuccess,
    onFailure,
}) => {
    try {
        // 1️⃣ Create Razorpay Order (Backend)
        const response = await createPayment({
            order: orderId,
            amount: amount,
        });

        const { razorpay_order, key_id } = response;

        if (!razorpay_order || !key_id) {
            throw new Error("Invalid Razorpay response");
        }

        // 2️⃣ Razorpay Checkout
        const options = {
            key: key_id,
            amount: razorpay_order.amount,
            currency: razorpay_order.currency,
            name: "Your Company",
            order_id: razorpay_order.id,

            handler: async function (res) {
                try {
                    // 3️⃣ Verify Payment
                    await verifyPayment({
                        razorpay_payment_id: res.razorpay_payment_id,
                        razorpay_order_id: res.razorpay_order_id,
                        razorpay_signature: res.razorpay_signature,
                    });

                    onSuccess && onSuccess();
                } catch (err) {
                    console.error("Verification failed", err);
                    onFailure && onFailure();
                }
            },

            theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (error) {
        console.error("Razorpay init failed:", error);
        onFailure && onFailure();
    }
};
