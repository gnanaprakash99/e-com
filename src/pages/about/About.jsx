import React from "react";

const About = () => {
  const products = [
    {
      title: "Pottery Paintings",
      img: "https://scenebooking.com/wp-content/uploads/2024/11/Untitled-design-1-2.png?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Canvas Paintings",
      img: "https://www.tallengestore.com/cdn/shop/products/AcrylicArt-Ganesha_1_a0983c03-4f37-457d-afa1-59db818d2669_grande.jpg?v=1603783936?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Pottery",
      img: "https://images.pexels.com/photos/357428/pexels-photo-357428.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Water Colour Paintings",
      img: "https://i0.wp.com/micheleclamp.com/wp-content/uploads/2022/02/IMG_4321-scaled.jpg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <>
      <div className="text-primaryText font-sans px-4 py-8 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
          <div className="w-20 mx-auto border-b-2 border-mutedText mb-6"></div>
          <p className="text-lg text-center leading-relaxed mb-10">
            Welcome to <span className="font-semibold text-secondaryText">HridyaTarangini</span>, your curated destination
            for handcrafted artistry, creative expression, and premium-quality
            goods. We are more than just an e-commerce store — we’re a vibrant
            community that connects passionate artists with appreciative buyers
            from around the world.
            <br /><br />
            At HridyaTarangini, we believe in celebrating originality. Every product
            featured on our platform is thoughtfully designed, ethically
            crafted, and artist-approved. Whether you're looking for timeless
            wall art, elegant décor, or one-of-a-kind handmade gifts, you'll
            find something truly special here.
            <br /><br />
            We are committed to sustainability, quality, and supporting
            independent creators. With a seamless shopping experience, secure
            payment gateways, and responsive customer service, HridyaTarangini ensures
            every step of your journey is inspired and hassle-free.
            <br /><br />
            Join us in redefining how the world discovers and supports creative
            talent — one masterpiece at a time.
          </p>

          <h2 className="text-3xl font-semibold text-center mb-6">Our Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item, idx) => (
              <div
                key={idx}
                className="bg-cardBg border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-44 rounded-t-xl overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h5 className="text-lg font-semibold text-primaryText">
                    {item.title}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
