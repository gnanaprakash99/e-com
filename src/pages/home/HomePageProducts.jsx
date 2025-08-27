import React from "react";
import { useNavigate } from "react-router-dom";

const HomePageProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      title: "Pottery Paintings",
      desc: "Handcrafted pottery artworks blending tradition and creativity.",
      img: "https://scenebooking.com/wp-content/uploads/2024/11/Untitled-design-1-2.png?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Canvas Paintings",
      desc: "Timeless canvas art to elevate your home and office spaces.",
      img: "https://www.tallengestore.com/cdn/shop/products/AcrylicArt-Ganesha_1_a0983c03-4f37-457d-afa1-59db818d2669_grande.jpg?v=1603783936?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Pottery",
      desc: "Unique pottery pieces made with love by skilled artisans.",
      img: "https://images.pexels.com/photos/357428/pexels-photo-357428.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Water Colour Paintings",
      desc: "Elegant watercolor artworks capturing imagination & beauty.",
      img: "https://i0.wp.com/micheleclamp.com/wp-content/uploads/2022/02/IMG_4321-scaled.jpg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const handleExplore = () => {
    navigate("/products");
  };

  return (
    <section className="bg-[#f9f9f9] text-primaryText px-6 py-16 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Section - Intro Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Discover Artistry at{" "}
            <span className="text-secondaryText">HridyaTarangini</span>
          </h1>
          <p className="text-lg leading-relaxed text-mutedText">
            HridyaTarangini is your curated destination for{" "}
            <span className="font-medium">handcrafted art</span>,{" "}
            <span className="font-medium">unique décor</span>, and{" "}
            <span className="font-medium">creative expression</span>. From
            timeless paintings to elegant pottery, we bring you masterpieces
            that connect culture, craftsmanship, and creativity.
          </p>
          <button
            onClick={handleExplore}
            className="bg-secondaryText text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-secondaryText/90 transition"
          >
            Explore Collection
          </button>
        </div>

        {/* Right Section - Product Highlights */}
        <div className="sm:grid sm:grid-cols-2 sm:gap-6 flex gap-4 overflow-x-auto scrollbar-hide">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[240px] bg-white border rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-mutedText mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageProducts;