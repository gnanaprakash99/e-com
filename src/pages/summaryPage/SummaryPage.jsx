import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../components/context/CardContext";
import PaymentMethodSection from "./PaymentMethod";
import IndianStates from "../../utils/IndianStates";

const SummaryPage = () => {
    const { cartItems, incrementQuantity, decrementQuantity } = useCart();

    const EmptyCart = () => (
        <div className="container mx-auto my-12 py-12 px-4">
            <div className="flex justify-center">
                <div className="w-full max-w-md text-center bg-cardBg p-6 md:p-8 rounded-primaryRadius shadow">
                    <h4 className="text-xl md:text-2xl font-semibold mb-6">No items in your cart</h4>
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border text-buttonText bg-primaryBtn rounded-primaryRadius transition"
                    >
                        <i className="fa fa-arrow-left mr-2"></i> Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );

    const ShowCheckout = () => {
        let subtotal = 0;
        let shipping = 30.0;
        let totalItems = 0;

        cartItems.forEach((item) => {
            subtotal += item.price * item.quantity;
            totalItems += item.quantity;
        });

        return (
            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* Billing Form */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-cardBg text-primaryText shadow-md rounded-xl p-4 sm:p-6">
                            <h2 className="text-xl md:text-2xl font-semibold mb-4">Billing Address</h2>
                            <form className="space-y-4 sm:space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block font-medium mb-1">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Contact Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block font-medium mb-1">Email</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Mobile Number</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block font-medium mb-1">Address</label>
                                    <textarea
                                        required
                                        className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                    />
                                </div>

                                {/* Location Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block font-medium mb-1">Country</label>
                                        <select
                                            required
                                            className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                        >
                                            <option value="India">India</option>
                                        </select>

                                        <label className="block font-medium mb-1 mt-4">State</label>
                                        <select
                                            required
                                            className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                        >
                                            {IndianStates.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-medium mb-1">Town/City</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full h-primaryHeight border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Zip</label>
                                            <input
                                                type="number"
                                                required
                                                className="w-full border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-1 focus:ring-inputSelectBorder p-2 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-4 sm:my-6" />
                                <PaymentMethodSection />
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-cardBg text-primaryText rounded-primaryRadius shadow-md">
                            <div className="bg-secondaryLite text-center px-4 py-3 sm:px-6 sm:py-4 rounded-t-xl">
                                <h3 className="text-base md:text-lg font-semibold">Order Summary</h3>
                            </div>
                            <div className="p-4 sm:p-6 space-y-4">
                                {/* List each product */}
                                <div className="space-y-4 border-b border-mutedText">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="border-b pb-3 last:border-0 last:pb-0">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                                <div className="flex gap-3 w-full sm:w-2/3">
                                                    {item.image && (
                                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-primaryRadius" />
                                                    )}

                                                    {/* Product Info */}
                                                    <div className="flex-1">
                                                        <h4 className="text-sm md:text-lg font-semibold">{item.name}</h4>
                                                        <p className="text-xs md:text-sm text-secondaryText">
                                                            ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => decrementQuantity(item.id)}
                                                        className="px-2 py-1 border rounded-md text-lg"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-3">{item.quantity}</span>
                                                    <button
                                                        onClick={() => incrementQuantity(item.id)}
                                                        className="px-2 py-1 border rounded-md text-lg"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Subtotal */}
                                <div className="flex flex-col border-b border-mutedText">
                                    <div className="flex justify-between pt-2">
                                        <span>Products ({totalItems})</span>
                                        <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-3">
                                        <span>Shipping</span>
                                        <span className="font-semibold">₹{shipping.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>₹{(subtotal + shipping).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return cartItems.length === 0 ? <EmptyCart /> : <ShowCheckout />;
};

export default SummaryPage;