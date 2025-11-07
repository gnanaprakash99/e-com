import React, { useEffect } from "react";
import SummaryPageNumber from "./SummaryPageNumber";
import SummaryAddress from "./SummaryAddress";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
import ProductSummaryPage from "./ProductSummaryPage";

// Custom hook to detect screen size
const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const SummaryPage = () => {
  const { cartItems } = useCart();

  // ✅ scroll to top when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // check if screen is sm and up
  const isSmUp = useMediaQuery("(max-width: 640px)");

  const EmptyCart = () => (
    <div className="container mx-auto my-12 py-12 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md text-center bg-cardBg p-6 md:p-8 rounded-primaryRadius shadow">
          <h4 className="text-xl md:text-2xl font-semibold mb-6">
            No items in your cart
          </h4>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border text-buttonText bg-primaryBtn rounded-primaryRadius transition"
          >
            <i className="fa fa-arrow-left mr-2"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCheckout = () => {
    if (!isSmUp) {
      // Desktop flow
      return (
        <div>
          <SummaryPageNumber currentStep="Address" />
          <SummaryAddress />
        </div>
      );
    } else {
      // Mobile flow
      return (
        <div>
          <SummaryPageNumber currentStep="Product" />
          <ProductSummaryPage />
        </div>
      );
    }
  };

  return cartItems.length === 0 ? <EmptyCart /> : <ShowCheckout />;
};

export default SummaryPage;
