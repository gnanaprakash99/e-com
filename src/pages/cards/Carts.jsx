import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { FaSpinner } from "react-icons/fa";
import { updateStatus } from '../../utils/ApiRoutes';
import toast from 'react-hot-toast';

const Carts = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCartMutation } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleRemove = (id, quantity) => {
    const cartData = {
      product_id: id,
      quantity: quantity,
    };
    removeFromCartMutation.mutate(cartData);

  }

  const handleContinueShopping = () => {
    onClose();
    navigate('/');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="w-full max-w-md bg-cardBg text-primaryText m-4 rounded-primaryRadius shadow-lg relative">
        {/* Close Button */}
        <div className="border-b bg-secondaryLite p-4 rounded-t-primaryRadius">
          <button
            className="absolute top-4 right-4 hover:font-medium text-2xl hover:text-cancelButton "
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-center">Your Cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center ">
            <h3 className="text-lg mb-5">Your cart is empty</h3>
            <button
              className="mx-auto block mb-6 border-[1px] border-buttonBorder  cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50  bg-primaryBtn text-buttonText font-semibold py-2 px-6 rounded-primaryRadius duration-200"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 justify-between items-center border-b pb-3">
                {item.product.image && (
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                )}

                {/* Product Info */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{item.product.name}</h4>
                  <p className="text-sm text- font-jkabode">
                    ₹{item.product.price} × {item.quantity} = ₹{item.product.price * item.quantity}
                  </p>
                </div>

                {/* Quantity Controls */}
                {/* <div className="flex items-center gap-1 mr-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="px-1 py-1 border rounded-md text-lg"
                  >
                    −
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="px-1 py-1 border rounded-md text-lg"
                  >
                    +
                  </button>
                </div> */}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.product.id, item.quantity)}
                  className="text-secondaryLite hover:underline text-sm"
                >
                  {removeFromCartMutation.isPending ? <FaSpinner className="animate-spin" /> : 'Remove'}
                </button>
              </div>
            ))}
            <div className="flex justify-center items-center mt-4">
              <button
                className="w-primaryWidth bg-primaryBtn text-buttonText py-2 rounded-primaryRadius font-semibold mt-4 border-[1px] border-buttonBorder cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50 "
                onClick={handleCheckout}
              >
                Go to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carts;
