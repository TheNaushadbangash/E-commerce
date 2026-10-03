import heroImage from "../../assets/images/hero.png";

function Hero() {
  return (
    <section className="bg-[#050B1A]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div
          className="rounded-3xl overflow-hidden min-h-[500px] flex items-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Left Content */}
          <div className="w-full lg:w-1/2 p-10 lg:p-16">
            <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🔥 Special Offer
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mt-6">
              Discover the
              <span className="text-blue-400"> Best </span>
              Products for
              <span className="text-purple-400"> You</span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg">
              Top quality products, best prices,
              <br />
              fast delivery & easy returns.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white font-semibold">
                Shop Now
              </button>

              <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-xl text-white font-semibold transition">
                Explore Deals
              </button>
            </div>

            <div className="mt-8">
              <p className="text-blue-400 font-bold text-xl">
                2,500+
                <span className="text-gray-300 font-normal">
                  {" "}
                  Happy Customers
                </span>
              </p>
            </div>
          </div>

          {/* Right side image already exists in background */}
          <div className="hidden lg:block w-1/2"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
