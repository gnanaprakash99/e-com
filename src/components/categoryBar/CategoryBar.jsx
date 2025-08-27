import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const CategoryBar = () => {
    const categories = useSelector((state) => state.productCategory.productCategory);
    const [selectedCategory, setSelectedCategory] = useState('');

    const scrollRef = React.useRef(null);
    const navigate = useNavigate();

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    const handleSelectedCategory = (categoryName) => {
        navigate('/selectedCategory', { state: { category: categoryName.toLowerCase().trim() } });
    };


    return (
        <div className="w-full my-6">
            {/* Title with arrows */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <button
                    onClick={() => scroll("left")}
                    className="p-2 rounded-full hover:bg-gray-200"
                >
                    <IoChevronBack size={20} />
                </button>
                <h1 className="font-medium text-lg text-center">WHAT WE HAVE</h1>
                <button
                    onClick={() => scroll("right")}
                    className="p-2 rounded-full hover:bg-gray-200"
                >
                    <IoChevronForward size={20} />
                </button>
            </div>

            {/* Categories list */}
            <div
                ref={scrollRef}
                className="flex gap-4 px-6 overflow-x-auto scrollbar-hide"
            >
                {categories.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleSelectedCategory(item.categoryName)}
                        className="flex-shrink-0 cursor-pointer w-1/2 sm:w-1/3 lg:w-1/4 px-2"
                    >
                        {/* Image */}
                        <div className="w-full h-40 sm:h-56 lg:h-64 overflow-hidden rounded-lg shadow-md">
                            <img
                                src={item.categoryImage}
                                alt={item.categoryName}
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                        </div>

                        {/* Name */}
                        <h1
                            className={`mt-3 text-center font-bold text-base ${selectedCategory?.id === item.id
                                    ? "font-semibold text-secondaryLite"
                                    : "text-gray-800"
                                }`}
                        >
                            {item.categoryName.toUpperCase()}
                        </h1>

                        {/* Product count */}
                        <h2 className="text-center text-sm text-primaryText">
                            {item.count || Math.floor(Math.random() * 120) + 10} products
                        </h2>
                    </div>
                ))}
            </div>

            {/* Hide scrollbar cross-browser */}
            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default CategoryBar;
