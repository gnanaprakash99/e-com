import React from 'react';
import { useSelector } from 'react-redux';

const Orders = () => {
  const orderedData = useSelector(state => state.OrderedData.orderedData);

  return (
    <div className="p-4 sm:p-8 min-h-screen text-primaryText">
      <h2 className="text-2xl text-center font-semibold mb-6">My Orders</h2>

      {orderedData.length === 0 ? (
        <div className="text-center mt-20">You haven’t ordered anything yet.</div>
      ) : (
        <div className="grid gap-4">
          {orderedData.map((order) => (
            <div
              key={order.id}
              className="bg-cardBg rounded-primaryRadius shadow p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.image}
                  alt={order.productName}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-medium">{order.productName}</h3>
                  <p className="text-sm text-mutedText">Quantity: {order.quantity}</p>
                  <p className="text-sm text-mutedText">Ordered on: {order.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">₹{order.totalPrice}</p>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-primaryRadius ${
                    order.status === "Delivered"
                      ? "text-success bg-green-100"
                      : order.status === "Shipped"
                      ? "text-blue-700 bg-blue-100"
                      : order.status === "Processing"
                      ? "text-Warning bg-yellow-100"
                      : "text-Error bg-red-100"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
