import { Link } from "@tanstack/react-router";
import { BiFridge } from "react-icons/bi";
import {FaBox, FaTruck} from 'react-icons/fa';
const ServicesHero = () => {
  return (
    <section className="relative bg-yellow-300 min-h-[80vh] flex items-center justify-center px-6 py-12 md:py-20 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">
        <h1 data-aos="fade-up" className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-sm">
          Our Services
        </h1>

        <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-2xl md:text-3xl font-semibold text-white">
          Smart Storage, Delivery & Rental Services
        </h2>

        <p data-aos="fade-up" data-aos-delay="150" className="mt-6 text-lg md:text-xl text-white max-w-2xl mx-auto">
          Need it stored, delivered or rented? We handle the heavy lifting and help you stay organised.
        </p>

        <div data-aos="fade-up" data-aos-delay="200" className="mt-8 flex justify-center">
          <Link to="/services/delivery/order">
          <button  className="bg-white hover:bg-gray-100 text-yellow-300 font-bold px-4 py-2 cursor-pointer text-lg rounded-2xl shadow-lg flex items-center gap-2 transition hover:scale-105">
            <FaTruck className="w-5 h-5" /> Schedule a Delivery
          </button>
          </Link>
        </div>

        {/* Icons Row */}
        <div data-aos="fade-up" data-aos-delay="250" className="mt-10 flex justify-center gap-8 text-white">
          <div className="flex flex-col items-center text-sm font-medium">
            <FaBox className="text-2xl mb-1" /> Storage
          </div>
          <div className="flex flex-col items-center text-sm font-medium">
            <FaTruck className="text-2xl mb-1" /> Delivery
          </div>
          <div className="flex flex-col items-center text-sm font-medium">
            <BiFridge className="text-2xl mb-1" /> Fridge Rental
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
