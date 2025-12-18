import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDirectBuyItem } from "../../store/slice/DirectBuySlice";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import { FaAmazonPay } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SummaryPageNumber from "./SummaryPageNumber";
import OrderSummary from "./OrderSummary";
import useCart from "../../hooks/useCart";
import paymentQR from "../../assets/paymentQR.jpeg";
import { setCartBuy } from "../../store/slice/CartBuySlice";

const PaymentMethodSection = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeSection, setActiveSection] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState("");

    const toggleSection = (section) =>
        setActiveSection((prev) => (prev === section ? null : section));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /** WALLET LIST (kept for future use) **/
    const wallets = [
        { name: "Google Pay", icon: <SiGooglepay className="text-2xl text-[#5F6368]" /> },
        { name: "PhonePe", icon: <SiPhonepe className="text-2xl text-[#4F0F8C]" /> },
        { name: "Paytm", icon: <SiPaytm className="text-2xl text-[#00BAF2]" /> },
        { name: "Amazon Pay", icon: <FaAmazonPay className="text-2xl text-[#FF9900]" /> },
    ];

    /** PAYMENT PROCESS LOGIC **/
    const directBuyItem = useSelector((state) => state.DirectBuy.item);
    const cartBuyData = useSelector((state) => state.CartBuy.item);
    const handlePaymentProcess = () => {
        if (!selectedMethod) {
            alert("Please select a payment method.");
            return;
        }

        const isDirectBuy = !!directBuyItem;

        if (isDirectBuy) {
            dispatch(
                setDirectBuyItem({
                    ...directBuyItem,
                    payment: { paymentMethod: selectedMethod },
                })
            );
        } else {
            dispatch(setCartBuy({
                ...cartBuyData,
                payment: { paymentMethod: selectedMethod },
            }));
        }

        navigate("/finalSummaryPage");
    };

    /** EMPTY CART SCREEN **/
    const EmptyCart = () => (
        <div className="container mx-auto my-12 py-12 px-4">
            <div className="flex justify-center">
                <div className="w-full max-w-md text-center bg-cardBg p-6 md:p-8 rounded-primaryRadius shadow">
                    <h4 className="text-xl md:text-2xl font-semibold mb-6">
                        No items in your cart
                    </h4>
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border text-buttonText bg-primaryBtn rounded-primaryRadius transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );

    /** CHECKOUT PAGE **/
    const ShowCheckout = () => (
        <div className="container mx-auto mb-5 px-4">
            <SummaryPageNumber currentStep="Payment" />

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-5">
                {/* LEFT SECTION */}
                <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-primaryRadius">
                    <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

                    {/* Scan & Pay */}
                    {/* <div
                        onClick={() => {
                            setSelectedMethod("Scan & Pay");
                            toggleSection("scanAndPay");
                        }}
                        className={`bg-cardBg rounded-secondaryRadius border px-5 py-4 cursor-pointer mb-4 transition ${selectedMethod === "Scan & Pay"
                            ? "border-2 bg-gradient-to-t from-secondaryBtn to-primaryBtn bg-opacity-20"
                            : "border-buttonBorder"
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-bold">Scan and Pay</span>
                            <RiArrowDownSLine className="text-2xl" />
                        </div>

                        <AnimatePresence>
                            {activeSection === "scanAndPay" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="mt-4 flex justify-center"
                                >
                                    <img
                                        src={paymentQR}
                                        alt="Payment QR"
                                        className="w-80 h-70 object-contain rounded-lg shadow"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div> */}

                    {/* Online Payment */}
                    <div
                        onClick={() => setSelectedMethod("Online Payment")}
                        className={`bg-cardBg rounded-secondaryRadius border px-5 py-4 cursor-pointer mb-4 transition ${selectedMethod === "Cash on Delivery"
                            ? "border-2 bg-gradient-to-t from-secondaryBtn to-primaryBtn bg-opacity-20"
                            : "border-buttonBorder"
                            }`}
                    >
                        <span className="font-bold">Online Payment (Razorpay)</span>
                    </div>

                    {/* Cash on Delivery */}
                    {/* <div
                        onClick={() => setSelectedMethod("Cash on Delivery")}
                        className={`bg-cardBg rounded-secondaryRadius border px-5 py-4 cursor-pointer mb-4 transition ${selectedMethod === "Cash on Delivery"
                            ? "border-2 bg-gradient-to-t from-secondaryBtn to-primaryBtn bg-opacity-20"
                            : "border-buttonBorder"
                            }`}
                    >
                        <span className="font-bold">Cash on Delivery</span>
                    </div> */}

                    {/* Continue Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handlePaymentProcess}
                            className="border border-buttonBorder cursor-pointer transition-transform hover:scale-105 w-primaryWidth bg-primaryBtn text-buttonText font-medium py-3 rounded-primaryRadius mt-6 shadow"
                        >
                            Continue
                        </button>
                    </div>
                </div>

                {/* RIGHT SECTION (Order Summary) */}
                <div className="hidden sm:flex sm:justify-center w-full lg:w-1/3">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );

    return  <ShowCheckout />;
};

export default PaymentMethodSection;
