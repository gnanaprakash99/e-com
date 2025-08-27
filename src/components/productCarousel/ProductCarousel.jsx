import { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductImageRotator from './ProductImageRotator';
import useProductCarousel from '../../hooks/useProductCarousel';

const ProductCarousel = ({ selectedProducts }) => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const products = useSelector((state) => state.ProductData.ProductData);

  // calling hooks
  const { isLoading, isError } = useProductCarousel();

  // Filter products by search query and category
  const filteredProducts = useMemo(() => {
    const query = searchQuery?.toLowerCase()?.trim() || '';

    if (selectedProducts && selectedProducts.length > 0) return selectedProducts;

    if (query) {
      return products.filter((product) => {
        const name = product?.name?.toLowerCase()?.trim() || '';
        const category = product?.category?.toLowerCase()?.trim() || '';
        return name.includes(query) || category.includes(query);
      });
    }

    return products;
  }, [selectedProducts, products, searchQuery]);

  // Handle view button
  const handleView = (product) => {
    navigate('/productView', { state: { product } });
  };

  // animation effect
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {filteredProducts.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="bg-white transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
        >
          {/* Sale badge */}
          <div className="relative h-60 w-full">
            {item.discount && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 z-10">
                {item.discount}% OFF
              </div>
            )}
            <ProductImageRotator images={item.image} name={item.name} />
          </div>

          {/* Content */}
          <div className="lg:p-4 flex flex-col flex-grow">
            <h3 className="text-base sm:text-lg text-left font-semibold text-gray-800 mb-2 line-clamp-2 ">
              {item.name || item.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`hidden lg:flex w-4 h-4 ${i < Math.round(item.rating?.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-2 py-0.5 rounded">
                {item.rating?.rate || '0.0'}
              </span>
              {item.rating?.count && (
                <span className="text-gray-500 text-xs ml-2">({item.rating.count})</span>
              )}
            </div>

            {/* Price + Button always aligned */}
            <div className="mt-auto">
              <div className="flex items-center ml-3 mb-3">
                <span className="text-lg sm:text-xl font-bold font-jkabode text-gray-900">₹{item.price}</span>
                {item.discount && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{Math.round(item.price / (1 - item.discount / 100))}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleView(item)}
                className="w-full bg-secondaryLite text-white py-2.5 rounded-lg font-medium transition-colors duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* No results */}
      {filteredProducts.length === 0 && (
        <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-lg">No products found.</p>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;