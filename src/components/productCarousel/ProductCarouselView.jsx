import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CardContext';
import { CiDeliveryTruck } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const ProductCarouselView = () => {
    const location = useLocation();
    const product = location.state?.product;
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [checkDeliveryDate, setCheckDeliveryDate] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Add this state for the reviews modal
    const [showReviewsModal, setShowReviewsModal] = useState(false);

    // Inside your component
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Motion variants
    const modalVariants = {
        hidden: isLargeScreen
            ? { x: "100%" } // slide from right
            : { y: "100%" }, // slide from bottom
        visible: { x: 0, y: 0 },
        exit: isLargeScreen
            ? { x: "100%" }
            : { y: "100%" },
    };

    // Sample reviews data 
    const reviews = [
        {
            id: 1,
            author: "THANUSH KUMAR V",
            date: "Posted on 31 Jul 2024",
            content: "Super very nice product shop under was above 350to 500 rs very cheap and best quality was very nice thank you messho",
            helpful: 65,
            rating: '2.9'
        },
        {
            id: 2,
            author: "Krishna singh rautela",
            date: "Posted on 18 June 2024",
            content: "Saman thik hal...aap le sakte ho 10 strips hai es kit me.and 1 glue wala euber scruber milta to as pictured to echhaa rehta....saman ober all tlik diya h dhanyawad mesho or mesho partners.",
            helpful: 100,
            rating: '3.5'
        },
        {
            id: 3,
            author: " KUMAR V",
            date: "Posted on 22 Jul 2024",
            content: "Super very nice product shop under was above 350to 500 rs very cheap and best quality was very nice thank you messho",
            helpful: 36,
            rating: '1.3'
        },
        {
            id: 4,
            author: "Krishna ",
            date: "Posted on 1 June 2024",
            content: "Saman thik hal...aap le sakte ho 10 strips hai es kit me.and 1 glue wala euber scruber milta to as pictured to echhaa rehta....saman ober all tlik diya h dhanyawad mesho or mesho partners.",
            helpful: 22,
            rating: '4.3'
        },
        {
            id: 5,
            author: "Rahul ",
            date: "Posted on 1 June 2024",
            content: "Saman thik hal...aap le sakte ho 10 strips hai es kit me.and 1 glue wala euber scruber milta to as pictured to echhaa rehta....saman ober all tlik diya h dhanyawad mesho or mesho partners.",
            helpful: 731,
            rating: '4.9'
        },
    ];

    if (!product) return <div>No product data found</div>;

    const images = Array.isArray(product.image) ? product.image : [product.image];
    console.log('object', images)

    const handlePrev = () =>
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    const handleNext = () =>
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

    // add to cart
    const handleAddToCart = () => addToCart(product, quantity);

    // buy now
    const handleBuyNow = () => navigate('/checkout');

    // finding delivery date
    const handleDeliveryDate = () => {
        setCheckDeliveryDate(true);
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 sm:p-6 lg:p-8 gap-6">
            {/* Image Carousel */}
            <div className="w-full md:w-1/2 flex justify-center items-start relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex} // ensures animation triggers on change
                        src={images[currentIndex]}
                        alt={`Product Image ${currentIndex + 1}`}
                        className="w-full max-w-sm sm:max-w-md md:max-w-lg object-cover 
                 rounded-primaryRadius bg-productCardBg 
                 p-4 sm:p-6 md:p-10 sm:m-20 lg:m-0 shadow"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                {/* Show Prev/Next only if multiple images */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute top-2/4 sm:top-1/4 left-3 -translate-y-1/2 
           bg-black/40 text-white w-10 h-10 sm:w-12 sm:h-12 
           flex items-center justify-center rounded-full 
           text-2xl sm:text-3xl hover:bg-black/60 transition"
                        >
                            ‹
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute top-2/4 sm:top-1/4 right-3 -translate-y-1/2 
           bg-black/40 text-white w-10 h-10 sm:w-12 sm:h-12 
           flex items-center justify-center rounded-full 
           text-2xl sm:text-3xl hover:bg-black/60 transition"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 sm:gap-6">
                <div className="text-primaryText bg-productCardBg border rounded-primaryRadius shadow-cardShadow p-4 sm:p-6 lg:p-8">
                    {/* Product Name */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                        {product.name || product.title}
                    </h1>

                    {/* Category + Rating */}
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                        <p className="text-base sm:text-lg lg:text-xl text-secondaryText">
                            Category: {product.category}
                        </p>
                        <span className="bg-secondaryLite text-productCartRatingText text-xs font-semibold px-2 py-0.5 rounded-secondaryRadius">
                            {product.rating?.rate || '0.0'}
                        </span>
                        <span className="text-mutedText text-xs font-semibold">
                            ({product.rating?.count || 0})
                        </span>
                    </div>

                    {/* Price */}
                    <p className="text-2xl sm:text-3xl font-jkabode font-semibold">₹{product.price}</p>
                </div>

                {/* Quantity & Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4">
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
                </div>

                {/* Description */}
                <div className="text-primaryText bg-productCardBg border rounded-primaryRadius shadow-cardShadow p-4 sm:p-6 lg:p-8">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                        Description
                    </h2>
                    <p className="text-sm sm:text-base text-secondaryText">
                        {product.description}
                    </p>
                </div>

                {/* Delivery Check Section */}
                <div className="text-primaryText bg-cardBg border rounded-primaryRadius shadow-cardShadow p-4 sm:p-6 lg:p-8">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3">
                        Check Delivery Date
                    </h2>

                    <div className="flex items-center gap-2 border-b pb-2 mb-3">
                        <input
                            type="text"
                            placeholder="Enter Delivery Pincode"
                            className="flex-1 border-none focus:ring-0 text-base text-secondaryText"
                        />
                        <button
                            onClick={handleDeliveryDate}
                            className="text-primary font-semibold"
                        >
                            CHECK
                        </button>
                    </div>

                    <div className="space-y-2 font-bold text-xl sm:text-base">
                        <div className="flex items-center gap-2">
                            <CiDeliveryTruck />
                            {checkDeliveryDate ? (
                                <span className="material-icons">
                                    Delivered within 10days
                                </span>
                            ) : (
                                <span className="material-icons">
                                    Enter Pincode for Estimated Delivery Date
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Ratings & Reviews Section */}
                <div className="text-primaryText bg-cardBg border rounded-primaryRadius shadow-cardShadow p-4 sm:p-6 lg:p-8">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
                        Product Ratings & Reviews
                    </h2>

                    <div className="flex gap-6 border-b pb-2 mb-3">
                        {/* Overall Rating */}
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-4xl sm:text-5xl font-bold text-green-600 flex items-center">
                                {product.rating?.rate || '0.0'}
                            </p>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="flex-1 space-y-2">
                            {[
                                { label: 'Excellent', color: 'bg-green-600', value: 6685 },
                                { label: 'Very Good', color: 'bg-green-500', value: 2459 },
                                { label: 'Good', color: 'bg-yellow-500', value: 1792 },
                                { label: 'Average', color: 'bg-orange-500', value: 555 },
                                { label: 'Poor', color: 'bg-red-500', value: 1337 },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-20 text-sm">{item.label}</span>
                                    <div className="flex-1 bg-gray-200 h-2 rounded">
                                        <div
                                            className={`${item.color} h-2 rounded`}
                                            style={{ width: `${(item.value / 6685) * 100}%` }}
                                        />
                                    </div>
                                    <span className="w-12 text-right text-sm">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 ">
                        <button
                            onClick={() => setShowReviewsModal(true)}
                            className="mx-auto block bg-primaryBtn border-[1px] border-buttonBorder text-buttonText font-semibold py-2 px-6 rounded-primaryRadius  cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50  transform duration-300 ease-in-out "
                        >
                            See All Reviews
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Modal */}
            <AnimatePresence>
                {showReviewsModal && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-pageBg rounded-l-primaryRadius mt-10 lg:mt-0 lg:w-1/2 max-w-3xl max-h-full overflow-hidden flex flex-col"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Modal Header */}
                            <div className="bg-cardBg p-4 border-b flex justify-between items-center">
                                <h3 className="text-xl font-bold">{product.name || product.title}</h3>
                                <button
                                    onClick={() => setShowReviewsModal(false)}
                                    className="text-mutedText hover:text-cancelButton"
                                >
                                    <IoClose size={24} />
                                </button>
                            </div>

                            {/* Reviews Content */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {reviews.map(review => (
                                    <div key={review.id} className="mb-6 pb-6 border-b">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold">
                                                {review.author}
                                                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mx-3 px-2 py-0.5 rounded">
                                                    {review.rating}
                                                </span>
                                            </h4>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                        <p className="mb-2">{review.content}</p>
                                        <div className="text-sm text-gray-500">
                                            Helpful {`(${review.helpful})`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductCarouselView;