import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LazyImage from "../../components/loader/LazyImage";
import useProduct from "../../hooks/useProduct";
import ProductImageRotator from "../../components/productCarousel/ProductImageRotator";

const OurProducts = () => {
  const { products = [], isLoading } = useProduct();
  const navigate = useNavigate();

  const ourProducts = useMemo(() => {
    if (!products.length) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, [products]);

  const handleProductClick = (product) => {
    navigate("/productView", { state: { product } });
  };

  if (isLoading) return <div className="py-12 text-center">Loading...</div>;
  if (ourProducts.length === 0)
    return <div className="py-12 text-center">No products</div>;

  return (
    <section className="px-6 py-12 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-center font-bold mb-6">
          Our Products
        </h2>

        {/* ALWAYS SCROLLABLE ON ALL SCREEN SIZES */}
        <div className=" flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {ourProducts.map((item) => {
            const images = item.image?.map((img) => img.image_url) || [];

            return (
              <div
                key={item.id}
                onClick={() => handleProductClick(item)}
                className="
                  min-w-[220px] sm:min-w-[250px] lg:min-w-[280px] max-w-[250px]
                  bg-white rounded-xl shadow hover:shadow-lg border
                  transition duration-300 cursor-pointer shrink-0
                "
              >
                <div className="h-44 w-full overflow-hidden rounded-t-xl">
                  <ProductImageRotator
                    images={images}
                    name={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {item.name}
                  </h3>
                  <p className="text-secondaryText font-medium mt-1">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OurProducts;
