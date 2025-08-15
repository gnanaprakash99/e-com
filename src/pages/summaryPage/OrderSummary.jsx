import React from 'react'
import { useCart } from '../../components/context/CardContext';

const OrderSummary = () => {
    const { cartItems, incrementQuantity, decrementQuantity } = useCart();

    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    cartItems.forEach((item) => {
        subtotal += item.price * item.quantity;
        totalItems += item.quantity;
    });
    return (
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
    )
}

export default OrderSummary
