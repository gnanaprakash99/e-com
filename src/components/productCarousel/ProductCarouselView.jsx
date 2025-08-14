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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!product) return <div>No product data found</div>;

    const images = Array.isArray(product.image) ? product.image : [product.image];

    const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    const handleNext = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

    const handleAdd = () => setQuantity(prev => prev + 1);
    const handleRemove = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    const handleAddToCart = () => addToCart(product, quantity);
    const handleBuyNow = () => navigate('/cart');
    const handleDeleteConfirm = () => {
        setShowDeleteModal(false);
        navigate('/');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 sm:p-6 lg:p-8 gap-6">
            {/* Image Carousel */}
            <div className="w-full md:w-1/2 flex justify-center items-center relative">
                <img
                    src={images[currentIndex]}
                    alt={`Product Image ${currentIndex + 1}`}
                    className="w-full max-w-sm sm:max-w-md md:max-w-lg object-cover rounded-primaryRadius bg-productCardBg p-4 sm:p-6 md:p-10 shadow"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full text-lg sm:text-xl"
                        >
                            ‹
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full text-lg sm:text-xl"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 sm:gap-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {product.name || product.title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-secondaryText">
                    Category: {product.category}
                </p>
                <p className="text-2xl sm:text-3xl font-semibold">₹{product.price}</p>

                {/* Quantity & Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4">
                    <div className="flex items-center border rounded-lg">
                        <button onClick={handleRemove} className="px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl">−</button>
                        <span className="px-4 sm:px-6 py-1 sm:py-2 text-lg sm:text-xl">{quantity}</span>
                        <button onClick={handleAdd} className="px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl">+</button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-primaryBtn text-buttonText h-10 sm:h-primaryHeight px-4 sm:w-primaryWidth rounded-primaryRadius text-sm sm:text-lg font-medium border border-buttonBorder hover:scale-105 transition-transform"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="bg-secondaryBtn text-buttonText2 h-10 sm:h-primaryHeight px-4 sm:w-primaryWidth rounded-primaryRadius text-sm sm:text-lg font-medium border border-buttonBorder hover:scale-105 transition-transform"
                    >
                        Buy Now
                    </button>
                    {!permissions.deleteProduct && (
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-deleteBtn text-buttonText2 h-10 sm:h-primaryHeight px-4 sm:w-primaryWidth rounded-primaryRadius text-sm sm:text-lg font-medium border border-buttonBorder hover:scale-105 transition-transform"
                        >
                            Delete
                        </button>
                    )}
                </div>

                {/* Description */}
                <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">Description</h2>
                    <p className="text-sm sm:text-base text-secondaryText">{product.description}</p>
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
