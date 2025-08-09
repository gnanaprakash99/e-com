import { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useCategory } from '../context/CategoryContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductImageRotator from './ProductImageRotator';
import useProductCarousel from '../../hooks/useProductCarousel';

const ProductCarousel = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const { selectedCategory } = useCategory();
  const products = useSelector(state => state.ProductData.ProductData);

  // calling hooks
  const { isLoading, isError } = useProductCarousel();

  // Filter products by search query and category bar
  const filteredProducts = useMemo(() => {
    const query = searchQuery?.toLowerCase?.() || "";

    return products.filter((product) => {
      const name = product?.name?.toLowerCase?.() || "";
      const category = product?.category?.toLowerCase?.() || "";

      const matchesQuery =
        name.includes(query) || category.includes(query);

      const matchesCategory = selectedCategory
        ? category.trim() === selectedCategory.toLowerCase().trim()
        : true;

      return matchesQuery && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Handle view button
  const handleView = (product) => {
    navigate('/productView', { state: { product } });
  };

  // animation effect
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-10 my-3 justify-center text-dark">
      {filteredProducts.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="w-full max-w-xs text-primaryText bg-productCardBg border border-productCartBorder rounded-primaryRadius duration-300 transition-shadow shadow-cardShadow hover:shadow-hoverCardShadow"
        >
          {/* Image Carousel */}
          <ProductImageRotator images={item.image} name={item.name} />

          <div className="px-3 pb-2">
            <a href="#">
              <h5 className="text-lg text-primaryText text-center font-semibold tracking-tight">{item.name || item.title}</h5>
            </a>
            <div className="flex items-center my-2">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.round(item.rating?.rate) ? 'text-ratingStarcolor' : 'text-productCartMutedcolor'}`}
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.567-.955L10 0l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="bg-secondaryLite text-productCartRatingText text-xs font-semibold px-2 py-0.5 rounded-sm ml-2">
                {item.rating?.rate || "0.0"}
              </span>
              {item.rating?.count && (
                <span className="text-mutedText text-xs font-semibold py-0.5 rounded-sm ml-2">
                  {`(${item.rating.count})`}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primaryText">₹{item.price}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleView(item)}
                  className="text-buttonText border bg-primaryBtn text-sm font-medium rounded-primaryRadius px-3 py-1.5"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Optional: No results message */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-mutedText mt-6">No products found.</p>
      )}
    </div>
  );
};

export default ProductCarousel;