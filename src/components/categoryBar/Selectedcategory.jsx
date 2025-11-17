import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCarousel from '../productCarousel/ProductCarousel';
import { IoFilter } from "react-icons/io5";
import useProduct from '../../hooks/useProduct';
import useCategory from '../../hooks/useCategory';

const SelectedCategory = () => {
  const location = useLocation();
  const selectedCategory = location.state?.category || '';

  const { products } = useProduct();
  const { categories = [] } = useCategory();   // ✅ Use API Categories

  const [openFilter, setOpenFilter] = useState(false);
  const [sortByPrice, setSortByPrice] = useState('none');
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Create mapping { category_id: "category_name" }
  const CATEGORY_MAP = useMemo(() => {
    const map = {};
    categories.forEach(c => {
      map[c.id] = c.category_name.toLowerCase().trim();  // FIXED NAME
    });
    return map;
  }, [categories]);

  // ✅ Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!products?.length) return [];

    let filtered = products.filter((p) => {
      const productCategoryName = CATEGORY_MAP[p.category]; // FIXED
      return productCategoryName === selectedCategory;
    });

    if (sortByPrice === 'asc') filtered.sort((a, b) => a.price - b.price);
    if (sortByPrice === 'desc') filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [products, selectedCategory, sortByPrice, CATEGORY_MAP]);

  return (
    <div className="my-6 text-center">
      <div className="flex items-center justify-between p-3 mb-4 relative">
        <h1 className="font-semibold text-2xl">
          {selectedCategory.toUpperCase() || "No Category Selected"}
        </h1>

        {/* Filter Button */}
        <div className="flex justify-end relative">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="flex gap-2 items-center border border-buttonBorder p-1"
          >
            Filter By <IoFilter />
          </button>

          {openFilter && (
            <div
              ref={filterRef}
              className="absolute top-full right-0 mt-2 w-52 bg-white border py-4 shadow-lg rounded-md z-50"
            >
              <h2 className="font-semibold border-b mb-2 px-3">
                Filter Products
              </h2>
              <div className="flex flex-col gap-2 px-3">
                <button onClick={() => setSortByPrice('asc')}
                  className={sortByPrice === 'asc' ? 'bg-blue-500 text-white rounded px-3 py-1' : 'hover:bg-[#e3e2e2] rounded px-3 py-1'}>
                  Price, Low to High
                </button>
                <button onClick={() => setSortByPrice('desc')}
                  className={sortByPrice === 'desc' ? 'bg-blue-500 text-white rounded px-3 py-1' : 'hover:bg-[#e3e2e2] rounded px-3 py-1'}>
                  Price, High to Low
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductCarousel selectedProducts={filteredProducts} />
      ) : (
        <p className="text-gray-500 mt-6">No products found in this category.</p>
      )}
    </div>
  );
};

export default SelectedCategory;