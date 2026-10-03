import { FaTruck, FaLock, FaUndo, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    desc: "Free delivery on orders over Rs. 5000",
  },
  {
    icon: <FaLock />,
    title: "Secure Payment",
    desc: "100% safe and secure payment methods",
  },
  {
    icon: <FaUndo />,
    title: "Easy Returns",
    desc: "7-day easy return policy",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Our team is always here to help",
  },
];

function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl text-blue-600 flex justify-center mb-5">
              {feature.icon}
            </div>

            <h3 className="text-xl font-bold">{feature.title}</h3>

            <p className="text-gray-500 mt-3">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
