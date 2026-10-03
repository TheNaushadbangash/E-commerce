import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <h2 className="text-gray-500 text-xl">Your wishlist is empty.</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-60 object-cover"
                />
              </Link>

              <div className="p-5">
                <h2 className="text-xl font-semibold">{product.title}</h2>

                <p className="text-blue-600 font-bold mt-2">
                  Rs. {product.price}
                </p>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
