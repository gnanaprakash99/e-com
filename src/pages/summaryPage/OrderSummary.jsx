import React, { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';

const OrderSummary = () => {
    const { cartItems } = useCart();
    const [directBuyItem, setDirectBuyItem] = useState(null);

    useEffect(() => {
        const savedItem = localStorage.getItem("directBuyItem");
        if (savedItem) setDirectBuyItem(JSON.parse(savedItem));
    }, []);

    const itemsToShow = directBuyItem ? [directBuyItem] : cartItems;

    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    itemsToShow.forEach((item) => {
        subtotal += item.price * item.quantity;
        totalItems += item.quantity;
    });

    return (
        <div className="w-full max-w-[500px] bg-cardBg text-primaryText rounded-primaryRadius shadow-md">
            <div className="bg-secondaryLite text-center px-4 py-3 sm:px-6 sm:py-4 rounded-t-xl">
                <h3 className="text-base md:text-lg font-semibold">Order Summary</h3>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-4 border-b border-mutedText">
                    {itemsToShow.map((item) => (
                        <>
                            <div key={item.id} className="border-b pb-3 last:border-0 last:pb-0">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                    <div className="flex gap-3 w-full sm:w-2/3">
                                        {item.image && (
                                            <img
                                                src={Array.isArray(item.image) ? item.image[0] : item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-primaryRadius"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h4 className="text-sm md:text-lg font-semibold">{item.name}</h4>
                                            <p className="text-xs md:text-sm font-jkabode text-secondaryText">
                                                ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold font-jkabode">₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>

                <div className="flex flex-col border-b border-mutedText">
                    <div className="flex justify-between pt-2">
                        <span>Products ({totalItems})</span>
                        <span className="font-semibold font-jkabode">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                        <span>Shipping</span>
                        <span className="font-semibold font-jkabode">₹{shipping.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="font-jkabode">₹{(subtotal + shipping).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;