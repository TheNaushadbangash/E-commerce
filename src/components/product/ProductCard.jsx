import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const oldPrice = Math.round(product.price * 1.25);

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Discount Badge */}
      <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        -20%
      </span>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md"
      >
        <FaHeart
          className={`text-lg ${
            isWishlisted ? "text-red-500" : "text-gray-300"
          }`}
        />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
          />
        </div>
      </Link>

      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 mb-2">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

          <span className="text-gray-500 text-sm ml-2">(4.8)</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.id}`}>
          <h2 className="text-lg font-bold hover:text-blue-600 transition">
            {product.title}
          </h2>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-blue-600">
            Rs. {product.price}
          </span>

          <span className="text-gray-400 line-through">Rs. {oldPrice}</span>
        </div>

        {/* Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
