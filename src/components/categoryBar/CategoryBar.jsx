import React, { useState, useMemo } from 'react';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import LazyImage from '../loader/LazyImage';
import useProduct from '../../hooks/useProduct';
import useCategory from '../../hooks/useCategory';

const CategoryBar = () => {
  const { products = [], isLoading } = useProduct();
  const { categories = [] } = useCategory();

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
    navigate('/selectedCategory', {
      state: { category: categoryName.toLowerCase().trim() },
    });
  };

  // ✅ Filter only ACTIVE categories
  const activeCategories = useMemo(() => {
    return categories.filter((cat) => cat.status === "ACTIVE");
  }, [categories]);

  // ✅ Count products per ACTIVE category
  const categoryCounts = useMemo(() => {
    const counts = {};

    products.forEach((p) => {
      const categoryId = p.category;

      const catObj = activeCategories.find((c) => c.id === categoryId);
      const catName = catObj?.category_name?.toLowerCase()?.trim();

      if (catName) {
        counts[catName] = (counts[catName] || 0) + 1;
      }
    });

    return counts;
  }, [products, activeCategories]);

  if (isLoading) return <p className="text-center my-10">Loading categories...</p>;

  return (
    <div className="w-full my-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button onClick={() => scroll("left")} className="p-2 rounded-full hover:bg-gray-200">
          <IoChevronBack size={20} />
        </button>

        <h1 className="font-medium text-lg text-center">WHAT WE HAVE</h1>

        <button onClick={() => scroll("right")} className="p-2 rounded-full hover:bg-gray-200">
          <IoChevronForward size={20} />
        </button>
      </div>

      {/* ACTIVE Category List */}
      <div ref={scrollRef} className="flex gap-4 px-6 overflow-x-auto scrollbar-hide">
        {activeCategories.map((item) => {
          const key = item.category_name?.toLowerCase().trim();
          const count = categoryCounts[key] || 0;

          return (
            <div
              key={item.id}
              onClick={() => handleSelectedCategory(item.category_name)}
              className="flex-shrink-0 cursor-pointer w-1/2 sm:w-1/3 lg:w-1/4 px-2"
            >
              <div className="w-full h-40 sm:h-56 lg:h-64 overflow-hidden rounded-lg shadow-md">
                <LazyImage
                  src={item.image}
                  alt={item.category_name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>

              <h1 className="mt-3 text-center font-bold text-base text-gray-800">
                {item.category_name.toUpperCase()}
              </h1>

              <h2 className="text-center text-sm text-primaryText">
                {count} products
              </h2>
            </div>
          );
        })}
      </div>

      {/* Scrollbar Hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CategoryBar;