import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  const addItem = () => {

  };
  const removeItem = (product) => [

  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="w-full max-w-md bg-white p-8 rounded-primaryRadius shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
          <div className="text-center py-6">
            <h3 className="text-lg mb-4">Your cart is empty</h3>
            <button
            className="mx-auto block bg-teritaryLite text-white font-semibold py-2 px-6 rounded-primaryRadius transition duration-200"
              onClick={onClose}
            >
               Continue Shopping
            </button>
          </div>
      </div>
    </div>
  );
};

export default Cards;
