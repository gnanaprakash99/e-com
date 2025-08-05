import { useMemo,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  // animation effect
    useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, 
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-4 my-3 justify-center text-dark">
      {filteredProducts.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="w-full max-w-sm bg-cardBg border border-primaryborder rounded-primaryRadius hover:shadow-2xl duration-300 transition-shadow shadow-lg"
        >
          <a href="#">
            <img
              className="p-5 rounded-t-primaryRadius w-full text-mutedText h-60 object-cover"
              src={item.image}
              alt={item.name}
            />
          </a>
          <div className="px-5 pb-3">
            <a href="#">
              <h5 className="text-xl text-primaryText text-center font-semibold tracking-tight">{item.name}</h5>
            </a>
            <div className="flex items-center my-3">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(item.rating) ? 'text-secondaryLite' : 'text-mutedText'
                      }`}
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.567-.955L10 0l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="bg-teritaryLite text-secondaryLite text-xs font-semibold px-2.5 py-0.5 rounded-sm ml-2">
                {item.rating?.toFixed(1) || "0.0"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primaryText">₹{item.price}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(item)}
                  className="text-buttonText border bg-primaryBtn font-medium rounded-primaryRadius px-4 py-2"
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