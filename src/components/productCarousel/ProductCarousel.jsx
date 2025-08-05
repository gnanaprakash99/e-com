import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/Context';

const ProductCarousel = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const products = useSelector(state => state.ProductData.ProductData || []);

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Handle view button
  const handleView = (product) => {
    navigate('/productView', { state: { product } });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-5 justify-center text-dark">
      {filteredProducts.map((item, index) => (
        <div
          key={index}
          className="w-full max-w-sm bg-white border border-primaryborder rounded-primaryRadius shadow-sm"
        >
          <a href="#">
            <img
              className="p-8 rounded-t-primaryRadius w-full h-60 object-cover"
              src={item.image}
              alt={item.name}
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight">{item.name}</h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625..." />
                  </svg>
                ))}
                <svg
                  className="w-4 h-4 text-secondaryLite"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625..." />
                </svg>
              </div>
              <span className="bg-green text-teritaryLite text-xs font-semibold px-2.5 py-0.5 rounded-sm">
                5.0
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-dark">₹{item.price}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(item)}
                  className="text-white border bg-secondaryLite font-medium rounded-primaryRadius px-4 py-2"
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
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      )}
    </div>
  );
};

export default ProductCarousel;