import { Link } from "react-router-dom";

function OrderSuccess() {
  const orderId = Math.floor(100000 + Math.random() * 900000);

  const orderDate = new Date().toLocaleDateString("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <span className="text-5xl">✓</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Thank you for shopping with ShopEase.
        </p>

        {/* Order Information */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-left space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>

            <span className="font-bold">#{orderId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Order Date</span>

            <span className="font-semibold">{orderDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>

            <span className="text-green-600 font-semibold">Confirmed</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
