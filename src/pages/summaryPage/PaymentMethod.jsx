import { useState, useEffect } from "react";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import { FaAmazonPay } from "react-icons/fa";
import SummaryPageNumber from "./SummaryPageNumber";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import paymentQR from "../../assets/paymentQR.jpeg";

const PaymentMethodSection = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    // Handle navigation to summary page
    const handlePaymentProcess = () => {
        navigate('/finalSummaryPage');
    };

    const [selectedWallet, setSelectedWallet] = useState("");

    const wallets = [
        {
            name: "Google Pay",
            icon: <SiGooglepay style={{ color: "#5F6368" }} className="text-2xl" />,
            url: "https://pay.google.com/",
        },
        {
            name: "PhonePe",
            icon: <SiPhonepe style={{ color: "#4F0F8C" }} className="text-2xl" />,
            url: "https://www.phonepe.com/",
        },
        {
            name: "Paytm",
            icon: <SiPaytm style={{ color: "#00BAF2" }} className="text-2xl" />,
            url: "https://paytm.com/",
        },
        {
            name: "Amazon Pay",
            icon: <FaAmazonPay style={{ color: "#FF9900" }} className="text-2xl" />,
            url: "https://www.amazon.in/gp/sva/dashboard",
        },
    ];

    const handleWalletPayment = () => {
        switch (selectedWallet) {
            case "Google Pay":
                window.location.href = "https://pay.google.com/";
                break;
            case "PhonePe":
                window.location.href = "https://www.phonepe.com/";
                break;
            case "Paytm":
                window.location.href = "https://paytm.com/";
                break;
            case "Amazon Pay":
                window.location.href = "https://www.amazon.in/gp/sva/dashboard";
                break;
            default:
                alert("Please select a valid wallet.");
        }
    };

    return (
        <div className="container mx-auto mb-5 px-4">
            <SummaryPageNumber currentStep="Payment" />
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                {/* Payment Method Selection */}
                <div className="w-full mt-5 lg:w-2/3 bg-white p-4 sm:p-6 rounded-primaryRadius ">
                    <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

                    {/* Card Payment */}
                    <div className="bg-cardBg rounded-secondaryRadius border-[1px] border-buttonBorder p-6 mb-5 space-y-6">
                        <div>
                            <button
                                onClick={() => toggleSection("card")}
                                className="font-bold"
                            >
                                Debit/Credit Cards
                            </button>
                        </div>
                        <AnimatePresence>
                            {activeSection === "card" && (
                                <motion.div
                                    key="cardSection"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-medium mb-1">Name on Card</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            />
                                            <small>Full name as displayed on card</small>
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Card Number</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Expiration</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="MM/YY"
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">CVV</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full border-b-2 border-mutedText bg-transparent focus:border-inputSelectBorder focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="border-[1px] border-buttonBorder cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50 w-primaryWidth bg-primaryBtn text-buttonText font-medium py-3 rounded-primaryRadius mt-6 shadow"
                                        >
                                            Verify card details
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* UPI Payment */}
                    <div className="bg-cardBg rounded-secondaryRadius border-[1px] border-buttonBorder p-6 mb-5 space-y-6">
                        <div>
                            <button
                                onClick={() => toggleSection("upi")}
                                className="font-bold"
                            >
                                UPI Payment
                            </button>
                        </div>
                        <AnimatePresence>
                            {activeSection === "upi" && (
                                <motion.div
                                    key="upiSection"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block font-medium mb-1">UPI ID</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="example@upi"
                                                className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder focus:outline-none p-2 shadow-sm"
                                            />
                                        </div>
                                        <p className="text-sm text-mutedText">
                                            You will receive a request in your UPI app to complete the payment.
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled
                                            className="border-[1px] border-buttonBorder cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50 w-primaryWidth bg-primaryBtn text-buttonText font-bold py-3 rounded-primaryRadius mt-6 shadow"
                                        >
                                            Verify UPI ID
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Pay Online */}
                    <div className="bg-cardBg rounded-secondaryRadius border-[1px] border-buttonBorder p-6 mb-5 space-y-6">
                        <div>
                            <button
                                onClick={() => toggleSection("onlinePay")}
                                className="font-bold"
                            >
                                Pay Online
                            </button>
                        </div>
                        <AnimatePresence>
                            {activeSection === "onlinePay" && (
                                <motion.div
                                    key="onlinePaySection"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="space-y-4">
                                        <p className="text-sm">Select your preferred app:</p>
                                        <div className="space-y-3">
                                            {wallets.map((wallet, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <input
                                                        type="radio"
                                                        id={wallet.name}
                                                        name="wallet"
                                                        value={wallet.name}
                                                        checked={selectedWallet === wallet.name}
                                                        onChange={() => setSelectedWallet(wallet.name)}
                                                        className="cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor={wallet.name}
                                                        className="flex items-center space-x-2 cursor-pointer"
                                                    >
                                                        {wallet.icon}
                                                        <span>{wallet.name}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            onClick={handleWalletPayment}
                                            disabled={!selectedWallet}
                                            className="border-[1px] border-buttonBorder cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50 w-primaryWidth bg-primaryBtn text-buttonText font-medium py-3 rounded-primaryRadius mt-6 shadow"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* scan and pay */}
                    <div className="bg-cardBg rounded-secondaryRadius border-[1px] border-buttonBorder px-1 space-y-6">
                        <div className="border-b border-buttonBorder p-5 ">
                            <button
                                onClick={() => toggleSection("scanAndPay")}
                                className="font-bold"
                            >
                                Scan and pay
                            </button>
                        </div>
                        <AnimatePresence>
                            {activeSection === "scanAndPay" && (
                                <motion.div
                                    key="onlinePaySection"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="pb-5 "
                                >
                                    <div className="">
                                        <div>
                                            <img src={paymentQR} alt="paymentQR" className="w-80 h-70 object-contain mx-auto" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Continue Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            onClick={handlePaymentProcess}
                            className="border-[1px] border-buttonBorder cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50 w-primaryWidth bg-primaryBtn text-buttonText font-medium py-3 rounded-primaryRadius mt-6 shadow"
                        >
                            Continue
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="hidden sm:flex w-full mt-5 lg:w-1/3">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodSection;
