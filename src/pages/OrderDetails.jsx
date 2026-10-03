import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

function OrderDetails() {
  const { id } = useParams();

  const { orders } = useOrders();

  const order = orders.find((item) => item.id === Number(id));
  const steps = ["Confirmed", "Packed", "Shipped", "Delivered"];

  const currentStep = steps.indexOf(order.status);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Order Not Found</h1>

          <Link
            to="/orders"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Order #{order.id}</h1>

            <p className="text-gray-500 mt-2">{order.date}</p>
          </div>

          <span className="bg-green-100 text-green-600 px-5 py-2 rounded-full font-semibold">
            {order.status}
          </span>
        </div>

        <hr className="mb-8" />
        {/* Order Tracking */}

        <h2 className="text-2xl font-bold mb-8">Order Tracking</h2>

        <div className="space-y-6">
          <div className="flex items-center gap-5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                currentStep >= 0 ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              ✓
            </div>

            <div>
              <h3 className="font-bold">Order Confirmed</h3>
              <p className="text-gray-500">Your order has been confirmed.</p>
            </div>
          </div>

          <div className="ml-5 border-l-4 border-gray-300 h-10"></div>

          <div className="flex items-center gap-5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
            >
              📦
            </div>
            <div>
              <h3 className="font-bold">Packed</h3>
              <p className="text-gray-500">Waiting for packaging.</p>
            </div>
          </div>

          <div className="ml-5 border-l-4 border-gray-300 h-10"></div>

          <div className="flex items-center gap-5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
            >
              🚚
            </div>

            <div>
              <h3 className="font-bold">Shipped</h3>
              <p className="text-gray-500">Waiting for shipment.</p>
            </div>
          </div>

          <div className="ml-5 border-l-4 border-gray-300 h-10"></div>

          <div className="flex items-center gap-5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
            >
              🏠
            </div>

            <div>
              <h3 className="font-bold">Delivered</h3>
              <p className="text-gray-500">Order will be delivered soon.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
        <p>
          <strong>Payment:</strong> {order.paymentMethod}
        </p>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Name:</strong> {order.name}
          </p>

          <p>
            <strong>Email:</strong> {order.email}
          </p>

          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Address:</strong> {order.address}
          </p>
        </div>

        <hr className="my-8" />

        <h2 className="text-2xl font-bold mb-6">Ordered Products</h2>

        <div className="space-y-5">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>

                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>

              <h3 className="font-bold">Rs. {item.price * item.quantity}</h3>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-10 text-3xl font-bold border-t pt-6">
          <span>Total</span>

          <span>Rs. {order.total}</span>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
