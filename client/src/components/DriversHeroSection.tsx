import { FaArrowRight } from "react-icons/fa";
import driverHeroBg from '../../public/images/driver-hero-img.jpg'
import { Link } from "@tanstack/react-router";

const DriverHero= () => {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${driverHeroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12" data-aos="fade-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
          Become a Driver
        </h1>
        <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
          Join our platform, earn on your schedule, and be part of a trusted delivery network.
        </p>
        <Link
          to="/driver-registration"
          className="inline-flex items-center bg-white text-black font-bold px-4 py-2 rounded-3xl hover:scale-105 transition"
        >
          Get Started <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default DriverHero;
