import React from "react";
import { useCart } from "../../components/context/CardContext";
import { FaTruck } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const FinalSummary = () => {
    const { cartItems } = useCart();

    // Mock data for address & payment (can be from state/props in real use)
    const address = {
        name: "prakash",
        street:
            "4/305-A, vadakku thotam, near sakthi Vinayagar temple , Pachagoundenpalayam, Sulur, Coimbatore District, Coimbatore District, Tamil Nadu - 642202",
        phone: "6383569191",
    };

    const paymentMode = "Cash on Delivery";

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:mx-20 p-4">
            {/* Left Side */}
            <div className="flex-1 space-y-6">
                {/* Product Details */}
                <div>
                    <h2 className="font-semibold text-lg mb-3">Product Details</h2>
                    {cartItems.map((item, index) => (
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
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="ml-4 flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-gray-700">₹{item.price}</p>
                                    <p className="text-sm text-gray-500">
                                        All issue easy returns
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Size: {item.size || "S"} • Qty: {item.quantity}
                                    </p>
                                </div>
                                <button className="text-teriteryText font-semibold">EDIT</button>
                            </div>
                            <div className="flex justify-between px-4 py-2 border-t text-sm text-gray-500">
                                <span>Sold by: {item.seller || "TANTANATAN TEXTILES"}</span>
                                <span>Free Delivery</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Delivery Address */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <FaMapMarkerAlt className="text-teriteryText" />
                        <h2 className="font-semibold text-lg">Delivery Address</h2>
                    </div>
                    <div className="border rounded-primaryRadius bg-white p-4 flex justify-between items-start">
                        <div>
                            <p className="font-medium">{address.name}</p>
                            <p className="text-gray-700 text-sm">{address.street}</p>
                            <p className="text-gray-700 text-sm">{address.phone}</p>
                        </div>
                        <button className="text-teriteryText font-semibold">EDIT</button>
                    </div>
                </div>

                {/* Payment Mode */}
                <div>
                    <h2 className="font-semibold text-lg mb-3">Payment Mode</h2>
                    <div className="border rounded-primaryRadius bg-white p-4 flex justify-between items-center">
                        <span>{paymentMode}</span>
                        <button className="text-teriteryText font-semibold">EDIT</button>
                    </div>
                </div>
            </div>

            {/* Right Side - Price Details */}
            <div className="lg:w-1/3 mt-10 bg-white border rounded-primaryRadius p-6 h-fit">
                <h2 className="font-semibold text-lg mb-4">
                    Price Details ({cartItems.length} Items)
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
                    className="mx-auto block bg-primaryBtn border-[1px] border-buttonBorder text-buttonText font-semibold py-2 px-6 rounded-primaryRadius  cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50  transform duration-300 ease-in-out "                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default FinalSummary;
