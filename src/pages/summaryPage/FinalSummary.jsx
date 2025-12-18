import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import useCart from "../../hooks/useCart";
import { FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import SummaryPageNumber from "./SummaryPageNumber";
import { useNavigate } from "react-router-dom";
import useShipping from "../../hooks/useShipping";
import useOrders from "../../hooks/useOrders";
import { startRazorpayPayment } from "../../services/PaymentService";
import useRazorpay from "../../hooks/useRazorpay";

const useMediaQuery = (query) => {
    const [matches, setMatches] = React.useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
};

const FinalSummary = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const { addressData } = useShipping();

    // api calls
    const { createOrdersMutation, ordersQuery } = useOrders();
    const {
        createRazorpayOrderMutation,
        verifyRazorpayPaymentMutation,
    } = useRazorpay();


    // 🟢 Detect screen
    const isSmUp = useMediaQuery("(min-width: 640px)");

    // 🟢 Get localStorage data
    const directBuy = useSelector((state) => state.DirectBuy.item) || null;
    const cartBuy = useSelector((state) => state.CartBuy.item) || null;

    // 🟢 Determine flow type and address ID
    const isDirectBuy = !!directBuy;
    const addressId = isDirectBuy ? directBuy?.addressId : cartBuy?.addressId;

    // 🟢 Find the corresponding address from fetched data
    const selectedAddress = useMemo(() => {
        if (!addressData || !addressId) return null;
        return addressData.find((addr) => addr.id === addressId) || null;
    }, [addressData, addressId]);

    // 🟢 Determine items to display
    const finalItems = isDirectBuy ? [directBuy?.product] : cartItems;

    // 🟢 Determine payment mode
    const paymentMode = isDirectBuy
        ? directBuy?.payment?.paymentMethod || "Not selected"
        : cartBuy?.payment?.paymentMethod || "Not selected";

    // 🟢 Subtotal calculation
    const subtotal = isDirectBuy
        ? (directBuy?.product?.price || 0) * (directBuy?.quantity || 1)
        : cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    // 🟢 Navigation handlers
    const handleProductEdit = () => {
        if (isSmUp) navigate("/address");
        else navigate("/product");
    };

    const handleAddressEdit = () => navigate("/address");
    const handlePaymentEdit = () => navigate("/payment");

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert("Please select a delivery address.");
            return;
        }

        if (!paymentMode || paymentMode === "Not selected") {
            alert("Please select a payment method.");
            return;
        }

        try {
            // 1️⃣ Create order first
            const orderPayload = {
                shipping_address: selectedAddress.id,
                product_id: isDirectBuy
                    // ? [directBuy.product.id]
                    ? directBuy.product.id
                    // : cartItems.map(item => item.product.id),
                    : cartItems[0]?.product?.id,
            };

            const orderRes = await createOrdersMutation.mutateAsync(orderPayload);

            // 🟢 Get orderId (prefer response, fallback to ordersQuery)

            const orderId = orderRes?.order_id;

            if (!orderId) {
                throw new Error("Order ID not found");
            }

            // 2️⃣ COD → done
            if (paymentMode === "Cash on Delivery") {
                navigate("/orderSuccess");
                return;
            }

            // 3️⃣ Online payment
            startRazorpayPayment({
                orderId,
                amount: subtotal,
                address: selectedAddress,

                createPayment: createRazorpayOrderMutation.mutateAsync,
                verifyPayment: verifyRazorpayPaymentMutation.mutateAsync,

                onSuccess: () => {
                    navigate("/orderSuccess");
                },
                onFailure: () => {
                    console.log("Payment failed");
                },
            });
        } catch (err) {
            console.error(err);
            alert("Failed to place order");
        }
    };

    return (
        <div className="container mx-auto mb-5 px-4">
            <SummaryPageNumber currentStep="Summary" />
            <div className="flex flex-col lg:flex-row gap-6 lg:mx-20 p-4">
                {/* LEFT SIDE */}
                <div className="flex-1 space-y-6">
                    {/* Product Details */}
                    <div>
                        <h2 className="font-semibold text-lg mb-3">Product Details</h2>
                        {finalItems && finalItems.length > 0 ? (
                            finalItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-primaryRadius overflow-hidden bg-white"
                                >
                                    <div className="flex items-center gap-2 px-4 py-2 border-b text-gray-700 font-medium">
                                        <FaTruck className="text-gray-500" />
                                        Estimated Delivery by Monday, 25th Aug
                                    </div>
                                    <div className="flex p-4">
                                        <img
                                            src={item?.product?.image || item?.image}
                                            alt={item?.product?.name || item?.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h3 className="font-medium">
                                                {item?.product?.name || item?.name}
                                            </h3>
                                            <p className="text-gray-700">₹{item?.product?.price || item?.price}</p>
                                            <p className="text-sm text-gray-500">All issues easy returns</p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item?.quantity || directBuy?.quantity || 1}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleProductEdit}
                                            className="text-teriteryText font-semibold"
                                        >
                                            EDIT
                                        </button>
                                    </div>
                                    <div className="flex justify-between px-4 py-2 border-t text-sm text-gray-500">
                                        <span>Sold by: {item?.seller || "TANTANATAN TEXTILES"}</span>
                                        <span>Free Delivery</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No items found.</p>
                        )}
                    </div>

                    {/* Delivery Address */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <FaMapMarkerAlt className="text-success" />
                            <h2 className="font-semibold text-lg">Delivery Address</h2>
                        </div>
                        {selectedAddress ? (
                            <div className="border rounded-primaryRadius bg-white p-4 flex justify-between items-start">
                                <div>
                                    <p className="font-medium">{selectedAddress.full_name}</p>
                                    <p className="text-gray-700 text-sm">
                                        {selectedAddress.address_line1},{" "}
                                        {selectedAddress.address_line2 && `${selectedAddress.address_line2}, `}
                                        {selectedAddress.city}, {selectedAddress.state},{" "}
                                        {selectedAddress.country} - {selectedAddress.postal_code}
                                    </p>
                                    <p className="text-gray-700 text-sm">Phone: {selectedAddress.phone}</p>
                                </div>
                                <button
                                    onClick={handleAddressEdit}
                                    className="text-teriteryText font-semibold"
                                >
                                    EDIT
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500">No delivery address selected.</p>
                        )}
                    </div>

                    {/* Payment Mode */}
                    <div>
                        <h2 className="font-semibold text-lg mb-3">Payment Mode</h2>
                        <div className="border rounded-primaryRadius bg-white p-4 flex justify-between items-center">
                            <span>{paymentMode}</span>
                            <button
                                onClick={handlePaymentEdit}
                                className="text-teriteryText font-semibold"
                            >
                                EDIT
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Price Details */}
                <div className="lg:w-1/3 mt-10 bg-white border rounded-primaryRadius p-6 h-fit">
                    <h2 className="font-semibold text-lg mb-4">
                        Price Details ({isDirectBuy ? 1 : cartItems.length} Item
                        {isDirectBuy ? "" : "s"})
                    </h2>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Total Product Price</span>
                        <span>+ ₹{subtotal}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between font-semibold text-lg mb-4">
                        <span>Order Total</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="mx-auto block bg-primaryBtn border-[1px] border-buttonBorder text-buttonText font-semibold py-2 px-6 rounded-primaryRadius cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50 transform duration-300 ease-in-out"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalSummary;
