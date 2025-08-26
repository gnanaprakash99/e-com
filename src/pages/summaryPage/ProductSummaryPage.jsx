import React from 'react'
import OrderSummary from './OrderSummary'
import { useNavigate } from 'react-router-dom';

const ProductSummaryPage = () => {
    const navigate = useNavigate();

    // Handle navigation to address page
    const handlePaymentProcess = () => {
        navigate('/address');
    };

    return (
        <div className='p-2'>
            <OrderSummary />
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
    )
}

export default ProductSummaryPage
