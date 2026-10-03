import { useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart, FaUser, FaHeart, FaSearch } from "react-icons/fa";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

function Navbar({ search, setSearch }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-[#050B1A] sticky top-0 z-50 px-4 pt-4">
      <div className="max-w-screen-2xl mx-auto bg-[#0B132B]/90 backdrop-blur-xl border border-gray-800 rounded-2xl px-8 py-4 flex items-center justify-between shadow-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 mr-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <FaShoppingCart className="text-white text-xl" />
          </div>

          <h1 className="text-4xl font-extrabold">
            <span className="text-white">Shop</span>
            <span className="text-blue-500">Ease</span>
          </h1>
        </Link>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-6 text-white font-medium text-[15px]">
          <Link
            to="/"
            className="text-blue-500 border-b-2 border-blue-500 pb-1 hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
          >
            Home
          </Link>

          <Link
            to="/"
            className="relative hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Shop
          </Link>

          <Link
            to="/"
            className="relative hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Categories
          </Link>

          <Link
            to="/"
            className="relative hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Deals
          </Link>

          <Link
            to="/"
            className="relative hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </Link>

          <Link
            to="/"
            className="relative hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden lg:flex items-center bg-[#121C36] rounded-full px-6 py-3 w-[340px] mx-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-400"
          />

          <FaSearch className="text-gray-400 text-lg" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-8">
          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <FaHeart className="text-2xl text-white hover:text-red-500 duration-300" />

            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-white hover:text-blue-500 duration-300" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User */}
          {isLoggedIn ? (
            <div className="relative">
              {/* User Button */}
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-12 h-12 rounded-full bg-[#121C36] flex items-center justify-center hover:bg-blue-600 duration-300"
              >
                <FaUser className="text-white text-lg" />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0B132B] border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                  {/* User Info */}
                  <div className="px-4 py-4 border-b border-gray-700">
                    <p className="text-white font-semibold">
                      {user?.name || "User"}
                    </p>

                    <p className="text-gray-400 text-sm truncate">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to="/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-3 text-white hover:bg-blue-500/10 transition"
                  >
                    📦 My Orders
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout();

                      toast.success("Logged out successfully!");

                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="w-12 h-12 rounded-full bg-[#121C36] flex items-center justify-center hover:bg-blue-600 duration-300"
            >
              <FaUser className="text-white text-lg" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
