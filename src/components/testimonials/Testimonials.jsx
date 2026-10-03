import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Ali Khan",
    review:
      "Amazing quality products and very fast delivery. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Ayesha Noor",
    review:
      "The shopping experience was smooth and customer support was excellent.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ahmed Raza",
    review:
      "Premium quality with affordable prices. I will definitely shop again.",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">What Our Customers Say</h2>

        <p className="text-gray-500 mt-3">
          Trusted by thousands of happy customers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
          >
            <div className="flex text-yellow-400 mb-4">
              {[...Array(review.rating)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>

            <p className="text-gray-600 italic">"{review.review}"</p>

            <h3 className="mt-6 text-lg font-bold text-blue-600">
              {review.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
