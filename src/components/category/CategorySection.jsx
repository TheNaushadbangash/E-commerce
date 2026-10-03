import {
  FaLaptop,
  FaTshirt,
  FaMobileAlt,
  FaCouch,
  FaGamepad,
  FaHeadphones,
} from "react-icons/fa";

const categories = [
  {
    name: "Electronics",
    icon: <FaLaptop className="text-4xl text-blue-500" />,
  },
  {
    name: "Fashion",
    icon: <FaTshirt className="text-4xl text-pink-500" />,
  },
  {
    name: "Mobiles",
    icon: <FaMobileAlt className="text-4xl text-green-500" />,
  },
  {
    name: "Furniture",
    icon: <FaCouch className="text-4xl text-yellow-500" />,
  },
  {
    name: "Gaming",
    icon: <FaGamepad className="text-4xl text-red-500" />,
  },
  {
    name: "Accessories",
    icon: <FaHeadphones className="text-4xl text-purple-500" />,
  },
];

function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Shop by Category</h2>

        <p className="text-gray-500 mt-3">
          Explore our most popular collections.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-4">{category.icon}</div>

            <h3 className="font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
