import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

function Orders() {
  const { orders } = useOrders();

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Orders</h1>

            <p className="text-gray-500 mt-2">
              View your previous orders and order details.
            </p>
          </div>

          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
          >
            Continue Shopping
          </Link>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-5">📦</div>

            <h2 className="text-2xl font-bold">No Orders Yet</h2>

            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-5">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>

                    <h2 className="text-xl font-bold">#{order.id}</h2>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <p className="text-sm text-gray-500">Order Date</p>

                    <p className="font-semibold">{order.date}</p>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full font-semibold">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="py-5 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />

                        <div>
                          <h3 className="font-semibold">{item.title}</h3>

                          <p className="text-gray-500 text-sm">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-semibold">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total + View Details */}
                <div className="border-t pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <span className="text-gray-500">Total Amount</span>

                    <h2 className="text-2xl font-bold text-blue-600">
                      Rs. {order.total}
                    </h2>
                  </div>

                  <Link
                    to={`/orders/${order.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
