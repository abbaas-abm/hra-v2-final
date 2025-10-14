import { FaMoneyBillWave, FaRuler, FaDumbbell, FaBolt } from "react-icons/fa";

const OurPricing = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20" data-aos="fade-right">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">
          Our Pricing
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          Transparent pricing made simple. No hidden fees, no surprises.
        </p>

        {/* Pricing Breakdown */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition">
            <FaRuler className="text-yellow-300 text-3xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Base Rate</h3>
            <p className="text-gray-600">Calculated per km</p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition">
            <FaMoneyBillWave className="text-yellow-300 text-3xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Stair Fee</h3>
            <p className="text-gray-600">R50 per flight of stairs</p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition">
            <FaDumbbell className="text-yellow-300 text-3xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Extra-heavy Items</h3>
            <p className="text-gray-600">Additional handling fee may apply</p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl border border-yellow-300 hover:shadow-lg transition">
            <FaBolt className="text-yellow-300 text-3xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Instant Quotes</h3>
            <p className="text-gray-600">Get your price instantly after entering details</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPricing;
