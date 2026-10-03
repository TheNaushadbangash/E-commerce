function CategoryFilter({ category, setCategory }) {
  const categories = ["All", "Fashion", "Electronics", "Shoes"];

  return (
    <div className="flex justify-center gap-4 my-8 flex-wrap">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`px-4 py-2 rounded ${
            category === item ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
