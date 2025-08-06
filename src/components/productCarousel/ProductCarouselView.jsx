import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CardContext';
import { getPermissions } from '../../utils/UserPermission';
import Delete from '../delete/Delete';

const ProductCarouselView = () => {
    const location = useLocation();
    const product = location.state?.product;
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const permissions = getPermissions();

    const [quantity, setQuantity] = useState(1);
    const handleAdd = () => setQuantity((prev) => prev + 1);
    const handleRemove = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Carousel State
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!product) return <div>No product data found</div>;

    const images = Array.isArray(product.image) ? product.image : [product.image];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleBuyNow = () => {
        navigate('/cart');
    };

    const handleDeleteConfirm = () => {
        setShowDeleteModal(false);
        navigate('/');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-8 gap-8">
            <div className="w-full md:w-1/2 flex justify-center items-center relative">
                {/* Image Carousel */}
                <img
                    src={images[currentIndex]}
                    alt={`Product Image ${currentIndex + 1}`}
                    className="w-full max-w-lg object-cover rounded-lg shadow"
                />

                {images.length > 1 && (
                    <>
                        {/* Previous Button */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full"
                        >
                            ‹
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Right Side: Details */}
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
                    {!permissions.deleteProduct && (
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-deleteBtn text-buttonText h-primaryButton w-primaryButton rounded-primaryRadius text-lg font-medium"
                        >
                            Delete
                        </button>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-semibold">Description</h2>
                    <p className='text-secondaryText'>{product.description}</p>
                </div>
            </div>

            {/* Delete Modal */}
            <Delete
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};

export default ProductCarouselView;