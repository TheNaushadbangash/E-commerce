import products from "../../data/products";
import ProductCard from "../product/ProductCard";

function Deals() {
  const deals = products.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold">🔥 Today's Deals</h2>

          <p className="text-gray-500 mt-2">
            Limited time offers on selected products.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Deals;
