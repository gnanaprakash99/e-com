import { useState } from "react";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import { FaAmazonPay } from "react-icons/fa";

const PaymentMethodSection = () => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [selectedWallet, setSelectedWallet] = useState("");

    const paymentLabels = {
        card: "Debit / Credit Card",
        upi: "UPI Payment",
        wallet: "Online Payment",
    };

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
        <>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            {/* Payment Options */}
            <div className="flex flex-wrap gap-4 mb-6">
                {["card", "upi", "wallet"].map((method) => (
                    <button
                        key={method}
                        type="button"
                        className={`px-4 py-2 border rounded-lg transition ${paymentMethod === method
                            ? "bg-secondaryBtn text-buttonText"
                            : "bg-mutedText text-buttonText hover:bg-secondaryBtn"
                            }`}
                        onClick={() => setPaymentMethod(method)}
                    >
                        {paymentLabels[method]}
                    </button>
                ))}
            </div>

            {/* Card Payment */}
            {paymentMethod === "card" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1">Name on Card</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none p-2 shadow-sm"
                            />
                            <small className="">
                                Full name as displayed on card
                            </small>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Card Number</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none p-2 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Expiration</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none p-2 shadow-sm"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">CVV</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none p-2 shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className=" w-primaryButton bg-primaryBtn text-buttonText font-medium py-3 rounded-primaryRadius mt-6 shadow "
                        >
                            Verify card details
                        </button>
                    </div>
                </>
            )}

            {/* UPI Payment */}
            {paymentMethod === "upi" && (
                <>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">UPI ID</label>
                            <input
                                type="text"
                                required
                                placeholder="example@upi"
                                className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none p-2 shadow-sm"
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
                            className=" w-primaryButton bg-primaryBtn text-buttonText font-medium py-3 rounded-primaryRadius mt-6 shadow "
                        >
                            Verify UPI ID
                        </button>
                    </div>
                </>
            )
            }

            {/* Online Wallets */}
            {
                paymentMethod === "wallet" && (
                    <>
                        <div className="space-y-4">
                            <p className="text-sm">Select your preferred wallet:</p>
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
                                            <span className="">{wallet.name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                onClick={() => handleWalletPayment()}
                                disabled={!selectedWallet}
                                className=" w-primaryButton bg-primaryBtn text-buttonText font-medium py-3 rounded-primaryRadius mt-6 shadow "
                            >
                                Pay Now
                            </button>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default PaymentMethodSection;
