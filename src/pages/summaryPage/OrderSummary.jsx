import React from 'react';
import { useSelector } from 'react-redux';
import useCart from '../../hooks/useCart';

const OrderSummary = () => {
    const { cartItems } = useCart();

    // 🟢 Get direct buy item from Redux
    const directBuyItem = useSelector((state) => state.DirectBuy.item);

    // 🟢 If direct buy exists → show only direct buy item
    // 🟢 Else → show all cart items
    const itemsToShow = directBuyItem ? [directBuyItem] : cartItems;

    // 🟢 Calculate totals
    const subtotal = itemsToShow.reduce(
        (sum, item) => sum + item.product.price * (item?.quantity || item?.product?.quantity),
        0
    );

    const totalItems = itemsToShow.reduce(
        (sum, item) => sum + (item.product.quantity || item.quantity),
        0
    );

    const shipping = 30;

    return (
        <div className="w-full max-w-[500px] bg-cardBg text-primaryText rounded-primaryRadius shadow-md">
            {/* Header */}
            <div className="bg-secondaryLite text-center px-4 py-3 rounded-t-xl">
                <h3 className="text-base md:text-lg font-semibold">Order Summary</h3>
            </div>

            {/* Items */}
            <div className="p-4 space-y-4 border-b border-mutedText">
                {itemsToShow.map((item) => (
                    <div key={item.id} className="border-b pb-3 last:border-none flex gap-4">
                        <img
                            src={Array.isArray(item.product.image) ? item.product.image[0] : item.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-primaryRadius"
                        />
                        <div className="flex-1">
                            <h4 className="font-semibold text-sm md:text-lg">{item.product.name}</h4>
                            <p className="text-xs md:text-sm font-jkabode text-secondaryText">
                                ₹{item.product.price} × {item.product.quantity || item.quantity} = ₹{item.product.price * (item?.quantity || item?.product?.quantity)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="p-4 space-y-3">
                <div className="flex justify-between">
                    <span>Products ({totalItems})</span>
                    <span className="font-semibold">₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">₹{shipping}</span>
                </div>

                <div className="flex justify-between pt-3 font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{subtotal + shipping}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
