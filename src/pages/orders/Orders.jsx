import React from "react";
import useOrders from "../../hooks/useOrders";

const Orders = () => {
  const { orderedData } = useOrders({ fetchOrders: true });

  return (
    <div className="p-4 sm:p-8 min-h-screen text-primaryText">
      <h2 className="text-2xl text-center font-semibold mb-6">My Orders</h2>

      {orderedData.length === 0 ? (
        <div className="text-center mt-20">
          You haven’t ordered anything yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {orderedData
            .slice()        // create a copy
            .reverse()      // reverse order
            .map((order) => {
              const firstItem = order.items?.[0];

              return (
                <div
                  key={order.id}
                  className="bg-cardBg rounded-primaryRadius shadow p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <img
                      src={firstItem?.product?.image}
                      alt={firstItem?.product?.name}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div>
                      <h3 className="text-lg font-medium">
                        {firstItem?.product?.name}
                      </h3>

                      <p className="text-sm text-mutedText">
                        Quantity: {firstItem?.quantity}
                      </p>

                      <p className="text-sm text-mutedText">
                        Ordered on:{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>

                      <p className="text-xs text-mutedText">
                        Order ID: {order.order_id}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{order.total_price}</p>

                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-primaryRadius ${order.status === "confirmed"
                          ? "text-success bg-green-100"
                          : order.status === "processing"
                            ? "text-Warning bg-yellow-100"
                            : "text-Error bg-red-100"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Orders;
