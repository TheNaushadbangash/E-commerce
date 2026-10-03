import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [mobileAccount, setMobileAccount] = useState("");
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleOrder(e) {
    e.preventDefault();

    setError("");

    // Check empty fields
    if (!name || !email || !phone || !address) {
      setError("Please fill all billing details.");
      return;
    }

    // Check phone
    if (phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    // Card Validation
    if (paymentMethod === "Credit Card") {
      if (!cardNumber || !cardName || !expiry || !cvv) {
        setError("Please fill all card details.");
        return;
      }
    }

    // JazzCash / EasyPaisa Validation
    if (
      (paymentMethod === "JazzCash" || paymentMethod === "EasyPaisa") &&
      !mobileAccount
    ) {
      setError(`Please enter your ${paymentMethod} number.`);
      return;
    }

    // Save Order
    addOrder({
      userId: user?.email,
      name,
      email,
      phone,
      address,
      items: cart,
      total,
      paymentMethod,
    });

    setTimeout(() => {
      toast.success("Order placed successfully!");

      clearCart();

      setProcessing(false);

      navigate("/success");
    }, 2500);
  }
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <form onSubmit={handleOrder}>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Billing Details */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Billing Details</h2>

            {/* Error */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5">
                {error}
              </div>
            )}

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Shipping Address */}
            <textarea
              placeholder="Shipping Address"
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Payment Method */}

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

            <div className="space-y-4">
              <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                <input
                  type="radio"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                💵 Cash on Delivery
              </label>

              <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                <input
                  type="radio"
                  value="Credit Card"
                  checked={paymentMethod === "Credit Card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                💳 Credit / Debit Card
              </label>

              <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                <input
                  type="radio"
                  value="JazzCash"
                  checked={paymentMethod === "JazzCash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                📱 JazzCash
              </label>

              <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                <input
                  type="radio"
                  value="EasyPaisa"
                  checked={paymentMethod === "EasyPaisa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                📱 EasyPaisa
              </label>
            </div>
          </div>
          {/* Card Payment */}

          {paymentMethod === "Credit Card" && (
            <div className="bg-white shadow-lg rounded-xl p-8 mt-6">
              <h2 className="text-2xl font-bold mb-6">Card Details</h2>

              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
              />

              <input
                type="text"
                placeholder="Card Holder Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="border p-3 rounded-lg"
                />

                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="border p-3 rounded-lg"
                />
              </div>
            </div>
          )}
          {(paymentMethod === "JazzCash" || paymentMethod === "EasyPaisa") && (
            <div className="bg-white shadow-lg rounded-xl p-8 mt-6">
              <h2 className="text-2xl font-bold mb-6">
                {paymentMethod} Account
              </h2>

              <input
                type="text"
                placeholder="03XXXXXXXXX"
                value={mobileAccount}
                onChange={(e) => setMobileAccount(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-3"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>

                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))
            )}

            {/* Total */}
            <div className="flex justify-between mt-8 text-2xl font-bold">
              <span>Total</span>

              <span>Rs. {total}</span>
            </div>

            {/* Place Order */}
            <button
              type="submit"
              disabled={cart.length === 0 || processing}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl transition"
            >
              {processing ? "Processing Payment..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
