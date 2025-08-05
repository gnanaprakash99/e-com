import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CardContext';

const ProductCarouselView = () => {
    const location = useLocation();
    const product = location.state?.product;
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => setQuantity((prev) => prev + 1);
    const handleRemove = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    if (!product) return <div>No product data found</div>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleBuyNow = () => {
        navigate('/cart');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-8 gap-8">
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <img src={product.image} alt={product.name} className="w-full max-w-lg object-cover rounded-lg shadow" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <p className="text-xl text-secondaryText">Category: {product.category}</p>
                <p className="text-3xl font-semibold">₹{product.price}</p>

                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-lg">
                        <button onClick={handleRemove} className="px-4 py-2 text-xl">−</button>
                        <span className="px-6 py-2 text-xl">{quantity}</span>
                        <button onClick={handleAdd} className="px-4 py-2 text-xl">+</button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-primaryBtn text-buttonText h-primaryButton w-primaryButton rounded-primaryRadius text-lg font-medium"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="bg-secondaryBtn text-buttonText h-primaryButton w-primaryButton rounded-primaryRadius text-lg font-medium"
                    >
                        Buy Now
                    </button>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold">Description</h2>
                    <p className='text-secondaryText'>{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCarouselView;
