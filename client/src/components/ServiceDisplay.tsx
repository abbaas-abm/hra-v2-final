import { Link } from "@tanstack/react-router";
import { FaTruck, FaSnowflake, FaBox } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6 " data-aos="fade-right">
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-300">Our Services</h2>
          <p className="text-lg md:text-xl text-gray-700">
            We offer a range of convenient and affordable solutions designed to make your life easier  fast deliveries, fridge rentals, and secure storage.
          </p>
          <Link to="/services/delivery/order">
          <button className="bg-yellow-300 text-white hover:bg-gray-100 hover:text-yellow-300 transition hover:scale-105 font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
            Explore Services <span className="text-xl">→</span>
          </button>
          </Link>
        </div>

        {/* Right Column - Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-left">
          <div className="bg-yellow-300 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <FaTruck className="text-white text-4xl mb-4" />
            <h3 className="text-xl font-bold text-white">Deliveries</h3>
            <p className="mt-2 text-white text-md">
              Quick and reliable deliveries for all your needs whether you're relocating or just moving a few items.
            </p>
          </div>

          <div className="bg-yellow-300 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <FaSnowflake className="text-white text-4xl mb-4" />
            <h3 className="text-xl font-bold text-white">Fridge Rentals</h3>
            <p className="mt-2 text-white text-md">
              Affordable fridge rental options for students and short-term stays convenient, clean, and hassle free.
            </p>
          </div>

          <div className="bg-yellow-300 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <FaBox className="text-white text-4xl mb-4" />
            <h3 className="text-xl font-bold text-white">Storage</h3>
            <p className="mt-2 text-white text-md">
              Secure and budget-friendly storage space for your valuables during moves or extended travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;