import React from 'react';
import { useSelector } from 'react-redux';

const CategoryBar = () => {
    const categories = useSelector((state) => state.productCategory.productCategory);

    return (
        <div className="flex mt-5 justify-center">
            <div className="flex overflow-x-auto whitespace-nowrap gap-2 px-4 py-2 scrollbar-hide">
                {categories.map((item, index) => (
                    <button
                        key={index}
                        className="bg-gray-200 px-4 py-2 rounded-primaryRadius hover:bg-gray-300 shrink-0"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryBar;
