import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";

import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useReviews } from "../context/ReviewContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { user } = useAuth();

  // Reviews Context
  const { reviews, addReview } = useReviews();

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Find Product
  const product = products.find((item) => item.id === Number(id));

  // Get reviews for this product
  const productReviews = reviews.filter(
    (review) => review.productId === product?.id,
  );

  // If product doesn't exist
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Product Not Found</h1>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Increase Quantity
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease Quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add to Cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    toast.success("Product added to cart!");
  };

  // Buy Now
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    navigate("/checkout");
  };

  // Submit Review
  const handleReviewSubmit = () => {
    if (!reviewText.trim()) {
      toast.error("Please write a review.");
      return;
    }

    addReview({
      productId: product.id,
      name: user?.name || "Guest",
      rating: rating,
      review: reviewText,
      date: new Date().toLocaleDateString(),
    });

    toast.success("Review Added!");

    setReviewText("");
    setRating(5);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* ================= PRODUCT ================= */}

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          {/* Category */}
          <p className="text-blue-600 font-semibold uppercase tracking-wide">
            {product.category}
          </p>

          {/* Title */}
          <h1 className="text-5xl font-bold mt-3">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-5">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
              ))}
            </div>

            <span className="text-gray-600">{product.rating || 4.8}</span>
          </div>

          {/* Price */}
          <p className="text-4xl font-bold text-blue-600 mt-6">
            Rs. {product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-7 mt-6">
            {product.description}
          </p>

          {/* Stock */}
          <div className="mt-6">
            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 font-semibold">✕ Out of Stock</p>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-6">
            <span className="font-semibold">Quantity:</span>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={decreaseQuantity}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xl"
              >
                −
              </button>

              <span className="px-6 py-2 font-bold">{quantity}</span>

              <button
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:text-gray-300 text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-3 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition"
            >
              <FaBolt />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}

      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

        {/* ================= WRITE REVIEW ================= */}

        <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>

          {/* Stars */}
          <div className="flex gap-2 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl cursor-pointer transition ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Review Text */}
          <textarea
            rows="5"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit */}
          <button
            onClick={handleReviewSubmit}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
          >
            Submit Review
          </button>
        </div>

        {/* ================= REVIEW LIST ================= */}

        <div className="space-y-6">
          {productReviews.length === 0 ? (
            <div className="bg-gray-100 rounded-xl p-8 text-center">
              <p className="text-gray-500">No reviews yet.</p>
            </div>
          ) : (
            productReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                {/* Review Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{review.name}</h3>

                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>

                  {/* Review Stars */}
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mt-5">{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
