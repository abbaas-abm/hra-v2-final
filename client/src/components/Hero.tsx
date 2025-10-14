import { FiTruck } from "react-icons/fi";
import heroVideo from "../../public/images/Untitled design.mp4"
import { Link } from "@tanstack/react-router";

export default function Hero() {
  return (
    <section className="relative bg-yellow-300 text-white min-h-screen flex items-center justify-center px-6 md:px-16 overflow-hidden">
      {/* Hero Content */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6" data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
            Fast and Reliable Delivery, Fridge Rental and Storage Services
          </h1>
          <p className="text-lg md:text-xl font-light drop-shadow-sm">
            HRA moves small and large items across Johannesburg, offers fridge
            rentals, and provides secure student storage. Safe deliveries, easy
            rentals, reliable storage!
          </p>
          <Link
            to="/services/delivery/order"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-yellow-600 font-semibold rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 transform transition duration-300"
          >
            <FiTruck className="text-2xl" />
            Schedule Delivery
          </Link>
        </div>

        {/* Right Video Placeholder */}
        <div className="w-full flex justify-center">
          <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden object-contain ">
            {/* Replace with your video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Slanted Skew Effect at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M1200 0L0 120H1200V0z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
}
