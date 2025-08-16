import React from 'react';
import { useSelector } from 'react-redux';
import { useCategory } from '../context/CategoryContext';

const CategoryBar = () => {
    const categories = useSelector((state) => state.productCategory.productCategory);
    const { selectedCategory, setSelectedCategory } = useCategory();

    return (
        <div className="flex mt-3 justify-center border-b sticky top-[64px] z-40 bg-pageBg ">
            <div className="flex overflow-x-auto whitespace-nowrap gap-2 px-4 py-2 scrollbar-hide">
                {/* All button */}
                <button
                    onClick={() => setSelectedCategory('')}
                    className={`text-primaryText px-3 shrink-0 pb-1 border-b-2 transition-all duration-300 ease-in-out ${selectedCategory === '' ? 'border-secondaryLite font-semibold' : 'border-transparent'
                        }`}
                >
                    All
                </button>

                {/* Category buttons */}
                {categories.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedCategory(item)}
                        className={`text-primaryText px-3 shrink-0 pb-1 border-b-2 transition-all duration-300 ease-in-out ${selectedCategory === item ? 'border-secondaryLite font-semibold' : 'border-transparent'
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryBar;