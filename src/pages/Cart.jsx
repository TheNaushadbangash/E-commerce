import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2 className="text-xl text-gray-500">Your cart is empty.</h2>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div>
                    <h2 className="font-bold text-xl">{item.title}</h2>

                    <p className="text-blue-600">Rs. {item.price}</p>

                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="bg-gray-300 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded ml-5"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <h2 className="font-bold text-xl">
                  Rs. {item.price * item.quantity}
                </h2>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <h2 className="text-3xl font-bold mb-6">Total: Rs. {total}</h2>

            <Link to="/checkout">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
