import React from 'react'
import SummaryPageNumber from './SummaryPageNumber'
import SummaryAddress from './SummaryAddress'
import { useCart } from '../../components/context/CardContext';
import { Link } from 'react-router-dom';

const SummaryPage = () => {

    // Check if cart is empty
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

    // ShowCheckout component to display the summary page
    const { cartItems } = useCart();
    const ShowCheckout = () => {
        return (
            <div>
                <SummaryPageNumber currentStep="Address" />
                <div>
                    <SummaryAddress />
                </div>
            </div>
        )
    }
    return cartItems.length === 0 ? <EmptyCart /> : <ShowCheckout />;
}

export default SummaryPage
