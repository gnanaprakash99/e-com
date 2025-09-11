import React from "react";
import LazyImage from "../../components/loader/LazyImage";

const TopSelling = () => {
  const products = [
    {
      title: "Abstract Canvas",
      price: "₹2,499",
      img: "https://rukminim2.flixcart.com/image/704/844/kkcwo7k0/poster/4/z/6/extra-large-abstract-painting-print-waterproof-canvas-poster-24-original-imafzq3muggpq5kk.jpeg?q=90&crop=false",
    },
    {
      title: "Handcrafted Pottery",
      price: "₹1,899",
      img: "https://u-mercari-images.mercdn.net/photos/m50632315278_1.jpg",
    },
    {
      title: "Watercolour Artwork",
      price: "₹1,299",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoG_diADDzjHMVU0jNNZQ17PD7TjGcnqUYA&s",
    },
    {
      title: "Pottery Painting",
      price: "₹2,999",
      img: "https://m.media-amazon.com/images/I/81i-nqT6adL.jpg",
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
                <LazyImage
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