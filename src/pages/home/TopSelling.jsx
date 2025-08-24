import React from "react";

const TopSelling = () => {
  const products = [
    {
      title: "Abstract Canvas",
      price: "₹2,499",
      img: "https://www.tallengestore.com/cdn/shop/products/AcrylicArt-Ganesha_1_a0983c03-4f37-457d-afa1-59db818d2669_grande.jpg?v=1603783936?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Handcrafted Pottery",
      price: "₹1,899",
      img: "https://images.pexels.com/photos/357428/pexels-photo-357428.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Watercolour Artwork",
      price: "₹1,299",
      img: "https://i0.wp.com/micheleclamp.com/wp-content/uploads/2022/02/IMG_4321-scaled.jpg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Pottery Painting",
      price: "₹2,999",
      img: "https://scenebooking.com/wp-content/uploads/2024/11/Untitled-design-1-2.png?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <section className="px-6 py-12 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-center font-bold mb-6">Top Selling Products</h2>

        {/* Horizontal Scroll Wrapper */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[220px] bg-white rounded-xl shadow hover:shadow-lg border transition duration-300"
            >
              <div className="h-44 w-full overflow-hidden rounded-t-xl">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-secondaryText font-medium mt-1">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSelling;