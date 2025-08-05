import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductCarouselView = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => setQuantity(prev => prev + 1);
  const handleRemove = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) return <div>No product data found</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-dark p-8 gap-8">
      {/* Left Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img src={product.image} alt={product.name} className="w-full max-w-lg object-cover rounded-lg shadow" />
      </div>

      {/* Right Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-xl text-secondaryText">Category: {product.category}</p>
        <p className="text-3xl font-semibold">₹{product.price}</p>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center border rounded-lg">
            <button onClick={handleRemove} className="px-4 py-2 text-xl">−</button>
            <span className="px-6 py-2 text-xl">{quantity}</span>
            <button onClick={handleAdd} className="px-4 py-2 text-xl">+</button>
          </div>
          <button className="bg-secondaryLite text-white px-6 py-3 rounded-lg text-lg font-medium">
            Add to Cart
          </button>
          <button className="bg-secondaryLite text-white px-6 py-3 rounded-lg text-lg font-medium">
            Go to Cart
          </button>
        </div>
        <div>
            <h2>Discription</h2>
            <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCarouselView;
