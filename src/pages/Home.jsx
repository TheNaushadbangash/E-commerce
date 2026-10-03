import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import { getProducts } from "../services/api";
import CategoryFilter from "../components/product/CategoryFilter";
import CategorySection from "../components/category/CategorySection";
import Features from "../components/features/Features";
import Deals from "../components/deals/Deals";
import Testimonials from "../components/testimonials/Testimonials";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);
  if (loading) {
    return <h1 className="text-center text-4xl mt-20">Loading Products...</h1>;
  }

  const productsPerPage = 8;

  const filteredProducts = [...products]
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "low":
          return a.price - b.price;

        case "high":
          return b.price - a.price;

        case "az":
          return a.title.localeCompare(b.title);

        case "za":
          return b.title.localeCompare(a.title);

        default:
          return 0;
      }
    });
  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(firstProduct, lastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Hero />
      <CategorySection />
      <Features />
      <Deals />
      <Testimonials />

      <CategoryFilter category={category} setCategory={setCategory} />
      <div className="flex justify-center items-center gap-3 mt-12">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Featured Products</h2>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-4 md:mt-0 border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="az">Name: A-Z</option>
            <option value="za">Name: Z-A</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
