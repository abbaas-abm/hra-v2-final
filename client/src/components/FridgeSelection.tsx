import { FaSnowflake } from "react-icons/fa";
import topFreezer from '../../public/images/top-freezer.png';
import bottomFreezer from '../../public/images/bottom-freezer.png';
import barFridge from '../../public/images/bar-fridge.png'

const FridgeSelection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20" data-aos="fade-right">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">
          Our Fridge Rentals
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          Affordable fridge rental options designed for students, events, and everyday living.
        </p>

        {/* Pricing Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bar Fridge */}
          <div className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition flex flex-col items-center">
            {/* Replace src with your transparent image */}
            <div className="w-40 h-40 relative mb-4">
              <img src={barFridge} alt="Bar Fridge"  className="object-contain" />
            </div>
            <FaSnowflake className="text-yellow-300 text-3xl mb-2" />
            <h3 className="font-semibold text-lg mb-2">Bar Fridge</h3>
            <p className="text-gray-600 text-sm mb-4">
              A compact fridge perfect for small spaces, keeping your drinks cold with style.
            </p>
            <span className="text-xl font-bold text-gray-900">R199.00 / month</span>
          </div>

          {/* Top Freezer */}
          <div className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition flex flex-col items-center">
            <div className="w-40 h-40 relative mb-4">
              <img src={topFreezer} alt="Top Freezer"  className="object-contain" />
            </div>
            <FaSnowflake className="text-yellow-300 text-3xl mb-2" />
            <h3 className="font-semibold text-lg mb-2">Top Freezer</h3>
            <p className="text-gray-600 text-sm mb-4">
              An efficient fridge with a spacious freezer compartment, ideal for everyday use.
            </p>
            <span className="text-xl font-bold text-gray-900">R349.00 / month</span>
          </div>

          {/* Bottom Freezer */}
          <div className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition flex flex-col items-center">
            <div className="w-40 h-40 relative mb-4">
              <img src={bottomFreezer} alt="Bottom Freezer"  className="object-contain" />
            </div>
            <FaSnowflake className="text-yellow-300 text-3xl mb-2" />
            <h3 className="font-semibold text-lg mb-2">Bottom Freezer</h3>
            <p className="text-gray-600 text-sm mb-4">
              A premium fridge with an easy-access bottom freezer, offering maximum convenience.
            </p>
            <span className="text-xl font-bold text-gray-900">R649.99 / month</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FridgeSelection;
