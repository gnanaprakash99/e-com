import { useState, useEffect } from "react";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import { FaAmazonPay } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SummaryPageNumber from "./SummaryPageNumber";
import OrderSummary from "./OrderSummary";
import useCart from "../../hooks/useCart";
import paymentQR from "../../assets/paymentQR.jpeg";

const PaymentMethodSection = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedWallet, setSelectedWallet] = useState("");

    const toggleSection = (section) => setActiveSection((prev) => (prev === section ? null : section));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const wallets = [
        { name: "Google Pay", icon: <SiGooglepay className="text-2xl text-[#5F6368]" /> },
        { name: "PhonePe", icon: <SiPhonepe className="text-2xl text-[#4F0F8C]" /> },
        { name: "Paytm", icon: <SiPaytm className="text-2xl text-[#00BAF2]" /> },
        { name: "Amazon Pay", icon: <FaAmazonPay className="text-2xl text-[#FF9900]" /> },
    ];

    const handlePaymentProcess = () => {
        if (!selectedMethod) return alert("Please select a payment method.");

        // 🟢 Check which flow we're in (direct buy or cart checkout)
        const directBuyItem = JSON.parse(localStorage.getItem("directBuyItem"));
        const isDirectBuy = !!directBuyItem; // true if directBuyItem exists

        if (isDirectBuy) {
            // ✅ Direct Buy flow
            const updatedItem = {
                ...directBuyItem,
                payment: { paymentMethod: selectedMethod },
            };
            localStorage.setItem("directBuyItem", JSON.stringify(updatedItem));
        } else {
            // 🛒 Cart Checkout flow
            const existingCart = JSON.parse(localStorage.getItem("cartBuy")) || {};
            const updatedCart = {
                ...existingCart,
                payment: { paymentMethod: selectedMethod },
            };
            localStorage.setItem("cartBuy", JSON.stringify(updatedCart));
        }

        // 🟢 Move to Final Summary page
        navigate("/finalSummaryPage");
    };

    const EmptyCart = () => (
        <div className="container mx-auto my-12 py-12 px-4">
            <div className="flex justify-center">
                <div className="w-full max-w-md text-center bg-cardBg p-6 md:p-8 rounded-primaryRadius shadow">
                    <h4 className="text-xl md:text-2xl font-semibold mb-6">No items in your cart</h4>
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

    const ShowCheckout = () => (
        <div className="container mx-auto mb-5 px-4">
            <SummaryPageNumber currentStep="Payment" />
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-5">

                <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-primaryRadius ">
                    <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

                    {/* Scan & Pay */}
                    <div
                        onClick={() => {
                            setSelectedMethod("Scan & Pay");
                            toggleSection("scanAndPay");
                        }}
                        className={`bg-cardBg rounded-secondaryRadius border-[1px] border-buttonBorder px-5 py-4 cursor-pointer mb-4 transition ${selectedMethod === "Scan & Pay" ? "border-buttonBorder bg-opacity-20 border-[2px] bg-gradient-to-t from-secondaryBtn to-primaryBtn" : ""
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-bold">Scan and pay</span>
                            <RiArrowDownSLine className="text-2xl cursor-pointer" />
                        </div>
                        <AnimatePresence>
                            {activeSection === "scanAndPay" && (
                                <motion.div
                                    key="scanAndPay"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="mt-4 flex justify-center"
                                >
                                    <img src={paymentQR} alt="Payment QR" className="w-80 h-70 object-contain rounded-lg shadow" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cash on Delivery */}
                    <div
                        onClick={() => setSelectedMethod("Cash on Delivery")}
                        className={`bg-cardBg rounded-secondaryRadius border-[1px] border-buttonBorder px-5 py-4 cursor-pointer mb-4 transition ${selectedMethod === "Cash on Delivery" ? "border-buttonBorder bg-opacity-20 border-[2px] bg-gradient-to-t from-secondaryBtn to-primaryBtn" : ""
                            }`}
                    >
                        <span className="font-bold">Cash on Delivery</span>
                    </div>

                    {/* Online Wallets */}
                    {/* <div
                        onClick={() => toggleSection("onlineWallet")}
                        className={`bg-cardBg rounded-secondaryRadius border-[1px] border-buttonBorder px-5 py-4 cursor-pointer mb-4 transition ${selectedMethod?.includes("Wallet:") ? "border-buttonBorder bg-opacity-20 border-[2px] bg-gradient-to-t from-secondaryBtn to-primaryBtn" : ""
                            }`}
                    >
                        <span className="font-bold">Pay Online</span>
                        <AnimatePresence>
                            {activeSection === "onlineWallet" && (
                                <motion.div
                                    key="walletSection"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 space-y-3"
                                >
                                    {wallets.map((wallet, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                name="wallet"
                                                id={wallet.name}
                                                checked={selectedWallet === wallet.name}
                                                onChange={() => {
                                                    setSelectedWallet(wallet.name);
                                                    setSelectedMethod(`Wallet: ${wallet.name}`);
                                                }}
                                                className="cursor-pointer"
                                            />
                                            <label htmlFor={wallet.name} className="flex items-center space-x-2 cursor-pointer">
                                                {wallet.icon}
                                                <span>{wallet.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div> */}

                    <div className="flex justify-end">
                        <button
                            onClick={handlePaymentProcess}
                            className="border-[1px] border-buttonBorder cursor-pointer transition-transform hover:scale-105 w-primaryWidth bg-primaryBtn text-buttonText font-medium py-3 rounded-primaryRadius mt-6 shadow"
                        >
                            Continue
                        </button>
                    </div>
                </div>

                <div className="hidden sm:flex sm:justify-center w-full lg:w-1/3">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );

    return cartItems.length === 0 ? <EmptyCart /> : <ShowCheckout />;
};

export default PaymentMethodSection;
